import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, StatusBar, View } from 'react-native';
import Colors from '@/constants/Colors';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor={Colors.black}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>{children}</View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        flexGrow: 1,
    },
});

export default Wrapper;
