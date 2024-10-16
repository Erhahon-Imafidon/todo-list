import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

const AddButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons
                name="plus-circle-outline"
                size={50}
                color="#55BCF6"
            />
        </TouchableOpacity>
    );
};

export default AddButton;
