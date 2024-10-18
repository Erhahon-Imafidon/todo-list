import { StyleSheet, View, Text } from 'react-native';
import Wrapper from '@/components/Wrapper';

const SettingsScreen = () => {
    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.text}>Settings Screen</Text>
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

export default SettingsScreen;
