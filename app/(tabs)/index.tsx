import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenue Pauline</Text>
      <Text style={styles.subtitle}>"La lecture ouvre des portes sur d’autres mondes"</Text>

      <Pressable style={styles.card} onPress={() => router.push("/map")}>
        <Text style={styles.cardTitle}>Voir la carte</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => alert("Librairies recommandées")}>
        <Text style={styles.cardTitle}>Librairies recommandées</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => alert("Favoris")}>
        <Text style={styles.cardTitle}>Favoris</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => alert("Badges")}>
        <Text style={styles.cardTitle}>Badges</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, fontStyle: "italic", marginBottom: 20 },
  card: { backgroundColor: "#f2f2f2", padding: 20, marginBottom: 12, borderRadius: 10 },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
});
