'use server';

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

// Email signup
export const signUp = async (email: string, password: string, name: string) => {
  const result = await auth.api.signUpEmail({
    body: { email, password, name, callbackURL: "/" },
  });
  return result;
};

// Email signin
export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: { email, password, callbackURL: "/" },
  });
  return result;
};

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
  const result = await auth.api.signOut({
    headers: await headers(), // only works in server context
  });
  return result;
};
