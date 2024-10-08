import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import { notFoundMiddleware } from "./middlewares/notFound";
import versionMiddleware from "./middlewares/versioning";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import { upload } from "./lib/multer";

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
    methods: ["GET", "POST", "OPTIONS"],
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

app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Welcome to blog.aogung.com API, Beta version",
  });
});

app.use("/user", userRouter);

app.use("/auth", authRouter);

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({ message: "Image uploaded successfully!", file: req.file });
  } catch (error) {
    res.status(400).json({ error: "Error uploading file" });
  }
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const PORT = process.env.NODE_ENV === "production" ? 0 : 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
