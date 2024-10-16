import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DeleteButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color="red"
            />
        </TouchableOpacity>
    );
};

export default DeleteButton;
