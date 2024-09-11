import bcrypt from "bcrypt";

export const bcryptClient = {
  async hash(input: string) {
    return await bcrypt.hash(input, 10);
  },

  async compare(input: string, hash: string) {
    return await bcrypt.compare(input, hash);
  },
};
