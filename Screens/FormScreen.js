import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Animated } from 'react-native';
import Login from './Login';
import Signup from './Signup';


const LoginSignUpForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const fadeAnimation = useRef(new Animated.Value(1)).current;

    const handleToggleForm = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsLoginForm(!isLoginForm);
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    return (

        <Animated.View style={{ opacity: fadeAnimation, flex: 1, justifyContent: 'center', margin: 25 }}>
            {isLoginForm ? <Login /> : <Signup />}
            <Button
                title={isLoginForm ? 'Switch to Sign Up' : 'Switch to Login'}
                onPress={handleToggleForm}
            />
        </Animated.View>

    );
};

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
export default LoginSignUpForm;
