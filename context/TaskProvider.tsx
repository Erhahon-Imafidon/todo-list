import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useMemo,
    useCallback,
} from 'react';
import useStorageState from '@/hooks/useStorageState';
import { fetchTasks, addTask, deleteTask, editTask } from '@/services/api';

interface Task {
    id: string;
    task: string;
}

interface TaskContextProps {
    tasks: Task[];
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
    loading: boolean;
    error: string | null;
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
    const [tasks, setTasks] = useStorageState<Task[]>('task', []);
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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, []);

    // Add task function
    // const handleAddTask = async () => {
    //     if (newTask.trim()) {
    //         try {
    //             const newTaskObject = await addTask({ task: newTask });
    //             setTasks([newTaskObject, ...tasks]);
    //             setNewTask('');
    //         } catch (error) {
    //             if (error instanceof Error) {
    //                 setError(error.message);
    //             } else {
    //                 setError(String(error));
    //             }
    //         }
    //     }
    // };

    const handleAddTask = useCallback(async () => {
        if (newTask.trim()) {
            try {
                const newTaskObject = await addTask({ task: newTask });
                setTasks((prevTasks) => [newTaskObject, ...prevTasks]);
                setNewTask('');
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            }
        }
    }, [newTask, setTasks, setNewTask]);

    // Delete task function
    const handleDeleteTask = useCallback(
        async (taskId: string) => {
            try {
                await deleteTask(taskId);
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task.id !== taskId)
                );
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            }
        },
        [setTasks]
    );

    const handleEditTask = useCallback(
        (index: number, task: string) => {
            setEditingTask(task);
            setEditingTaskIndex(index);
        },
        [setEditingTask, setEditingTaskIndex]
    );

    const handleUpdateTask = useCallback(async () => {
        if (editingTaskIndex !== null && editingTask.trim()) {
            try {
                const updatedTask = await editTask(tasks[editingTaskIndex].id, {
                    task: editingTask,
                });
                setTasks((prevTasks) => {
                    const updatedTasks = [...prevTasks];
                    updatedTasks[editingTaskIndex] = updatedTask;
                    return updatedTasks;
                });
                setEditingTask('');
                setEditingTaskIndex(null);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            }
        }
    }, [
        editingTask,
        editingTaskIndex,
        setTasks,
        setEditingTask,
        setEditingTaskIndex,
    ]);

    const contextValue = useMemo(
        () => ({
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
            loading,
            error,
        }),
        [
            tasks,
            newTask,
            editingTask,
            editingTaskIndex,
            handleAddTask,
            handleDeleteTask,
            handleEditTask,
            handleUpdateTask,
            loading,
            error,
        ]
    );

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};
