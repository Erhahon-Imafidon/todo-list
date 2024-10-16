import { Text, View, StyleSheet } from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';
import ListItem from '@/components/List';

export default function Index() {
    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Task List</Text>
                <ListItem
                    leftElement={<EditButton onPress={() => {}} />}
                    rightElement={<DeleteButton onPress={() => {}} />}
                    content="Items Listings"
                />

                <ListItem
                    leftElement={<EditButton onPress={() => {}} />}
                    rightElement={<DeleteButton onPress={() => {}} />}
                    content="Items Listings"
                />
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
});
