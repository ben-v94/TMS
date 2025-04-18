import User from '../models/User.js';
import { sendEmail } from '../services/emailService.js';

export const sendTaskCompletionEmail = async (task) => {
  try {
    const sender = await User.findByPk(task.sender_id);
    if (!sender) return;

    const taskUrl = `http://localhost:8080/tasks/${task.id}`;
    const subject = 'Task Completed';
    const body = `The task '${task.title}' has been marked as completed by the assignee.`;

    await sendEmail(sender.email, subject, body);

  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
};
