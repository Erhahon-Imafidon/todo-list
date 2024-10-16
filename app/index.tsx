import { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';
import ListItem from '@/components/List';
import TaskInput from '@/components/TaskInput';

export default function Index() {
    // State to store the list of tasks
    const [tasks, setTasks] = useState<string[]>([]);
    // State to store the new task input value
    const [newTask, setNewTask] = useState<string>('');
    // State to store the task being edited
    const [editingTask, setEditingTask] = useState<string>('');
    // State to store the index of the task being edited
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(
        null
    );

    //  Add function.
    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([newTask, ...tasks]);
            setNewTask('');
        }
    };

    //  Delete function.
    const handleDeleteTask = (index: string) => {
        setTasks(tasks.filter((task) => task !== index));
    };

    //  Function to initiate editing a task
    const handleEditTask = (index: number, task: string) => {
        setEditingTask(task);
        setEditingTaskIndex(index);
    };

    //  Function to update the task in the list
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
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Task List</Text>
                <>
                    <View style={styles.body}>
                        <FlatList
                            data={tasks}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <ListItem
                                    leftElement={
                                        <EditButton
                                            onPress={() => {
                                                handleEditTask(index, item);
                                            }}
                                        />
                                    }
                                    rightElement={
                                        <DeleteButton
                                            onPress={() =>
                                                handleDeleteTask(item)
                                            }
                                        />
                                    }
                                    content={item}
                                />
                            )}
                            ItemSeparatorComponent={() => (
                                <View style={styles.separator} />
                            )}
                        />

                        <View style={styles.addTask}>
                            <TaskInput
                                value={
                                    editingTaskIndex !== null
                                        ? editingTask
                                        : newTask
                                }
                                onChangeText={
                                    editingTaskIndex !== null
                                        ? setEditingTask
                                        : setNewTask
                                }
                            />
                            <AddButton
                                onPress={
                                    editingTaskIndex === null
                                        ? handleAddTask
                                        : handleUpdateTask
                                }
                            />
                        </View>
                    </View>
                </>
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    body: {
        flex: 1,
        justifyContent: 'space-between',
    },

    addTask: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },

    separator: {
        width: 10,
    },
});
