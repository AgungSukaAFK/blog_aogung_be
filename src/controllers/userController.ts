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
      const user = await userServices.getUserById(decoced.id);
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
  const { user, updatedUser }: { user: userType; updatedUser: userType } =
    req.body;
  if (user && updatedUser) {
    if (user.id !== updatedUser.id) {
      return res.status(400).json({
        success: false,
        message: "user id pengirim dan userid tujuan tidak sesuai",
      });
    }
    try {
      let newUserData: userType = {};

      if (user.username !== updatedUser.username) {
        newUserData.username = updatedUser.username;
      }

      if (user.image !== updatedUser.image) {
        newUserData.image = updatedUser.image;
      }

      if (user.created !== updatedUser.created) {
        newUserData.created = updatedUser.created;
      }

      if (user.role !== updatedUser.role) {
        newUserData.role = updatedUser.role;
      }

      if (Object.keys(newUserData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "tidak ada data yang diupdate",
        });
      }
      if (user.id) {
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

export default { createUser, getUserInfo, updateUser };
