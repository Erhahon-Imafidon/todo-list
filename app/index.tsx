import { Text, View, StyleSheet } from 'react-native';
import Wrapper from '@/components/Wrapper';
import DeleteButton from '@/components/Delete';
import EditButton from '@/components/Edit';
import AddButton from '@/components/AddButton';

export default function Index() {
    return (
        <Wrapper>
            <View>
                <Text>Edit app/index.tsx to edit this screen.</Text>
                <DeleteButton onPress={() => console.log('Delete')} />
                <EditButton onPress={() => console.log('Edited')} />
                <AddButton onPress={() => console.log('Addition')} />
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({});