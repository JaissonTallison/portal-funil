export type UserRole = "reader" | "journalist" | "editor" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
};

export type AuthUser = Pick<User, "name" | "email" | "avatar">;
