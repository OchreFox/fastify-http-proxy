import { z } from "zod";

export const User = z.object({
  id: z.string(),
  name: z.string(),
});

export const Users = z.object({
  users: z.array(User),
});

export const Ping = z.object({
  status: z.string(),
});

// Model for Swagger
export default {
  User,
  Users,
  Ping,
};
