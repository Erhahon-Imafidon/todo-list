import { StyleSheet, View, Text } from 'react-native';
import Wrapper from '@/components/Wrapper';

const TaskDetails = () => {
    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.text}>Task Details</Text>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default TaskDetails;
