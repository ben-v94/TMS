import cron from 'node-cron';
import User from '../models/User.js';
import Task from '../models/Task.js';
import {sendEmail} from '../services/emailService.js';

const URL =  `http://${process.env.HOST}:${process.env.PORT}`;


cron.schedule('*/10 * * * * *',  async () => {
  const today = new Date();
  const users = await User.findAll({
      include: { model:Task,},
  });

  users.forEach(async (user) => {
    const tasks = user.Tasks;
    tasks.forEach(async (task) => {
      if (task.status !== 'completed') {
        const overdue = new Date(task.due_date) < today;
        const taskUrl = `${URL}/tasks/${task.id}`;
        const subject = overdue ? 'Overdue task!' : 'Task reminder';
        const body = overdue ? `The task ${taskUrl} is overdue!`: `You have an incomplete task ${taskUrl}.`;

        await sendEmail(user.email, subject, body);
      }
    });
  });
});