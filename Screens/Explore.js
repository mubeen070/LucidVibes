import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Card from './Card';
import { db } from '../FirebaseConfig';

const SearchPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        const displayNameToMatch = searchText;
        try {
            // Assuming 'db' is your Firestore instance
            const querySnapshot = await getDocs(
                query(collection(db, 'post_data'), where('displayName', '==', displayNameToMatch))
            );
            const postData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), // Corrected this line to access the document data
            }));
            setSearchResults(postData);
        } catch (error) {
            console.error('Error reading data:', error);
        }
    };

    const renderSearchItem = ({ item }) => ( // Deconstruct the item object here
        <TouchableOpacity style={styles.itemContainer}>
            <Card key={item.id} title={item.displayName} image={item.image} description={item.caption} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Search by name"
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={styles.searchInput}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Image source={require('../assets/searchIcon.png')} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.flatlist}>
                <FlatList
                    data={searchResults}
                    renderItem={renderSearchItem}
                    keyExtractor={(item, index) => item.id} // Use the unique id as the key
                    numColumns={1}
                    contentContainerStyle={styles.searchResults}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        paddingTop: 20,
    },
    searchInput: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 0.3, // Removed the leading zero
        borderColor: '#ccc',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    searchButton: {
        position: 'absolute',
        top: 30,
        right: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        top: 40,
    },
    searchResults: {
        paddingTop: 10,
    },
    itemContainer: {

    },
    itemImage: {
        flex: 1,
        borderRadius: 10,
    },
    flatlist: {
        marginBottom: 100
    }
});

export default SearchPage;
