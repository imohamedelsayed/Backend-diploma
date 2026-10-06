const express = require("express");
const pool = require("./db");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  try {
    const newUser = await pool.query(
      "insert into users (name, age) values ($1, $2) returning *",
      [name, age],
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
app.get("/users", async (req, res) => {
  const { name, age } = req.query;

  try {
    let query = "SELECT * FROM users";
    let values = [];
    let conditions = [];

    if (name) {
      conditions.push(`name ILIKE $${values.length + 1}`);
      values.push(`%${name}%`);
    }

    if (age) {
      conditions.push(`age = $${values.length + 1}`);
      values.push(age);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// app.get("/users", async (req, res) => {
//   try {
//     const allUsers = await pool.query("select * from users");
//     res.json(allUsers.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await pool.query("delete from users where id = $1", [
      id,
    ]);
    res.json("User deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
