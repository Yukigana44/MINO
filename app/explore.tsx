import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Platform } from "react-native";
import { useSearchParams, useRouter } from "expo-router";

// Exemple de données pour tes librairies
const locations = [
  {
    id: "1",
    title: "A Plein Rêves",
    description: "Librairie jeunesse et généraliste, cosy et agréable pour flâner.",
    hours: "Du Mardi au Samedi de 11h à 19h et le lundi de 14h à 19h",
    address: "13, allée du port Maillard, 44000 Nantes",
    phone: "02 40 35 22 37",
    latitude: 47.2147436,
    longitude: -1.5525628,
  },
  {
    id: "2",
    title: "Durance",
    description: "Librairie spécialisée en littérature adulte et magazines.",
    hours: "Du Mardi au Samedi de 11h à 19h et le lundi de 14h à 19h",
    address: "13, allée du port Maillard, 44000 Nantes",
    phone: "02 40 35 22 37",
    latitude: 47.2173,
    longitude: -1.5534,
  },
  {
    id: "3",
    title: "L'Atalande",
    description: "Grande librairie avec espace jeunesse, mangas et nouveautés.",
    hours: "Du Mardi au Samedi de 11h à 19h et le lundi de 14h à 19h",
    address: "13, allée du port Maillard, 44000 Nantes",
    phone: "02 40 35 22 37",
    latitude: 47.2151525,
    longitude: -1.5589854,
  },
];

export default function Explore() {
  const { id } = useSearchParams<{ id: string }>();
  const router = useRouter();

  // Cherche le lieu correspondant
  const location = locations.find((l) => l.id === id) || locations[0];

  // Fonction pour ouvrir Google Maps / Apple Maps
  const openMap = () => {
    const url = Platform.OS === "ios"
      ? `maps://app?daddr=${location.latitude},${location.longitude}`
      : `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{location.title}</Text>
      <Text style={styles.description}>{location.description}</Text>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Horaires :</Text>
        <Text>{location.hours}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Adresse :</Text>
        <Text>{location.address}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Téléphone :</Text>
        <Text>{location.phone}</Text>
      </View>

      <Pressable style={styles.button} onPress={openMap}>
        <Text style={styles.buttonText}>Ouvrir mon itinéraire</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.backButton]} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Retour</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  infoBlock: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
