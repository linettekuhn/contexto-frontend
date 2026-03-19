import type { AuthUser } from "../context/AuthContext";
import type { BackendError } from "../types";

//TODO: change back to vite env
const BASE_URL = "http://localhost:3009";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export async function register(email: string, password: string) {
  // call register endpoint in backend
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // parse response
  const result = await response.json();

  // return result
  if (!response.ok) {
    throw result as BackendError;
  }

  return result;
}

export async function login(email: string, password: string) {
  // call login endpoint in backend
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // recieves the httpOnly refresh cookie
    body: JSON.stringify({ email, password }),
  });

  // parse response
  const result = await response.json();

  // return result
  if (!response.ok) {
    throw result as BackendError;
  }

  setAccessToken(result.accessToken);
  return result;
}

export async function refresh() {
  // call refresh endpoint in backend
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // sends the httpOnly refresh cookie
  });

  // parse response
  const result = await response.json();

  // return result
  if (!response.ok) {
    throw result as BackendError;
  }

  setAccessToken(result.newAccessToken);
  return {
    accessToken: result.newAccessToken as string,
    user: result.user as AuthUser,
  };
}

export function logout() {
  setAccessToken(null);
  // TODO: call backend /auth/logout
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const doRequest = (token: string | null) =>
    fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        ...init.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  // attempt to do request with current access token
  let response = await doRequest(getAccessToken());

  // if token expired
  if (response.status === 401) {
    try {
      // refresh token and try to do request with new token
      const { accessToken } = await refresh();
      response = await doRequest(accessToken);
    } catch {
      logout();
      throw new Error("Unauthorized — please log in again");
    }
  }

  return response;
}
