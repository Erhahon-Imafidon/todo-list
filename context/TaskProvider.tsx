import React, { createContext, useState, useContext, ReactNode } from 'react';
import useStorageState from '@/hooks/useStorageState';

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

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useStorageState<string[]>('task', []);
    const [newTask, setNewTask] = useStorageState<string>('newTask', '');
    // State to store the task being edited
    const [editingTask, setEditingTask] = useStorageState<string>(
        'editingTask',
        ''
    );
    // State to store the index of the task being edited
    const [editingTaskIndex, setEditingTaskIndex] = useStorageState<
        number | null
    >('editingTaskIndex', null);

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
