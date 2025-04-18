import EmailLog  from '../models/EmailLog.js';

export const createAssignedEmailLog = async (task, assignedUser) => {
  try {
    await EmailLog.create({
      recipient_email: assignedUser.email,
      subject: 'New Task Assigned',
      body: 'A new task has been assigned:',
      task_id: task.id,
      sender_id: task.sender_id,
    });
  } catch (error) {
    console.error('Error creating email log:', error);
  }
};


export const createCompletedEmailLog = async (task) => {
  try {
    await EmailLog.create({
      recipient_email: task.sender.email,
      subject: 'Task Completed',
      body: `The task '${task.title}' has been marked as completed by the assignee.`,
      task_id: task.id,
      sender_id: task.assigned_to,
    });
  } catch (error) {
    console.error('Failed to create completion email log:', error);
  }
};