import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, Button, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from 'firebase/firestore';
export default function CameraScreen({ onClose }) {

  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isPreview, setIsPreview] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCatpion] = useState('');
  const cameraRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [imgInfo, setImgInfo] = useState('');

  useEffect(() => {
    <CameraScreen />
  }, [])

  const handleSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid; // Get the current user's ID (Assuming you've set up Firebase Authentication)
      if (!userId) {
        console.log('User not authenticated');
        return;
      }
      const newImageInfo = await getRandomImage();
      setImgInfo(newImageInfo);
      const data = {
        caption,
        userId,
        image: imgInfo,
        createdAt: new Date(),
        displayName: auth.currentUser.displayName,
      };
      console.log(imgInfo)

      // Reference to the Firestore collection
      if (imgInfo) {
        await addDoc(collection(db, 'post_data'), data)
          .then(() => {
            alert("Success!")
            // Clear the caption after successful submission
            setCatpion('');
            setImage(null);
            console.log('Data submitted successfully!');
          })
      } else {
        alert("Try Again")
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const getRandomImage = async () => {
    try {
      const response = await fetch('https://source.unsplash.com/random/800x800?sig=${Math.random()}');
      const imageUrl = response.url;
      return imageUrl;
    } catch (error) {
      console.error('Error fetching random image:', error);
      return null;
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    // Clean up listeners when component is unmounted
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setIsCameraOpen(true);
    } else {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setImage(uri);
      setIsPreview(true);
    }
  };

  const retakePicture = () => {
    setImage(null);
    setIsPreview(false);
  };

  const toggleCamera = () => {
    setCameraType(
      cameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };


  const toggleFlashMode = () => {
    setFlashMode(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  };
  const recordVideo = async () => {
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      const { uri } = await cameraRef.current.recordAsync();
      setIsRecording(false);
      console.log(uri)
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };


  if (isCameraOpen) {
    return (
      <View style={styles.container2}>
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={cameraRef}
          ratio='4:3'
          flashMode={flashMode}>

          <TouchableOpacity style={{ bottom: 600, left: 10 }} onPress={closeCamera}>
            <Ionicons name="close-outline" size={34} color="white" />
          </TouchableOpacity>
          <View style={styles.iconsContainer}>

            <TouchableOpacity onPress={toggleFlashMode} style={styles.iconContainer}>
              <Ionicons
                name={flashMode === FlashMode.off ? 'flash-off' : 'flash'}
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCamera} style={styles.iconContainer}>
              <Ionicons
                name="camera-reverse-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={isPreview ? retakePicture : takePicture} style={styles.iconContainer}>
              <Ionicons
                name={isPreview ? 'ios-refresh' : 'radio-button-on'}
                size={50}
                color="white"
              />
            </TouchableOpacity>
            {!isRecording ? ( // Render video recording button or stop recording button based on recording status
              <TouchableOpacity style={styles.iconContainer} onPress={recordVideo}>
                <Ionicons name="videocam" size={30} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.iconContainer} onPress={stopRecording}>
                <Ionicons name="stop-circle" size={30} color="white" />
              </TouchableOpacity>
            )}

          </View>
        </Camera>
        {
          isPreview && (
            <View style={styles.previewContainer}>
              <TouchableOpacity onPress={closeCamera} style={{ backgroundColor: 'gray', borderRadius: 20, margin: 10 }}>
                <Text style={{ alignItems: 'center', padding: 10 }}>Okay</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: image }}
                style={styles.preview}
                useNativeControls
                resizeMode="contain"
              />
            </View>
          )
        }

      </View >
    );
  }

  return (


    <SafeAreaView style={styles.container} >

      <View style={{ flexDirection: 'row', borderBottomWidth: .3, width: '100%', marginBottom: 30 }}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}><Text style={styles.header}>Cancel</Text></TouchableOpacity>
        <Text style={styles.header}>New Post</Text>
      </View>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <TextInput
          multiline
          style={styles.desInput}
          placeholder="Whats on your mind!"
          value={caption}
          autoFocus={false}
          onChangeText={(text) => setCatpion(text)}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity style={{ position: 'relative', top: 10, left: 120 }} >
        <Button title="Upload" onPress={handleSubmit} />
      </TouchableOpacity>

      <View style={styles.attach}>
        <TouchableOpacity onPress={pickImage}><Ionicons name="attach-outline" size={35} /></TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name='camera-outline' size={35} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image
          source={{ uri: image }}
          style={styles.showImage}
          useNativeControls
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  container2: {
    width: '100%',
    height: "100%",
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginRight: 70,
    marginLeft: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  iconContainer: {
    padding: 20,
    marginBottom: 40
  },
  previewContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 500,
    borderRadius: 10,
    padding: 30,
    marginBottom: 30
  },
  showImage: {
    width: 300,
    height: 500,
    borderRadius: 20,
    padding: 30,
    marginBottom: 30
  },
  inputs: {
    padding: 10,
    width: 300,
    margin: 6,
    borderWidth: .3,
    borderRadius: 10
  },
  desInput: {
    position: 'relative',
    width: 300,
    height: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.2
  },
  cameraIcon: {
    bottom: 20,
    left: 130,
  },
  attach: {
    position: 'relative',
    flexDirection: 'row',
    right: 120,
    bottom: 30
  }
});
