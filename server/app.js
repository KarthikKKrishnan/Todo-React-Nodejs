import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import conn from "./connect.js"
import router from "./router.js"


dotenv.config();

const port = process.env.VITE_PORT;
const app = express();

app.use(cors());


app.use(express.json());
app.use("/api", router);


conn().then(() => {
    app.listen(port, (error) => {
        if(error) {
            return console.log(error);
        }
        console.log(`>Server started on port: ${port}`);
    })
})
.catch(error => {
    console.log(error);
})








