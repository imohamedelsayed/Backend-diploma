const express = require("express");
const AppDataSource = require("./db");

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.get("/users", async (req, res) => {
  const UserRepository = AppDataSource.getRepository("User");

  const users = await UserRepository.find();

  res.json(users);
});

app.post("/users", async (req, res) => {
  const userRepository = AppDataSource.getRepository("User");
  const newuser = userRepository.create(req.body);
  const savedUser = await userRepository.save(newuser);
  res.json(savedUser);
});

app.put("/users/:id", async (req, res) => {
  const userRepository = AppDataSource.getRepository("User");
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  userRepository.merge(user, req.body);
  const updatedUser = await userRepository.save(user);
  res.json(updatedUser);
});

app.delete("/users/:id", async (req, res) => {
  const userRepository = AppDataSource.getRepository("User");
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await userRepository.remove(user);
  res.json({ message: "User deleted successfully" });
});

app.post("/notes", async (req, res) => {
  const { title, content, userId } = req.body;

  const noteRepository = AppDataSource.getRepository("Note");
  const userRepository = AppDataSource.getRepository("User");

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const newNote = noteRepository.create({
    title,
    content,
    user,
  });

  const savedNote = await noteRepository.save(newNote);

  res.status(201).json(savedNote);
});
app.get("/notes", async (req, res) => {
  const { name } = req.query;

  const noteRepository = AppDataSource.getRepository("Note");

  const query = noteRepository
    .createQueryBuilder("note")
    .leftJoinAndSelect("note.user", "user");

  if (name) {
    query.where("user.name ILIKE :name", {
      name: `%${name}%`, // Use ILIKE for case-insensitive search
    });
  }

  const notes = await query.getMany();

  res.json(notes);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
