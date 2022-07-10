import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// sever middleware

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);


// paypal 

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID );
});

// server Running notification
app.get("/", (req, res) => {
  res.send("server is ready");
});

// error resolver
// app.use((err, req, res) => {
//   res.status(500).send({ message: err.message });
// });

// server listener
const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
