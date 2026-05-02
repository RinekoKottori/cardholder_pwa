import { registrateUser } from "./credits";
import{isoWithMicroseconds} from "../helper/get_iso_with_ms";

export const responseRegisterOwner = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  email: registrateUser.email,
  created_at: isoWithMicroseconds(),
  updated_at: isoWithMicroseconds(),
  role_code: "OWNER",
};

export const responseRegisterAdmin = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  email: registrateUser.email,
  created_at: isoWithMicroseconds(),
  updated_at: isoWithMicroseconds(),
  role_code: "ADMIN",
};

export const responseRegisterUser = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  email: registrateUser.email,
  created_at: isoWithMicroseconds(),
  updated_at: isoWithMicroseconds(),
  role_code: "MEMBER",
};

export const responseToken = {
  access_token: "valid-access-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "valid-refresh-token",
};
