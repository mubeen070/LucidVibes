import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import Card from './Card';
import { auth, db } from '../FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        readData();
    }, []);

    async function readData() {
        try {
            const querySnapshot = await getDocs(collection(db, 'post_data'));
            const postData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(postData);
        } catch (error) {
            console.error('Error reading data:', error);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await readData(); // Fetch updated data
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.statusBar}>
                <Image source={{ uri: auth.currentUser.photoURL }} style={styles.story} />
                <Text style={styles.storyText}>Your story</Text>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title='Pull down to refresh!' />
                }
            >
                {data.map((pin) => (
                    <Card key={pin.id} title={pin.displayName} image={pin.image} description={pin.caption} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    statusBar: {
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.2,
        borderColor: 'black',
    },
    story: {
        width: 80,
        height: 80,
        borderRadius: 100,
        right: 140,
    },
    storyText: {
        right: 140,
        fontSize: 10,
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
    },
});

export default HomeScreen;
