import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import Colors from '@/constants/Colors';
import Spacer from '@/components/Spacer';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return(
        <SafeAreaProvider style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor={Colors.black}
                />
                <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                    {children}
                    <Spacer />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        padding: 20,
    },
});

export default Wrapper