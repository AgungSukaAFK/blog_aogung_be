import { UserModel } from "../models/userModel";
import { userType } from "../types";

const users = UserModel;

export default {
  // Read
  async getAllUsers() {
    return await users.findMany();
  },
  async getUserByName(username: string) {
    return await users.findMany({ where: { username } });
  },
  async getUserById(id: number) {
    return await users.findUnique({ where: { id } });
  },

  //   Update
  async updateUser(data: userType, id: number) {
    let date = new Date();
    let timestamp = date.toISOString();
    data.updated = timestamp;
    return await users.update({ where: { id }, data });
  },

  // Create
  async createUser(data: any) {
    return await users.create({ data });
  },
};
