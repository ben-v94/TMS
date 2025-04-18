import { triggerTaskAssigned, triggerTaskStatusUpdated } from '../services/realtime/pusher.js';

export const taskAssigned = async (task) => {
    await triggerTaskAssigned(task);
};
  
export const taskStatusUpdated = async (task) => {
    const recipient = task.assigned_to === task.sender_id ? task.assigned_to : task.sender_id;
    await triggerTaskStatusUpdated(task, recipient);
};
  

