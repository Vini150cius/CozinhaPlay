import { Text } from "react-native";
import { View } from "react-native";

export default function Teste() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Teste Screen</Text>
        <Text style={{ marginTop: 10 }}>This is a test screen.</Text>
    </View>
  );
}