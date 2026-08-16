const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("AlterED Backend is Running!");
})

const PORT = 5000;

app.listen(PORT,() => {
    console.log("Server running on port " + PORT);
})