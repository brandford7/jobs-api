const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/dbConnect");
require("dotenv").config();
require("express-async-errors");
const authenticationMiddleware = require("./middleware/auth");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/',(req,res))


//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`listening on port ${port} `);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
