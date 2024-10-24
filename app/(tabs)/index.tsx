import { useMemo, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';
import ListItem from '@/components/List';
import TaskInput from '@/components/TaskInput';
import { useTaskContext } from '@/context/TaskProvider';
import { Task } from '@/context/TaskProvider';

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
        loading,
        error,
    } = useTaskContext();

    const keyExtractor = useCallback((item: any) => item.id.toString(), []);

    const renderItem = useCallback(
        ({ item, index }: { item: Task; index: number }) => (
            <ListItem
                leftElement={
                    <EditButton
                        onPress={() => handleEditTask(index, item.task)}
                    />
                }
                rightElement={
                    <DeleteButton onPress={() => handleDeleteTask(item.id)} />
                }
                content={item.task}
            />
        ),
        [handleEditTask, handleDeleteTask]
    );

    const memoizedFlatList = useMemo(
        () => (
            <FlatList
                data={tasks}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        ),
        [tasks, keyExtractor, renderItem]
    );

    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Task List</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#55BCF6" />
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <>
                        <View style={styles.body}>
                            {memoizedFlatList}
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
                )}
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
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
    },

    separator: {
        width: 10,
    },

    error: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Index;
