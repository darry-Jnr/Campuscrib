import express from "express";
import "dotenv/config";
import cors from "cors"
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js"

const app = express();
const port = parseInt(process.env.PORT) || 4000;
connectDB();

app.use(cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // if you want to send cookies
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Api working")
});

app.use('/api/auth', authRouter)

app.listen(port, ()=> {
    console.log(`server started on port ${port}`)
})