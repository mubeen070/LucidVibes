import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './Screens/BottomTabNavigator';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import WelcomePage from './Screens/WelcomePage';
import LoginSignUpForm from './Screens/FormScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './FirebaseConfig';
import { User } from 'firebase/auth';
import { PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();
export default function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, []);

  return (
    <>
      <PaperProvider>

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginSignUpForm'>
            {user ? <Stack.Screen name="BottomTab" component={BottomTabNavigator} /> : <Stack.Screen name="LoginSignUpForm" component={LoginSignUpForm} />}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
