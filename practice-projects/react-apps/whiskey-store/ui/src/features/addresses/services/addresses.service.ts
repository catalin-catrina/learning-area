import api from "../../../shared/services/api";
import type { Address, AddressInput } from "../address.types";

export async function getAddresses(): Promise<Address[]> {
  const response = await api.get("/addresses");
  return response.data;
}

export async function createAddress(
  input: AddressInput & { isDefault?: boolean },
): Promise<Address> {
  const response = await api.post("/addresses", input);
  return response.data;
}

export async function updateAddress({
  id,
  input,
}: {
  id: number;
  input: AddressInput;
}): Promise<Address> {
  const response = await api.put(`/addresses/${id}`, input);
  return response.data;
}

export async function setDefaultAddress(id: number): Promise<Address> {
  const response = await api.patch(`/addresses/${id}/default`);
  return response.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await api.delete(`/addresses/${id}`);
}
