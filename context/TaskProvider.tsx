import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TaskContextProps {
    tasks: string[];
    newTask: string;
    editingTask: string;
    editingTaskIndex: number | null;
    setNewTask: (task: string) => void;
    setEditingTask: (task: string) => void;
    setEditingTaskIndex: (index: number | null) => void;
    handleAddTask: () => void;
    handleDeleteTask: (taskToDelete: string) => void;
    handleEditTask: (index: number, task: string) => void;
    handleUpdateTask: () => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingTask, setEditingTask] = useState<string>('');
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(
        null
    );

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([newTask, ...tasks]);
            setNewTask('');
        }
    };

    const handleDeleteTask = (taskToDelete: string) => {
        setTasks(tasks.filter((task) => task !== taskToDelete));
    };

    const handleEditTask = (index: number, task: string) => {
        setEditingTask(task);
        setEditingTaskIndex(index);
    };

    const handleUpdateTask = () => {
        if (editingTaskIndex !== null && editingTask.trim()) {
            const updatedTasks = [...tasks];
            updatedTasks[editingTaskIndex] = editingTask;
            setTasks(updatedTasks);
            setEditingTask('');
            setEditingTaskIndex(null);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                newTask,
                editingTask,
                editingTaskIndex,
                setNewTask,
                setEditingTask,
                setEditingTaskIndex,
                handleAddTask,
                handleDeleteTask,
                handleEditTask,
                handleUpdateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
