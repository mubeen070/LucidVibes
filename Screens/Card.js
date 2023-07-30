import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Menu } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";


const Card = (props) => {
    return (
        <View style={styles.continer}>
            <View style={styles.pinContainer}>
                <TouchableOpacity >
                    <Image source={{ uri: props.image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>

                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name='heart-outline' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name='chatbubble-outline' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name='send-outline' size={30} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>{props.title} <Text style={{ fontWeight: '100', }} >{props.description}</Text> </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
    , pinContainer: {
        width: 350,
        marginTop: 20,
        padding: 20,
        borderTopWidth: 0.5,
        borderColor: 'grey'
    },
    image: {
        borderRadius: 30,
        width: '100%',
        height: 500,
        borderRadius: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10
    },
    icon: {
        paddingEnd: 10
    }
});

export default Card;
