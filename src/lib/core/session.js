import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};

export const requireRole = async (allowedRoles) => {
  const user = await getUserSession();

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/signin");
  }

  // If the user's role is not in the allowedRoles array, redirect to unauthorized
  // allowedRoles can be a string or an array of strings
  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (!rolesArray.includes(user?.role)) {
    redirect("/unauthorized");
  }

  return user;
};
