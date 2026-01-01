import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // This tells the client where your Better Auth server is
    baseURL: process.env.NEXT_PUBLIC_APP_URL;
});
