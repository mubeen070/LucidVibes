
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './WelcomePage';
import BottomTabNavigator from './BottomTabNavigator';
import Login from './Login';

import Signup from './Signup';
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        marginBottom: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});
export default HomeStack;