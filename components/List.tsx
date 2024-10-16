import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ListItemProps {
    leftElement: React.ReactNode;
    rightElement: React.ReactNode;
    content: string;
}

const ListItem: React.FC<ListItemProps> = ({
    leftElement,
    rightElement,
    content,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftElement}>{leftElement}</View>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.rightElement}>{rightElement}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    leftElement: {
        marginRight: 10,
    },
    rightElement: {
        marginLeft: 10,
    },
    content: {
        flex: 1,
    },
});

export default ListItem;
