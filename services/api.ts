import axios from 'axios';

const API_URL = 'https://67107974a85f4164ef2e100e.mockapi.io/tasks';

export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'content-type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch tasks');
    }
};
