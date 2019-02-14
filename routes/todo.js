////////////////
// TODO ROUTE //
////////////////

const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

// Param body: title
router.post("/create", async (req, res) => {
  try {
    const title = req.body.title;
    const pos = req.body.pos;

    const success = {
      message: "Successfully created"
    };
    const failure = {
      message: "Not created"
    };
    if (title !== null && pos) {
      const todo = new Todo({
        title: title,
        pos: pos
      });
      await todo.save();
      return res.json(success);
    } else {
      return res.json(failure);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// No params
router.get("/read", async (req, res) => {
  const todos = await Todo.find();
  try {
    if (todos) {
      res.json(todos);
    } else {
      res.json({
        message: "No tasks yet"
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// Param query: id
// Params body: title, isDone, pos
router.post("/update", async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.body.title;
    const pos = req.body.pos;

    const todo = await Todo.findById(id);
    const isDone = todo.isDone;

    if (id !== undefined && id !== "" && todo) {
      // Update isDone only when crossed out
      if (title === undefined) {
        todo.isDone = !isDone;
        await todo.save();
      }
      // else if ()
      // Update Position when drag and drop only
      // else if (title === "") {
      //   todo.title = title;
      //   todo.pos = pos;
      // }

      // Update title only
      // else if (title !== "") {
      // }

      res.json({
        message: "task updated"
      });
    } else {
      res.json({
        message: "No id or invalid id"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Param query: id
router.post("/delete", async (req, res) => {
  try {
    const id = req.query.id;
    const todo = await Todo.findById(id);
    if (id !== undefined && id !== "" && todo) {
      await todo.remove();
      res.json({ message: "task deleted" });
    } else {
      res.json({
        message: "No id or invalid id"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;
