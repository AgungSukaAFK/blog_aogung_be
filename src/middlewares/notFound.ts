import { middlewareProps } from "../types";

export const notFoundMiddleware: middlewareProps = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Tidak ditemukan method atau rute di: ${req.path}`,
  });
};
