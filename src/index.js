import express from "express";

const app = express(); // Creates an Express application instance.
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world, Nuru here!");
}); // Defines a route (/) that returns Hello, World!.

app.get("/nuru", (req, res) => {
  res.send(
    "If you want the crown be prepared for the weight that comes with it."
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); // Starts the server on port 3000 and logs a confirmation message.
