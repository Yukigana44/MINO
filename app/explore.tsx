import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import locations from './card_libraries';

export default function Explore() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const location = locations.find(loc => loc.id === id);

    if (!location) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Lieu non trouvé</Text>
                <Pressable
                    onPress={() => router.back()}
                    style={[styles.button, { backgroundColor: 'gray', marginTop: 20 }]}
                >
                    <Text style={styles.buttonText}>Retour</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{location.title}</Text>
            <Text style={styles.description}>{location.description}</Text>

            <Text style={styles.info}>{location.info}</Text>

            <View style={styles.tagsContainer}>
                {location.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>

            {/* Boutons */}
            <Pressable
                onPress={() => console.log('Voir la fiche')}
                style={[styles.button, { backgroundColor: '#2196F3', marginTop: 20 }]}
            >
                <Text style={styles.buttonText}>{location.bouton}</Text>
            </Pressable>

            <Pressable
                onPress={() => console.log('Ouvrir itinéraire')}
                style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 10 }]}
            >
                <Text style={styles.buttonText}>{location.bouton2}</Text>
            </Pressable>

            <Pressable
                onPress={() => router.back()}
                style={[styles.button, { backgroundColor: 'gray', marginTop: 20 }]}
            >
                <Text style={styles.buttonText}>Retour</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    info: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#555',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
    },
    tag: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        margin: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#333',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});