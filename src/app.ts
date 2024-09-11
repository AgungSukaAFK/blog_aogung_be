import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import { notFoundMiddleware } from "./middlewares/notFound";
import versionMiddleware from "./middlewares/versioning";
import errorHandlerMiddleware from "./middlewares/errorHandler";

const app = express();

app.use(cookieparser());

app.use(versionMiddleware);

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  const newDate = new Date();
  const date = newDate.toLocaleString("id-ID");
  console.log(`${date} [Request - ${req.method}] - ${req.path}`);
  next();
});

app.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Welcome to blog.aogung.com API, Beta version",
  });
});

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
