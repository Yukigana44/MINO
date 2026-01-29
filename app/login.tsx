import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)"); // vers la home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 8, marginTop: 12 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
