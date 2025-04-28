import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    res.json(user);
  } catch (error) {
    if (error.code === "P2025") res.status(404).send("User not found");
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, age } });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, age },
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, age },
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.send(`User ${deletedUser.name} deleted`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
