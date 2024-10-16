import { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';
import ListItem from '@/components/List';
import TaskInput from '@/components/TaskInput';
import { index } from '@zxing/text-encoding/es2015/encoding/indexes';

export default function Index() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    // Handle Delete function.
    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([newTask, ...tasks]);
            setNewTask('');
        }
    };

    // Handle Delete function.
    const handleDeleteTask = (index: string) => {
        setTasks(tasks.filter((task) => task !== index));
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
                            renderItem={({ item }) => (
                                <ListItem
                                    leftElement={
                                        <EditButton onPress={() => {}} />
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
                                value={newTask}
                                onChangeText={setNewTask}
                            />
                            <AddButton onPress={handleAddTask} />
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
