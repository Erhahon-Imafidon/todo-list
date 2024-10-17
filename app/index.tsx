import { Text, View, StyleSheet, FlatList } from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';
import ListItem from '@/components/List';
import TaskInput from '@/components/TaskInput';
import { useTaskContext } from '@/context/TaskProvider';

const Index = () => {
    const {
        tasks,
        newTask,
        editingTask,
        editingTaskIndex,
        setNewTask,
        setEditingTask,
        handleAddTask,
        handleUpdateTask,
        handleEditTask,
        handleDeleteTask,
    } = useTaskContext();

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
};

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

export default Index;
