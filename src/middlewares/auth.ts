import { middlewareProps } from "../types";
import authServices from "../services/authServices";

export const authMiddleware: middlewareProps = async (req, res, next) => {
  const token = req.cookies["access-token"];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else {
    // const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decoded = await authServices.verifyToken(token);
      if (decoded) {
        req.body.user = decoded;
        next();
      } else {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  }
};
