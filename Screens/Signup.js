import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../FirebaseConfig';


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const userInfo = response.user;
            const photoURL = await getRandomImage();
            if (photoURL) {
                await updateProfile(userInfo, {
                    displayName: displayName,
                    photoURL: photoURL,
                })
                    .then(() => {
                        alert("Sign up successful!")
                    }).catch((error) => {
                        alert(error)
                    });
            }
        } catch (error) {
            console.error(error)
            alert("Sign up Failed: " + error.message)
            console.log("Sign up Failed: " + error.message)
        } finally {
            setLoading(false);
        }
    };

    const getRandomImage = async () => {
        try {
            const response = await fetch('https://source.unsplash.com/random/2048x2048?sig=${Math.random()}');
            const imageUrl = response.url;
            return imageUrl;
        } catch (error) {
            console.error('Error fetching random image:', error);
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 28, bottom: 20 }}>Register</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Display Name"
                    autoCapitalize='none'
                    onChangeText={(text) => setDisplayName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                {loading ? <ActivityIndicator size="large" color="#000ff" />
                    : <>
                        <TouchableOpacity style={styles.buttons}>
                            <Button color="white" title="Sign up" onPress={handleSignup} />
                        </TouchableOpacity>
                    </>

                }
            </KeyboardAvoidingView>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 25,
    },
    input: {
        color: 'black',
        marginBottom: 12,
        padding: 15,
        borderWidth: .3,
        borderRadius: 5,
        borderColor: 'black',

    }, buttons: {
        backgroundColor: '#ff9933',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 20,
        top: 10,
    }
});