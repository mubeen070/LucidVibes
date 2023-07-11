import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
const Card = (props) => {

    return (
        <View style={styles.continer}>
            <View style={styles.pinContainer}>
                <TouchableOpacity >
                    <Image source={props.image} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>

                    <Ionicons style={styles.icon} name='heart-outline' size={30} />
                    <Ionicons style={styles.icon} name='chatbubble-outline' size={30} />
                    <Ionicons style={styles.icon} name='send-outline' size={30} />
                </View>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.description}>{props.description}</Text>
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
        paddingHorizontal: 20,
    },
    image: {
        borderRadius: 30,
        width: '100%',
        height: 500,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
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
