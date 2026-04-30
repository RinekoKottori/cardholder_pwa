import { registrateUser } from "./credits";

export const responseRegisterOwner = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  email: registrateUser.email,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  role_code: "OWNER",
};

export const responseRegisterAdmin = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  email: registrateUser.email,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  role_code: "ADMIN",
};

export const responseRegisterUser = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  email: registrateUser.email,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  role_code: "MEMBER",
};

export const responseToken = {
  access_token: "valid-access-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "valid-refresh-token",
};
