import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
});

export const { signIn, signUp, useSession } = authClient;