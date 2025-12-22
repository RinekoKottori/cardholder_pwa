import { registrateUser } from "./credits";

export const responseRegisterOwner = {
  id: Math.random().toFixed(100),
  username: registrateUser.userName,
  emai: registrateUser.email,
  created_at: Date.now(),
  updated_at: Date.now(),
  role_code: "OWNER",
};
