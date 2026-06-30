import type { SessionOptions } from "iron-session";

export type StaffPermissions = {
  intakes: { view: boolean; edit: boolean; delete: boolean };
  clients: { view: boolean; edit: boolean; delete: boolean };
  blogs:   { view: boolean; edit: boolean; delete: boolean };
  logs:    { view: boolean };
  team:    { view: boolean; manage: boolean };
};

export interface SessionData {
  isLoggedIn: boolean;
  role?: "superadmin" | "staff";
  staffId?: string;
  staffName?: string;
  permissions?: StaffPermissions;
}

export const DEFAULT_STAFF_PERMISSIONS: StaffPermissions = {
  intakes: { view: true,  edit: false, delete: false },
  clients: { view: true,  edit: false, delete: false },
  blogs:   { view: false, edit: false, delete: false },
  logs:    { view: false },
  team:    { view: false, manage: false },
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "avashub-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8 hours
  },
};
