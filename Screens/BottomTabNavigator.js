import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// Import your screen components
import HomeScreen from './HomeScreen';
import ProfilePage from './ProfileScreen';
import Create from './Create';
import SearchPage from './Explore';

const Tab = createBottomTabNavigator();

const AddScreen = () => { return null }
const BottomTabNavigator = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log(isModalVisible)
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: () => null,
                    tabBarOptions: {
                        activeTintColor: 'red',
                        inactiveTintColor: 'grey',
                    },
                    tabBarStyle: {
                        height: 80,
                        paddingHorizontal: 20
                    },
                    tabBarItemStyle: {
                        marginTop: 0
                    },
                    headerShown: false,

                    tabBarIcon: ({ color }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Search') {
                            iconName = 'search';
                        }
                        else if (route.name === 'Create') {
                            iconName = 'add-circle-outline';
                        }
                        else if (route.name === 'Profile') {
                            iconName = 'person-circle-outline';
                        }
                        return <Ionicons name={iconName} size={30} color={color} />;
                    },

                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchPage} />
                <Tab.Screen name="Create" component={AddScreen}
                    listeners={({ }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            toggleModal();
                        },
                    })} />

                <Tab.Screen name="Profile" component={ProfilePage} />


            </Tab.Navigator >
            <Modal animationType="slide"
                presentationStyle='formSheet'
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}>
                <Create onClose={toggleModal} />

            </Modal>
        </>
    );
};

export default BottomTabNavigator;
