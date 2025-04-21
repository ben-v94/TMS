import Task from '../models/Task.js';
import User from '../models/User.js';
import { taskAssigned, taskStatusUpdated } from '../events/taskEvents.js';
import { sendTaskCompletionEmail } from '../email/sendTaskCompletionEmail.js';
import { sendTaskAssignedEmail } from '../email/sendTaskAssignedEmail.js';
import { isAfter, parseISO } from 'date-fns';
import { createAssignedEmailLog, createCompletedEmailLog  } from '../services/createEmailLogs.js';


const JWT_SECRET = process.env.JWT_SECRET;

export const getAllTasks = async (req, res) => {
  try {
    const limit = 20;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const tasks = await Task.findAll({ limit, offset });

    res.json({
      currentPage: page,
      perPage: limit,
      tasks,
    });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, assigned_to, due_date } = req.body;

  try {
    const dueDateParsed = parseISO(due_date);
    const now = new Date();

    if (!isAfter(dueDateParsed, now)) {
      return res.status(422).json({ error: 'Due date must be in the future.' });
    }

    const task = await Task.create({
      title,
      description,
      assigned_to,
      sender_id: req.user.id,
      due_date,
    });

    const assignedUser = await User.findByPk(assigned_to);

    await taskAssigned(task);
    await sendTaskAssignedEmail(task);
    await createAssignedEmailLog(task, assignedUser);

    res.status(201).json(task);

  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
}

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
}

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (![task.assigned_to, task.sender_id].includes(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    task.status = status;
    await task.save();
    
    await taskStatusUpdated(task);

    if (status === 'completed') {
      await sendTaskCompletionEmail(task);
      await createCompletedEmailLog(task);
    }

    res.json({ message: 'Task status updated successfully', task });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (req.user.id !== task.sender_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
