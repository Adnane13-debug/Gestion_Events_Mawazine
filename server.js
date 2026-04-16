require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const stageRoutes = require("./routes/stageRoutes");
const artistRoutes = require("./routes/artistsRoutes");
const concertRoutes = require("./routes/concertRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/stages", stageRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error.message);
  });