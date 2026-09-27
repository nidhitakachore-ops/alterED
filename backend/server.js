const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AlterED Backend is Running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working!"
    });
});

app.post("/api/register", (req, res) => {
    const { name, email, role, password } = req.body;

    res.json({
        message: "Registration request received!",
        user: {
            name,
            email,
            role
        }
    });
});

app.post("/api/login", (req, res) => {
    const { email, password, role } = req.body;

    res.json({
        message: "Login request received!",
        user: {
            email,
            role
        }
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working!"
    });
});

app.post("/api/register", (req, res) => {
    const { name, email, role, password } = req.body;

    res.json({
        message: "Registration request received!",
        user: {
            name,
            email,
            role
        }
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});