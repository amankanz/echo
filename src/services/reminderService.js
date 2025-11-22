//src/services/reminderService.js
import { ReminderModel } from "../models/reminderModel.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const ReminderService = {
  async getAllReminders() {
    // Fetch All Reminders
    return ReminderModel.getAll();
  },

  async getReminderById(reminderId) {
    // Fetch Reminder By Id
    const reminder = await ReminderModel.findById(reminderId);
    if (!reminder) throw new CustomError(ERROR_MESSAGES.REMIND_NOT_FOUND, 404);

    return reminder;
  },

  async createReminder(newReminder) {
    // Create Reminder
    const { reminder, notes, userId } = newReminder;

    const sanitizedReminder = {
      reminder: reminder?.trim(),
      notes: notes?.trim(),
      userId,
    };

    const createdReminder = await ReminderModel.create(sanitizedReminder);
    // console.log(createdReminder);
    return createdReminder;
  },

  async updateReminder(reminderId, newValues) {
    // Update Reminder
    const { reminder, notes, completed } = newValues;

    // 1. Check if reminder exists BEFORE validation
    const existing = await ReminderModel.findById(reminderId);
    if (!existing) {
      throw new CustomError(ERROR_MESSAGES.REMIND_NOT_FOUND, 404);
    }

    // 2. Now validate newValues
    // Build SQL dynamically
    const fields = Object.keys(newValues);
    const setClauses = fields.map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(newValues);
    values.push(reminderId); // Add ID at the end for WHERE clause
    // console.log(values);

    const query = `
      UPDATE reminders
      SET ${setClauses.join(", ")}
      WHERE id= $${values.length}
      RETURNING *;
    `;

    // console.log(query);
    // console.log(values);
    const updatedReminder = await ReminderModel.update(query, values);

    return updatedReminder;
  },

  async deleteReminder(reminderId) {
    // Delete Reminder
    const authenticatedUserId = 1;
    // const authenticatedUserId = reminder.user_id;

    const reminder = await ReminderModel.findById(reminderId);
    if (!reminder) throw new CustomError(ERROR_MESSAGES.REMIND_NOT_FOUND, 404);

    if (reminder.user_id != authenticatedUserId)
      throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);

    const rowCount = await ReminderModel.delete(reminderId);

    if (rowCount === 0)
      throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    return { message: "Reminder deleted successfully" };
  },
};
