import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type IoniconsName = keyof typeof Ionicons.glyphMap;

const TabBarIcon = ({
    name,
    focused,
}: {
    name: IoniconsName;
    focused: boolean;
}) => {
    return (
        <Ionicons
            name={name}
            size={25}
            color={focused ? Colors.secondary : Colors.black}
        />
    );
};

export default TabBarIcon;
