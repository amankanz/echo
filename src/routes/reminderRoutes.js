// src/routes/reminderRoutes.js
import { Router } from "express";
import { ReminderController } from "../controllers/reminderController.js";

const router = Router();

router.get("/", ReminderController.getAllReminders);

router.get("/:id", ReminderController.getReminderById);

router.post("/", ReminderController.createReminder);

// patch - Update a certain field
// put - Update the full record
router.patch("/:id", ReminderController.updateReminder);

router.delete("/:id", ReminderController.deleteReminder);

export default router;
