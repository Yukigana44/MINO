import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Appearance, useColorScheme } from 'react-native';
export default function Index() {
  return <h1 className="text-2xl font-bold">Accueil MINO</h1>;
}

const blocks = [
    {
        id: 'map',
        title: 'Carte',
        description: 'Voir la map',
        route: '/map',
        icon: 'map',
        image: 'MinoNative/src/assets/images/map.jpg',
    },
    {
        id: 'events',
        title: 'Événements',
        description: 'Événements à venir',
        route: '/events',
        icon: 'calendar',
        image: ',
    },
    {
        id: 'libraries',
        title: 'Librairies',
        description: 'Librairies recommandées',
        route: '/libraries',
        icon: 'book',
        image: 'https://source.unsplash.com/200x120/?books,library',
    },
    {
        id: 'favorites',
        title: 'Favoris',
        description: 'Vos favoris',
        route: '/favorites',
        icon: 'heart',
        image: '../src/assets/images/favorite_default.png',
    },
    {
        id: 'badges',
        title: 'Badges',
        description: 'Vos badges',
        route: '/badges',
        icon: 'ribbon',
        image: 'https://source.unsplash.com/200x120/?award,badge',
    },
];

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.welcome}>Bienvenue Pauline 👋</Text>
                <Text style={styles.quote}>"Chaque lecture est une aventure."</Text>

                <View style={styles.blocksContainer}>
                    {blocks.map(block => (
                        <Pressable
                            key={block.id}
                            style={styles.block}
                            onPress={() => router.push(block.route)}
                        >
                            <Image source={{ uri: block.image }} style={styles.blockImage} />
                            <Text style={styles.blockTitle}>{block.title}</Text>
                            <Text style={styles.blockDesc}>{block.description}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <Pressable onPress={() => router.push('/')} style={styles.bottomIcon}>
                    <Ionicons name="home" size={28} color="#2196F3" />
                    <Text style={styles.iconLabel}>Home</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/events')} style={styles.bottomIcon}>
                    <Ionicons name="calendar" size={28} color="#555" />
                    <Text style={styles.iconLabel}>Événements</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/map')} style={styles.bottomIcon}>
                    <Ionicons name="map" size={28} color="#555" />
                    <Text style={styles.iconLabel}>Map</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/search')} style={styles.bottomIcon}>
                    <Ionicons name="search" size={28} color="#555" />
                    <Text style={styles.iconLabel}>Recherche</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/profile')} style={styles.bottomIcon}>
                    <Ionicons name="person" size={28} color="#555" />
                    <Text style={styles.iconLabel}>Profil</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { 
        padding: 20, 
        paddingBottom: 120
    },
    welcome: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
    quote: { fontSize: 16, fontStyle: 'italic', color: '#555', marginBottom: 20 },
    blocksContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    block: {
        width: '48%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingBottom: 10,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3
    },
    blockImage: { width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    blockTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
    blockDesc: { fontSize: 12, color: '#555', textAlign: 'center', marginTop: 5 },
    bottomBar: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute', // <- barre fixe
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 5,
        paddingBottom: 10
    },
    bottomIcon: { alignItems: 'center' },
    iconLabel: { fontSize: 12, color: '#555', marginTop: 2 }
});