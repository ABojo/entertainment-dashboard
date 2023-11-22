import { User } from "@prisma/client";

type UserResponse = Omit<User, "password">;

export default UserResponse;
