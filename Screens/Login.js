import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { auth } from '../FirebaseConfig';
import { ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAvoidingView } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);

        } catch (error) {
            console.error(error)
            alert("Couldn't Sign in : " + error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>

                <View>
                    <Text style={{ textAlign: "center", fontSize: 32, bottom: 20 }}>Vib'in!</Text>
                </View>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                {loading ? <ActivityIndicator size="large" color="#000ff" />
                    : <>
                        <TouchableOpacity style={styles.buttons}>
                            <Button title="Login" onPress={handleLogin} color="white" />
                        </TouchableOpacity>
                    </>

                }
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 25
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