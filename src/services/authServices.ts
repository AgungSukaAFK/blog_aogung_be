import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export default {
  async generateLoginToken(user: object) {
    return jwt.sign(user, JWT_SECRET, {
      expiresIn: "4h",
      algorithm: "HS256",
    });
  },
  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded) {
        return decoded;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
