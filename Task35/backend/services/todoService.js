const Task = require('../models/todoModel');

class TodoService {
  async getAll(query) {
    if (query) {
      return await Task.find({ title: { $regex: query, $options: 'i' } });
    }
    return await Task.find();
  }

  async add(title) {
    if (!title) throw new Error("Title empty!");
    const newTask = new Task({ title });
    return await newTask.save();
  }

  async update(id, completed) {
    return await Task.findByIdAndUpdate(id, { completed }, { new: true });
  }

  async remove(id) {
    return await Task.findByIdAndDelete(id);
  }
}

module.exports = new TodoService();
