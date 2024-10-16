import { useContext } from 'react';
import TaskContext from '@/context/TaskProvider';

const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

export default useTaskContext;
