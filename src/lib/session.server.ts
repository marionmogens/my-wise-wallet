import { useSession } from "@tanstack/react-start/server";

export type SessionData = { userId?: string };

const sessionConfig = {
  password:
    process.env.SESSION_SECRET ||
    "monetra-dev-placeholder-secret-please-change-in-production-please-change",
  name: "monetra_session",
  maxAge: 60 * 60 * 24 * 30,
};

export function getMonetraSession() {
  return useSession<SessionData>(sessionConfig);
}
