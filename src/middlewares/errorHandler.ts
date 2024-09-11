import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   console.error(err.stack);
  console.log(`Error, ${req.method} - path: ${req.path}`);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err?.message,
  });
};

export default errorHandlerMiddleware;
