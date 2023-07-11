import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button } from 'react-native';
import Card from './Card';
import pins from '../ScreenData/ItemData';

const HomeScreen = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
                <Image source={require('../assets/profile.jpg')} style={styles.story} />
                <Text style={styles.storyText}>Your story</Text>
            </View>
            <ScrollView>
                {pins.map((pin) => (
                    <Card key={pin.id} image={pin.image} title={pin.title} description={pin.description} />
                ))
                }
            </ScrollView >
        </View >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 32,
    },
    statusBar: {
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: .2,
        borderColor: 'black'
    },
    story: {
        width: 75,
        height: 75,
        borderRadius: 100,
        right: 140,
    },
    storyText: {
        right: 140,
        fontSize: 10
    }
});

export default HomeScreen;
