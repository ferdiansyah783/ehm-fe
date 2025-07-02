import { api } from "../providers/auth-provider";

type ParamsSignup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
};

export async function signUp(params: ParamsSignup) {
  try {
    const response = await api.post("/api/auth/register", params);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/api/auth/me")
    return response;
  } catch (error) {
    throw error;
  }
}
