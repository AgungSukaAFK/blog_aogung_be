import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "User route",
  });
});

router.post("/create", userController.createUser);

router.post("/update", authMiddleware, userController.updateUser);

router.get("/whoami", authMiddleware, userController.getUserInfo);

export const userRouter = router;
