// app/(tabs)/map.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  Modal,
  Switch,
  Platform,
  Linking,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { locations } from "../../data/locations";

const { width } = Dimensions.get("window");

export default function MapScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Modal filtre
  const [modalVisible, setModalVisible] = useState(false);

  const uniqueTags = Array.from(new Set(locations.flatMap((loc) => loc.tags)));
  const [tagFilters, setTagFilters] = useState(
    Object.fromEntries(uniqueTags.map((tag) => [tag, false]))
  );

  const [filterFavoris, setFilterFavoris] = useState(false);
  const [filterPMR, setFilterPMR] = useState(false);
  const [filterPrice1, setFilterPrice1] = useState(false);
  const [filterPrice2, setFilterPrice2] = useState(false);
  const [filterPrice3, setFilterPrice3] = useState(false);

  // Fonction pour filtrer les librairies
  const filteredData = locations.filter((loc) => {
    // Tags
    if (!Object.entries(tagFilters).every(([tag, enabled]) => !enabled || loc.tags.includes(tag))) {
      return false;
    }
    // Favoris
    if (filterFavoris && !loc.favorite) return false;
    // PMR
    if (filterPMR && !loc.accessible) return false;
    // Prix
    if (filterPrice1 && loc.priceRange !== "€") return false;
    if (filterPrice2 && loc.priceRange !== "€€") return false;
    if (filterPrice3 && loc.priceRange !== "€€€") return false;

    return true;
  });

  const toggleFavorite = (id: string) => {
    const locIndex = locations.findIndex((l) => l.id === id);
    if (locIndex !== -1) {
      locations[locIndex].favorite = !locations[locIndex].favorite;
    }
  };

  const openMap = (latitude: number, longitude: number) => {
    const url =
      Platform.OS === "ios"
        ? `maps://app?daddr=${latitude},${longitude}`
        : `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Map */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 47.2186371,
          longitude: -1.5541362,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {filteredData.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.title}
            description={loc.description}
            pinColor={selectedId === loc.id ? "blue" : "red"}
            onPress={() => setSelectedId(loc.id)}
          />
        ))}
      </MapView>

      {/* Bouton filtre */}
      <Pressable
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="#fff" />
        <Text style={{ color: "#fff", marginLeft: 5 }}>Filtrer</Text>
      </Pressable>

      {/* Cards */}
      <View style={styles.cardContainer}>
        <FlatList
          data={filteredData}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Pressable
                style={[
                  styles.card,
                  selectedId === item.id && styles.selectedCard,
                ]}
                onPress={() => {
                  setSelectedId(item.id);
                  router.push(`/explore?id=${item.id}`);
                }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Pressable onPress={() => toggleFavorite(item.id)}>
                    <Ionicons
                      name={item.favorite ? "heart" : "heart-outline"}
                      size={24}
                      color="#f87171"
                    />
                  </Pressable>
                </View>

                <Text style={styles.cardDescription}>{item.description}</Text>

                <View style={styles.tagContainer}>
                  {item.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <Pressable
                    style={styles.mapButton}
                    onPress={() => openMap(item.latitude, item.longitude)}
                  >
                    <Ionicons name="navigate" size={20} color="#fff" />
                    <Text style={styles.mapButtonText}>Itinéraire</Text>
                  </Pressable>

                  {item.accessible && (
                    <Ionicons
                      name="walk"
                      size={24}
                      color="#16a34a"
                      style={{ marginLeft: 10 }}
                    />
                  )}
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>

      {/* Modal filtres */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Filtres</Text>

              {/* Tags dynamiques */}
              {uniqueTags.map((tag) => (
                <View key={tag} style={styles.filterRow}>
                  <Text>{tag}</Text>
                  <Switch
                    value={tagFilters[tag]}
                    onValueChange={(val) =>
                      setTagFilters((prev) => ({ ...prev, [tag]: val }))
                    }
                  />
                </View>
              ))}

              {/* Favoris */}
              <View style={styles.filterRow}>
                <Text>Favoris</Text>
                <Switch
                  value={filterFavoris}
                  onValueChange={(val) => setFilterFavoris(val)}
                />
              </View>

              {/* PMR */}
              <View style={styles.filterRow}>
                <Text>Accessible PMR</Text>
                <Switch
                  value={filterPMR}
                  onValueChange={(val) => setFilterPMR(val)}
                />
              </View>

              {/* Prix */}
              <Text style={{ fontWeight: "bold", marginTop: 10 }}>Prix</Text>
              <View style={styles.filterRow}>
                <Text>€</Text>
                <Switch
                  value={filterPrice1}
                  onValueChange={(val) => setFilterPrice1(val)}
                />
              </View>
              <View style={styles.filterRow}>
                <Text>€€</Text>
                <Switch
                  value={filterPrice2}
                  onValueChange={(val) => setFilterPrice2(val)}
                />
              </View>
              <View style={styles.filterRow}>
                <Text>€€€</Text>
                <Switch
                  value={filterPrice3}
                  onValueChange={(val) => setFilterPrice3(val)}
                />
              </View>

              {/* Bouton appliquer */}
              <Pressable
                style={[styles.mapButton, { marginTop: 10, alignSelf: "center" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.mapButtonText}>Appliquer</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  cardContainer: {
    position: "absolute",
    bottom: 30,
  },
  cardWrapper: {
    width: width - 40,
    paddingLeft: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedCard: {
    borderColor: "#2563eb",
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: "#374151",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapButton: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  mapButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: width - 40,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
