import { NextFunction, Request, Response } from "express";

const versionMiddleware: any = (req: Request, res: any, next: NextFunction) => {
  const originalJson = res.json;

  res.json = (data: object) => {
    const modifiedData = {
      ...data,
      version: "AoGung.com Blog API v1 @1.0.0",
    };
    originalJson.call(res, modifiedData);
  };
  next();
};

export default versionMiddleware;
