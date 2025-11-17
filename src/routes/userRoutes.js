// src/routes/userRoutes.js
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get all users");
});

router.get("/:id", (req, res) => {
  console.log("Hey, howdy!");
  res.send("Get single user by id");
});

router.post("/", (req, res) => {
  res.send("Create a new user");
});

// patch - Update a certain field
// put - Update the full record
router.patch("/:id", (req, res) => {
  res.send("Update some fields for existing user");
});

router.delete("/:id", (req, res) => {
  res.send("Delete a user");
});

export default router;
