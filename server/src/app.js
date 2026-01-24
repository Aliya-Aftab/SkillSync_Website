
require("dotenv").config(); 

const express = require("express");

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const http = require("http");

app.use(
  cors({
  //  origin: process.env.FRONTEND_URL,
 origin: [
      "http://localhost:5173",                     // Localhost
      "https://skill-sync-website-lovat.vercel.app" // Vercel URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");
const smartMatchRouter = require("./routes/smartMatch");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.use("/auth", authRouter);
// app.use("/profile", profileRouter);
// app.use("/request", requestRouter);
// app.use("/user", userRouter);

app.use("/api", chatRouter);
app.use("/api", smartMatchRouter);
app.use("/api", require("./routes/aiAssistant"));

const server = http.createServer(app);
initializeSocket(server);

//database connect before server
connectDB().then(() => {
  try {
    // Check if PORT exists, default to 3000 if missing
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}).catch((err) => {
    console.error("Database connection failed:", err.message);
});