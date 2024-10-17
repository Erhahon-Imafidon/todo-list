import axios from 'axios';

const API_URL = 'https://67107974a85f4164ef2e100e.mockapi.io/tasks';

export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'content-type': 'application/json',
            },
        });
        console.log('Fetched tasks:', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch tasks');
    }
};

// API to add a new task
export const addTask = async (task: { task: string }) => {
    try {
        const response = await axios.post(API_URL, task, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // console.log('New tasks:', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add task');
    }
};

// API to delete a task
export const deleteTask = async (taskId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // console.log('Deleted tasks:', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete task');
    }
};

// API call to edit a task
export const editTask = async (
    taskId: string,
    updatedTask: { task: string }
) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, updatedTask, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // console.log('Updated task:', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to edit task');
    }
};
