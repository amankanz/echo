//src/controllers/reminderController.js
import { ReminderService } from "../services/reminderService.js";

export const ReminderController = {
  async getAllReminders(req, res, next) {
    // res.send("Get all reminders");
    try {
      const reminders = await ReminderService.getAllReminders();
      res.status(200).json(reminders);
    } catch (error) {
      // res.status(500).send({ message: "Internal Server Error" });
      next(error); // Pass error to errorHandlerMiddleware
    }
  },

  async getReminderById(req, res, next) {
    // res.send(`Get single reminder by id: ${reminderId}`);
    try {
      const reminderId = parseInt(req.params.id);
      const reminder = await ReminderService.getReminderById(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      // res.status(500).send({ message: "Internal Server Error" });
      next(error);
    }
  },

  async createReminder(req, res, next) {
    // const reminder = req.body.reminder;
    // console.log(req.body);
    // res.send(reminder);
    try {
      const newReminder = await ReminderService.createReminder(req.body);
      res.status(200).json(newReminder);
    } catch (error) {
      // res.status(500).send({ message: "Internal Server Error" });
      next(error);
    }
  },

  async updateReminder(req, res, next) {
    // res.send("Update some fields for existing reminder");
    try {
      const reminderId = parseInt(req.params.id);
      const updateReminder = await ReminderService.updateReminder(
        reminderId,
        req.body
      );
      res.status(200).json(updateReminder);
    } catch (error) {
      // res.status(500).send({ message: "Internal Server Error" });
      next(error);
    }
  },

  async deleteReminder(req, res, next) {
    // res.send("Delete a reminder");
    try {
      const reminderId = parseInt(req.params.id);
      const reminder = await ReminderService.deleteReminder(reminderId);
      res.status(200).json(reminderId);
    } catch (error) {
      // res.status(500).send({ message: "Internal Server Error" });
      next(error); // Pass error to errorHandlerMiddleware
    }
  },
};
