const express = require("express");
const { PORT } = require("./config/variables/variables");
const app = express();
const cors = require("cors");
const http = require("http");
const path = require("path"); // ✅ ADD THIS

const dbConnect = require("./config/database/dbConnect");
const signUpRoute = require("./routes/userRoutes/userSignUpRoute");
const userAuthRoutes = require("./routes/userRoutes/userAuthRoute");
const adminAuthRoutes = require("./routes/adminRoutes/adminRoutes");
const initializeSocket = require("./utils/socketConnection"); // ✅ your socket handler
const userAuthController = require("./controller/userController/userAuthController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const port = PORT;
const server = http.createServer(app);

initializeSocket(server);

app.set("trust proxy", true);
dbConnect();

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  
  // CRITICAL FIX: Intercept requests containing literal "null" or "undefined" in URL params
  // This prevents Mongoose CastErrors from bringing down the server or polluting logs
  if (/\/null(\/|\?|$)/.test(req.url) || /\/undefined(\/|\?|$)/.test(req.url)) {
    console.log("Blocked invalid request with null/undefined parameter");
    return res.status(400).json({ success: false, message: "Invalid parameter" });
  }
  
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "https://demo.agapevows.com",
  "https://admin.agapevows.com",
  "https://agape-vows-matrimony-final.vercel.app",
  "https://agape-vows-matrimony-final-2v1i.vercel.app",
  "https://matrimony-project-client.vercel.app",
  "https://matrimony-project-admin-and-backend.vercel.app",
  "https://agape-vows-new-template-matrimony-3.vercel.app",
  "https://agape-vows-matrimony-final-1gqs.vercel.app",
  "https://agape-vows-matrimony-final-1frq.vercel.app",
  "https://matrimony-final-client.vercel.app",
  "https://matrimony-final.vercel.app",
  "https://agape-vows-live.vercel.app",
  "https://agape-vows-live-z3cg.vercel.app",
  "http://localhost:3000",
  "http://localhost:4000",
  "http://187.127.137.237:3000",
  "http://187.127.137.237:3001",
  "https://agapevows.com",
  "https://www.agapevows.com",
  "https://avadmin.agapevows.com"

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} is not allowed`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Your routes
app.use("/user", signUpRoute);
app.use("/user-auth", userAuthRoutes);
app.use("/admin", adminAuthRoutes);

// TEST ROUTE DIRECTLY IN INDEX.JS
app.post("/test-upload-id-proof/:userId", upload.single("idProof"), userAuthController.uploadIdProof);


app.disable("x-powered-by");

server.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
















