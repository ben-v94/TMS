import Pusher from 'pusher';

const pusher = new Pusher({
    appId: "1977056",
    key: "eed626028db4e8467b33",
    secret: "05dff728f1b3f048a910",
    cluster: "ap2",
    useTLS: true
  });
  
  export const triggerTaskAssigned = async (task) => {
    const taskUrl = `http://localhost:8080/tasks/${task.id}`;
  
    await pusher.trigger(`user-${task.assigned_to}`, 'task-assigned', {
      task,
      taskUrl,
    });
  };
  
  export const triggerTaskStatusUpdated = async (task, recipient) => {
    const taskUrl = `http://localhost:8080/tasks/${task.id}`;
  
    await pusher.trigger(`user-${recipient}`, 'task-status-updated', {
      task,
      taskUrl,
    });
  };
  