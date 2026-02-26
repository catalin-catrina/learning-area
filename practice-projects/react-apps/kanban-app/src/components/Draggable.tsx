import { useDraggable } from "@dnd-kit/react";
import type { ReactNode } from "react";

type DraggableType = { id: string; children: ReactNode };

export function Draggable({ id, children }: DraggableType) {
  const { ref } = useDraggable({
    id,
  });

  return <button ref={ref}>{children}</button>;
}
