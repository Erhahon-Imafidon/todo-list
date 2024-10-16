import { Text, View, StyleSheet } from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';
import ListItem from '@/components/List';
import TaskInput from '@/components/TaskInput';

export default function Index() {
    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Task List</Text>
                <>
                    <View style={styles.body}>
                        <ListItem
                            leftElement={<EditButton onPress={() => {}} />}
                            rightElement={<DeleteButton onPress={() => {}} />}
                            content="Items Listings"
                        />

                        <View style={styles.addTask}>
                            <TaskInput />
                            <AddButton onPress={() => {}} />
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
});
