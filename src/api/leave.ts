import { api } from "../providers/auth-provider";
import { PageOptions } from "../types/page-options";

type Leave = {
  reason: string;
  startDate: string;
  endDate: string;
};

export async function getLeaves(params: PageOptions) {
  try {
    const response = await api.get("/api/leave", { params });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createLeave(id: number, data: Leave) {
  try {
    const response = await api.post(`/api/leave/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateLeave(id: number, data: Leave) {
  try {
    const response = await api.put(`/api/leave/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteLeave(id: number) {
  try {
    const response = await api.delete(`/api/leave/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
