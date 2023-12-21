const express = require("express");
const studentRoutes = require("./routes/student.routes");
const mentorRoutes = require("./routes/mentor.routes");
const db = require("./db/connect");
const app = express();

app.use(express.json());

db();

app.use('/api/students', studentRoutes);
app.use('/api/mentors', mentorRoutes);

app.listen(5000, () => {
    console.log("App is running...")
});

