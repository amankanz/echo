//src/index.js
import express from "express";
import cors from "cors";
import reminderRoutes from "./routes/reminderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express(); // Creates an Express application instance.
const port = process.env.PORT || 3000;

// Enable CORS BEFORE routes
app.use(cors());

// Parse JSON
app.use(express.json()); // Middleware to parse JSON

// Routes
app.use("/reminders", reminderRoutes);
app.use("/users", userRoutes);

// Error handler middleware (keep this after routes)
app.use(errorHandlerMiddleware);

// Start server
app.listen(port, () => {
  console.log(`Echo app listening on port ${port}`);
}); // Starts the server on port 3001 and logs a confirmation message.
