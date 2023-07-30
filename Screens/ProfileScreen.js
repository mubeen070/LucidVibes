import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import ProfileCard from './ProfileCard';
import { useState, useEffect } from 'react';
import { auth, db } from '../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { getDocs, query, collection, where } from 'firebase/firestore';

const ProfilePage = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await readData(); // Fetch updated data
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        readData();
    }, []);

    async function readData() {
        const displayNameToMatch = auth.currentUser.displayName;

        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'post_data'), where('displayName', '==', displayNameToMatch))
            );
            const postData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(postData);
        } catch (error) {
            console.error('Error reading data:', error);
        }
    }

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title='Pull down to refresh!' />
            }>
                <SafeAreaView style={styles.container}>
                    <Image
                        source={require('../assets/cover.png')}
                        style={styles.coverPicture}
                    />
                    <SafeAreaView style={styles.container2}>

                        <Image
                            source={{ uri: auth.currentUser.photoURL }}
                            style={styles.profilePicture}
                        />
                        <Text style={styles.username}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.bio}>
                            God's Plan!
                        </Text>
                        <SafeAreaView style={styles.container}>
                            <SafeAreaView>
                                {data.map((pin) => (
                                    <ProfileCard key={pin.id} id={pin.id} title={pin.displayName} image={pin.image} description={pin.caption} />
                                ))}
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                </SafeAreaView>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Ionicons name="menu" size={40} color="black" />
                </TouchableOpacity>
                {isMenuOpen && (
                    <>
                        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                            <Ionicons name="menu" size={40} color="black" />
                        </TouchableOpacity>
                        <SafeAreaView style={styles.sideMenu}>
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
        height: 250,
        marginTop: -40,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
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
