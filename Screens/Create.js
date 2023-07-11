import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, Button, Animated } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { db } from '../FirebaseConfig';
import { addDoc, collection, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

async function writeData(formData) {
  try {
    // let doc = await setDoc(doc(db, "Students", 'Information'), formData)
    let doc = await addDoc(collection(db, 'Students'), formData);
    console.log(doc);
  }
  catch (e) {
    console.error("Error Message:" + e)
  }

}



export default function CameraScreen() {
  useEffect(() => {
    <CameraScreen />
  }, [])
  const [formData, setFormData] = useState({
    caption: '',
    description: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData({
      caption: '',
      description: '',
    });
    writeData(formData);
  };

  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isPreview, setIsPreview] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);


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
      setCapturedImage(uri);
      setIsPreview(true);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
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
          flashMode={flashMode}
          autoFocus={Camera.Constants.AutoFocus.on}
        >

          <TouchableOpacity style={{ bottom: 500, left: 10 }} onPress={closeCamera}>
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
              <Image
                source={{ uri: capturedImage }}
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
      <Text style={styles.header}>New Post</Text>

      <View>
        <TextInput
          multiline
          numberOfLines={20}
          style={styles.desInput}
          placeholder="Whats on your mind!"
          value={formData.age}
          onChangeText={(text) => handleChange('description', text)}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Button title="Upload" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={openCamera} style={styles.cameraIcon}>
        <Ionicons name='camera-outline' size={45} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={pickImage}><Ionicons name="attach-outline" size={40} /></TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  container2: {
    width: '100%',
    height: "100%",
  },
  header: {
    fontSize: 24,
    textAlign: 'center'
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
    padding: 10,
  },
  previewContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  faceDetectionContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 5,
    padding: 10,
  },
  faceDetectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  inputs: {
    padding: 10,
    width: 300,
    margin: 6,
    borderWidth: .3,
    borderRadius: 10
  },
  desInput: {
    height: 100,
    width: 300,
    padding: 10,
    margin: 6,
  },
  cameraIcon: {
    bottom: 280,
    left: 150,
  }
});
