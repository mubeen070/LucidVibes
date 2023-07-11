import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screen components
import HomeScreen from './HomeScreen';
import ProfilePage from './ProfileScreen';
import Create from './Create';
import SearchPage from './Explore';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarOptions: {
                    activeTintColor: 'red',
                    inactiveTintColor: 'grey',
                },
                tabBarStyle: {
                    height: 100,
                    paddingHorizontal: 80
                },
                tabBarItemStyle: {
                    marginVertical: 0
                }, headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    }
                    else if (route.name === 'Create') {
                        iconName = 'add';
                    }
                    else if (route.name === 'Library') {
                        iconName = 'library';
                    }
                    else if (route.name === 'Profile') {
                        iconName = 'person-circle-outline';
                    }
                    else if (route.name === 'View') {
                        iconName = 'eye-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },

            })}
        >
            <Tab.Screen name="Home" options={{ headerTitle: "Home" }} component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchPage} />
            <Tab.Screen name="Create" component={Create} />
            <Tab.Screen name="Profile" component={ProfilePage} />

        </Tab.Navigator >
    );
};


export default BottomTabNavigator;
