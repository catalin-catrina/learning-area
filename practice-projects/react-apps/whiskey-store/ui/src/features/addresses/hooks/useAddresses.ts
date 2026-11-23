import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  setDefaultAddress,
  updateAddress,
} from "../services/addresses.service";

export const addressesKey = (userId?: number) => ["addresses", userId] as const;

/** The user's saved addresses, default first. */
export function useAddresses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: addressesKey(user?.id),
    queryFn: getAddresses,
    enabled: !!user,
  });
}

export function useAddressMutations() {
  const qc = useQueryClient();
  const { user } = useAuth();
  // Setting a default or deleting the default changes other rows too,
  // so every mutation simply refetches the list.
  const onSuccess = () => qc.invalidateQueries({ queryKey: addressesKey(user?.id) });

  return {
    create: useMutation({ mutationFn: createAddress, onSuccess }),
    update: useMutation({ mutationFn: updateAddress, onSuccess }),
    setDefault: useMutation({ mutationFn: setDefaultAddress, onSuccess }),
    remove: useMutation({ mutationFn: deleteAddress, onSuccess }),
  };
}
