import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import colors from '@/constants/Colors';

const Notifications = ({
    header,
    body,
}: {
    header: string | null;
    body: string | null;
}) => {
    return (
        <View style={styles.container}>
            {header && <Text style={styles.header}>{header}</Text>}
            {body && <Text style={styles.body}>{body}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        backgroundColor: colors.white,
        position: 'absolute',
        top: 20,
        zIndex: 2,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },

    body: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default Notifications;
