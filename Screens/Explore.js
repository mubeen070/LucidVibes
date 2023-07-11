import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SearchPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        Alert.alert("Success!")
        // const results = fetchSearchResults(searchText); 
        // setSearchResults(results);
    };

    const renderSearchItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Search"
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={styles.searchInput}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Image source={require('../assets/searchIcon.png')} style={styles.searchIcon} />
            </TouchableOpacity>
            <FlatList
                data={searchResults}
                renderItem={renderSearchItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.searchResults}
            />
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
        borderWidth: .3,
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
        flex: 1,
        margin: 5,
        aspectRatio: 1,
    },
    itemImage: {
        flex: 1,
        borderRadius: 10,
    },
});

export default SearchPage;
