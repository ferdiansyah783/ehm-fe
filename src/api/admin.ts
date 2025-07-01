import { api } from "../providers/auth-provider";
import { PageOptions } from "../types/page-options";

type Admin = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
};

export async function getAdmins(params: PageOptions) {
  try {
    const response = await api.get("/api/admin", { params });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAdmin(id: number, data: Admin) {
  try {
    const response = await api.put(`/api/admin/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteAdmin(id: number) {
  try {
    const response = await api.delete(`/api/admin/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
