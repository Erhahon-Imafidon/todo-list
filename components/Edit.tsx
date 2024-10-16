import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const EditButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name="pencil" size={24} color="#55BCF6" />
        </TouchableOpacity>
    );
}

export default EditButton;