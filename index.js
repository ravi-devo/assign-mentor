const express = require("express");
const studentRoutes = require("./routes/student.routes");
const db = require("./db/connect");
const app = express();

app.use(express.json());

db();

app.use(studentRoutes);

app.listen(5000, () => {
    console.log("App is running...")
});

