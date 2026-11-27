import { create } from "zustand";

// Toasts are UI state that any component can create and one <Toaster> (in the
// layout) displays. Same idea as an Angular notification service + a host
// component, except the "service" is a zustand store: call
// `useToastStore.getState().show(...)` or `const show = useToastStore(s => s.show)`.

export type Toast = {
  id: number;
  tone?: "success" | "error"; // default success
  title: string;
  description?: string;
  imageUrl?: string | null;
  action?: { label: string; onClick: () => void };
};

type ToastState = {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
};

const DURATION_MS = 4000;
const MAX_VISIBLE = 3;
let nextId = 1;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (toast) => {
    const id = nextId++;
    // newest on top; drop the oldest past the limit
    set({ toasts: [{ ...toast, id }, ...get().toasts].slice(0, MAX_VISIBLE) });
    setTimeout(() => get().dismiss(id), DURATION_MS);
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
