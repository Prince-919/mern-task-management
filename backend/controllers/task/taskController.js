const { Task } = require("../../models");

const taskController = {
  // create a task
  async create(req, res) {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },

  // get all tasks
  async getAll(req, res) {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },

  // get single task
  async single(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json(`No task with id: ${id}`);
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },

  // delete a task
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json(`No task with id: ${id}`);
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },

  // update a task
  async update(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        return res.status(404).json(`No task with id: ${id}`);
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
};

module.exports = taskController;
