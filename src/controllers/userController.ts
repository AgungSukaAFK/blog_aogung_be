import { bcryptClient } from "../lib/bcryptClient";
import { userValidator } from "../validations/userValidator";
import { handlerProps, userType } from "../types";
import userServices from "../services/userServices";
import authServices from "../services/authServices";

const createUser: handlerProps = async (req, res) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!userValidator.validateInput(username, password)) {
    return res.status(400).json({
      success: false,
      message: "username dan password harus diisi",
    });
  }

  try {
    const userExist = await userServices.getUserByName(username);

    if (userExist.length) {
      return res.status(400).json({
        success: false,
        message: `User dengan nama '${username}' sudah ada, ganti dengan nama yang lain`,
      });
    } else {
      await userServices
        .createUser({ username, password: await bcryptClient.hash(password) })
        .then((resolve) => {
          return res.status(200).json({
            success: true,
            message: "User berhasil dibuat",
            data: resolve,
          });
        })
        .catch((error) => {
          throw error;
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getUserInfo: handlerProps = async (req, res) => {
  const token = req.cookies["access-token"];
  if (token) {
    const decoced: any = await authServices.verifyToken(token);
    if (decoced.id) {
      let user: any = await userServices.getUserById(decoced.id);
      delete user?.password;
      res.status(200).json({
        success: true,
        message: "User information",
        data: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Token invalid",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const updateUser: handlerProps = async (req, res) => {
  const {
    user: userRef,
    updatedUser,
  }: { user: userType; updatedUser: userType } = req.body;
  if (userRef && updatedUser && userRef.id) {
    const user = await userServices.getUserById(userRef.id);
    try {
      let newUserData: userType = {};

      console.log(`user:`);
      console.log(user);
      console.log(`updatedUser:`);
      console.log(updatedUser);
      if (
        user?.username !== updatedUser?.username &&
        updatedUser.username !== undefined
      ) {
        newUserData.username = updatedUser.username;
      }

      if (
        user?.image !== updatedUser?.image &&
        updatedUser.image !== undefined
      ) {
        newUserData.image = updatedUser.image;
      }

      if (user?.role !== updatedUser?.role && updatedUser.role !== undefined) {
        if (user?.role === "admin") {
          newUserData.role = updatedUser.role;
        }
      }

      console.log(newUserData);

      if (Object.keys(newUserData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "tidak ada data yang diupdate",
        });
      }
      if (user?.id) {
        userServices
          .updateUser(newUserData, user.id)
          .then((resolve) =>
            res.status(200).json({
              success: true,
              message: "User updated",
              data: resolve,
            })
          )
          .catch((e) => {
            throw e;
          });
      } else {
        res.status(400).json({
          success: false,
          message: "user id kosong",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "updatedUser harus diisi",
    });
  }
};

const changePassword: handlerProps = async (req, res) => {
  const {
    user: userRef,
    oldPassword,
    newPassword,
  }: { user: userType; oldPassword: string; newPassword: string } = req.body;
  if (userRef && userRef.id && oldPassword && newPassword) {
    const user = await userServices.getUserById(userRef?.id);
    if (user) {
      if (await bcryptClient.compare(oldPassword, user.password)) {
        const hashedPassword = await bcryptClient.hash(newPassword);
        userServices
          .updateUser({ password: hashedPassword }, user.id)
          .then((resolve) => {
            res.clearCookie("access-token");
            res.status(200).json({
              success: true,
              message: "Password user diubah",
            });
          });
      } else {
        res.status(400).json({
          success: false,
          message: "Password lama tidak sesuai",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Input tidak sesuai",
    });
  }
};

export default { createUser, getUserInfo, updateUser, changePassword };
