//src/index.js
import express from "express";
import reminderRoutes from "./routes/reminderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express(); // Creates an Express application instance.
const port = process.env.PORT || 3000;

// Use reminder routes
app.use("/reminders", reminderRoutes);

// Use users routes
app.use("users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); // Starts the server on port 3000 and logs a confirmation message.
