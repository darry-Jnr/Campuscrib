'use server';

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

// Email signup
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: { email, password, name, callbackURL: "/" },
    });
    return { user: result.user, error: null }; // Success
  } catch (err: any) {
    // Return the message so the frontend can show it in a Toast
    return { user: null, error: err.message || "Failed to create account" };
  }
};

// Email signin
export const signIn = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: { email, password, callbackURL: "/" },
    });
    return { user: result.user, error: null }; // Success
  } catch (err: any) {
    return { user: null, error: err.message || "Invalid email or password" };
  }
};

// Social login (No change needed here as redirect handles it)
export const signInSocial = async (provider: "google") => {
    const { url } = await auth.api.signInSocial({
      body: { 
        provider,
        callbackURL: "/"
      },
    });
  
    if (url) redirect(url);
};

// Sign out
export const signOut = async () => {
  try {
    const result = await auth.api.signOut({
      headers: await headers(),
    });
    return result;
  } catch (err) {
    return { error: "Failed to sign out" };
  }
};