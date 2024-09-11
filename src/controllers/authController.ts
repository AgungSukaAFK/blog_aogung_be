import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { bcryptClient } from "../lib/bcryptClient";
import authServices from "../services/authServices";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "username dan password harus diisi",
    });
  } else {
    const user = await UserModel.findMany({ where: { username } });
    if (user.length) {
      const selectedUser: { password?: string } = user[0];
      if (
        selectedUser.password &&
        (await bcryptClient.compare(password, selectedUser.password))
      ) {
        delete selectedUser.password;

        const token = await authServices.generateLoginToken(selectedUser);

        res.cookie("access-token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 4, // 4 jam = usia token
        });

        return res.status(200).json({
          success: true,
          message: "Login Berhasil",
          data: selectedUser,
          token,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password salah",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Akun tidak ditemukan",
      });
    }
  }
};

export default { login };
