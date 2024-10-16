import { View } from 'react-native';

const Spacer = ({ size = 20 }: { size?: number }) => {
    return <View style={{ paddingBottom: size }} />;
};

export default Spacer;
