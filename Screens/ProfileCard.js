import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Menu, TextInput, Modal as PaperModal, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../FirebaseConfig';

const ProfileCard = (props) => {
    const [newCaption, setNewCaption] = useState(props.description); // State for the updated caption
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const openModal = () => setVisibleModal(true);
    const closeModal = () => setVisibleModal(false);

    const handleDelete = async () => {
        try {
            const postRef = doc(db, 'post_data', props.id); // Assuming 'props.id' is the document ID of the post to delete
            await deleteDoc(postRef);
            closeMenu();
            alert("Deleted Successfully!")
        } catch (error) {
            console.error('Error deleting post:', error);
            alert("Error deleting!")
        }
    };

    const handleUpdate = () => {
        // When the update button is clicked, open the modal
        openModal();
    };

    const handleUpdateCaption = async () => {
        try {
            const postRef = doc(db, 'post_data', props.id);
            await updateDoc(postRef, { caption: newCaption }); // Update the 'caption' field with the new caption
            closeModal();
            alert('Updated Successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Error Updating!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pinContainer}>
                <TouchableOpacity>
                    <Image source={{ uri: props.image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name="heart-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name="chatbubble-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons style={styles.icon} name="send-outline" size={30} />
                    </TouchableOpacity>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<IconButton style={{ bottom: 12, left: 155 }} icon="dots-vertical" size={30} onPress={openMenu} />}
                    >
                        <Menu.Item onPress={handleDelete} title="Delete" />
                        <Menu.Item onPress={handleUpdate} title="Update" />
                    </Menu>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        {props.title} <Text style={{ fontWeight: '300' }}>{props.description}</Text>
                    </Text>
                </View>
            </View>

            {/* Modal to update the caption */}
            <PaperModal visible={visibleModal} onDismiss={closeModal}>
                <View style={styles.modalContent}>
                    <TextInput
                        value={newCaption}
                        onChangeText={setNewCaption}
                        placeholder="Enter the new caption"
                        style={styles.captionInput}
                    />
                    <Button mode="outlined" onPress={handleUpdateCaption}>
                        Update
                    </Button>
                </View>
            </PaperModal>
        </View>
    );
};



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
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 8,
    },
    captionInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
        marginBottom: 12,
    },
});

export default ProfileCard;
