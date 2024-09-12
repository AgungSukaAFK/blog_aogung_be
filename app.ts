import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { userRouter } from "./src/routes/userRouter";
import { authRouter } from "./src/routes/authRouter";
import { notFoundMiddleware } from "./src/middlewares/notFound";
import versionMiddleware from "./src/middlewares/versioning";
import errorHandlerMiddleware from "./src/middlewares/errorHandler";

const app = express();

app.use(cookieparser());

app.use(versionMiddleware);

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://blog.aogung.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const newDate = new Date();
  const date = newDate.toLocaleString("id-ID");
  console.log(`${date} [Request - ${req.method}] - ${req.path}`);
  next();
});

app.get("/api", async (req, res) => {
  res.json({
    success: true,
    message: "Welcome to blog.aogung.com API, Beta version",
  });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});