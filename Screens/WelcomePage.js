import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

const WelcomePage = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/cover.jpg')}
            style={styles.container}
        >
            <View style={styles.overlay} />
            <Text style={styles.title}>Welcome to Lucid Vibes!</Text>
            <Text style={styles.description}>Connect, share, and discover with people around the world.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginSignUpForm')}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add a translucent overlay to darken the background image
    },
    title: {
        fontSize: 22,
        color: '#ff9933',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ff9933',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        position: "relative",
        top: 300,
    },
    buttonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        color: '#888',
        paddingHorizontal: 50
    },
});

export default WelcomePage;
