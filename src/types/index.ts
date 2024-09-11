import { NextFunction, Request, Response } from "express";

interface middlewareProps {
  (req: Request, res: Response, next: NextFunction): void;
}

interface handlerProps {
  (req: Request, res: Response): void;
}

type userType = {
  id?: number;
  username?: string;
  password?: string;
  image?: string;
  created?: string;
  updated?: string;
  role?: string;
};

export { middlewareProps, handlerProps, userType };
