import { Text, View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </SafeAreaProvider>
  );
}
