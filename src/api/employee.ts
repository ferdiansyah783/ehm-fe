
import { api } from "../providers/auth-provider";
import { PageOptions } from "../types/page-options";

type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    address: string;
};

export async function getEmployees(params: PageOptions) {
  try {
    const response = await api.get("/api/employee", {
      params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createEmployee(data: Employee) {
  try {
    const response = await api.post("/api/employee", data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployee(id: number, data: Employee) {
  try {
    const response = await api.put(`/api/employee/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEmployee(id: number) {
  try {
    const response = await api.delete(`/api/employee/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}