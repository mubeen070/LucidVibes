import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import pins from '../ScreenData/ItemData';
import Card from './Card';
import { useState, useEffect } from 'react';
import { auth } from '../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(pins);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const onRefresh = () => {
        setRefreshing(true);
        const updated = [...pins];
        setData(updated);
        setRefreshing(false);
    };

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title='Pull down to refresh!' />
            }>
                <SafeAreaView style={styles.container}>
                    <Image
                        source={require('../assets/cover.jpg')}
                        style={styles.coverPicture}
                    />
                    <SafeAreaView style={styles.container2}>

                        <Image
                            source={require('../assets/profile.jpg')}
                            style={styles.profilePicture}
                        />
                        <Text style={styles.name}>{auth.name}</Text>
                        <Text style={styles.username}>
                            @lucidvibes
                        </Text>
                        <Text style={styles.bio}>
                            God's Plan!
                        </Text>
                        <SafeAreaView style={styles.container}>
                            <SafeAreaView style={styles.statsContainer}>
                                <SafeAreaView style={styles.statsItem}>
                                    <Text style={styles.statsCount}>2M</Text>
                                    <Text style={styles.statsLabel}>Followers</Text>
                                </SafeAreaView>
                                <SafeAreaView style={styles.statsItem}>
                                    <Text style={styles.statsCount}>1</Text>
                                    <Text style={styles.statsLabel}>Following</Text>
                                </SafeAreaView>
                                <SafeAreaView style={styles.statsItem}>
                                    <Text style={styles.statsCount}>128</Text>
                                    <Text style={styles.statsLabel}>Posts</Text>
                                </SafeAreaView>
                            </SafeAreaView>
                            <SafeAreaView>

                                {data.map((pin) => (
                                    <Card key={pin.id} image={pin.image} title={pin.title} description={pin.description} />
                                ))}
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                </SafeAreaView>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
                {isMenuOpen && (
                    <>
                        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                            <Ionicons name="menu" size={40} color="black" />
                        </TouchableOpacity>
                        <SafeAreaView style={styles.sideMenu}>
                            {/* Add your side menu items here */}
                            <TouchableOpacity style={styles.menuItem} onPress={() => auth.signOut()}>
                                <Ionicons name="log-out" size={24} color="black" />
                                <Text style={styles.menuItemText}>Logout</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </>
                )}
            </ScrollView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    container2: {
        alignItems: 'center',
        bottom: 80,
        width: '100%',
    },
    coverPicture: {
        width: '100%',
        height: 200,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    username: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 10,
    },
    bio: {
        textAlign: 'center',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
    },
    statsItem: {
        alignItems: 'center',
        marginHorizontal: 20
    },
    statsCount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statsLabel: {
        fontSize: 14,
        color: 'gray',
    },
    logout: {
        left: 160,
        fontSize: 18,
        fontWeight: 500,
        padding: 5
    }, menuButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 30
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 50,
    },
    menuItemText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default ProfilePage;
