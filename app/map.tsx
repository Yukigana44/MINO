// app/map.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import {bottomBar} from "./(tabs)/_layout";

export default function Map() {
  return <h1 className="text-2xl font-bold">Carte</h1>;
}

const locations = [
    {
        id: '1',
        title: 'Lieu 1',
        favorite: true,
        info: 'Informations supplémentaires sur le lieu 1',
        tags: ['Aventure', 'Romance', 'Enfant', 'Histoire', 'Policier', 'Fantaisie', 'SF', 'Thriller'],
        description: 'Ceci est le lieu 1',
        bouton: 'Voir la fiche',
        bouton2: 'Ouvrir mon itinéraire',
    },
    {
        id: '2',
        title: 'Lieu 2',
        favorite: false,
        info: 'Informations supplémentaires sur le lieu 2',
        tags: ['Aventure', 'Romance', 'Enfant', 'Histoire', 'Policier', 'Fantaisie', 'SF', 'Thriller'],
        description: 'Ceci est le lieu 2',
        bouton: 'Voir la fiche',
        bouton2: 'Ouvrir mon itinéraire',
    },
    {
        id: '3',
        title: 'Lieu 3',
        favorite: false,
        info: 'Informations supplémentaires sur le lieu 3',
        tags: ['Aventure', 'Romance', 'Enfant', 'Histoire', 'Policier', 'Fantaisie', 'SF', 'Thriller'],
        description: 'Ceci est le lieu 3',
        bouton: 'Voir la fiche',
        bouton2: 'Ouvrir mon itinéraire',
    },

export default function MapScreen() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <View style={{ flex: 1 }}>
            {/* La Map */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
            >
                {locations.map(loc => (
                    <Marker
                        key={loc.id}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        title={loc.title}
                        description={loc.description}
                        pinColor={selectedId === loc.id ? 'blue' : 'red'}
                        onPress={() => setSelectedId(loc.id)}
                    />
                ))}
            </MapView>

            {/* Les Cards */}
            <View style={styles.cardContainer}>
                <FlatList
                    data={locations}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {
                                setSelectedId(item.id);
                                router.push(`/explore?id=${item.id}`); // exemple navigation
                            }}
                            style={[
                                styles.card,
                                selectedId === item.id && styles.selectedCard
                            ]}
                        >
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        position: 'absolute',
        bottom: 20,
        paddingLeft: 10
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginRight: 10,
        borderRadius: 8,
        width: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    selectedCard: {
        borderColor: 'blue',
        borderWidth: 2
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 5
    }
});

