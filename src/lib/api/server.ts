"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { baseURL } from "./baseUrl";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const getToken = async (): Promise<string | null> => {
    try {
        const { token } = await auth.api.getToken({
            headers: await headers(),
        });
        return token || null;
    } catch {
        return null;
    }
};

export const serverMutation = async <TResponse = unknown, TBody = unknown>(
    path: string,
    method: HttpMethod,
    data?: TBody
): Promise<TResponse> => {
    const token = await getToken();
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseURL}${path}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `Request failed with status ${res.status}`);
    }

    return res.json() as Promise<TResponse>;
};

export const serverFetch = async <TResponse = unknown>(
    path: string,
    isProtected = false
): Promise<TResponse> => {
    const headers: HeadersInit = {};

    if (isProtected) {
        const token = await getToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${baseURL}${path}`, {
        headers,
        cache: "no-store",
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `Request failed with status ${res.status}`);
    }

    return res.json() as Promise<TResponse>;
};

export const deleteMutation = async <TResponse = unknown>(
    path: string
): Promise<TResponse> => {
    const token = await getToken();
    const headers: HeadersInit = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseURL}${path}`, {
        method: "DELETE",
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `Request failed with status ${res.status}`);
    }

    return res.json() as Promise<TResponse>;
};