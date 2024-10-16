import React from 'react';
import { TextInput, StyleSheet, Platform, View } from 'react-native';

const TaskInput = () => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Add a new task"
                placeholderTextColor="#999"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
        fontSize: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 30,
            },
            android: {
                elevation: 5,
                shadowColor: '#00000026',
            },
        }),
    },
});

export default TaskInput;
