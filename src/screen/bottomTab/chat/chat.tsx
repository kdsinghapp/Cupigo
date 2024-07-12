import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Modal, Keyboard, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { image } from '../../../configs/utils/images';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EmojiSelector from 'react-native-emoji-selector'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const convertFirestoreTimestampToDate = (timestamp) => {
  if (!timestamp) {
    return new Date();
  }
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  return new Date(milliseconds);
};

const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export default function Chat() {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.User);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatId = `${user?.id}${item?.id}`;
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [showModal, setShowModal] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const openImagePicker = () => {
    setShowModal(false); // Close modal first
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      console.log(image);
      // Handle selected image here, e.g., upload or display
    }).catch(error => {
      console.log(error);
    });
  };

  const openVideoPicker = () => {
    setShowModal(false); // Close modal first
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
      // Handle selected video here, e.g., upload or display
    }).catch(error => {
      console.log(error);
    });
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiSelected = (emoji) => {
    setMessageText(messageText + emoji);
  };
  useEffect(() => {
    const fetchMessages = async () => {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('message')
        .orderBy('createdAt', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: convertFirestoreTimestampToDate(doc.data().createdAt),
          }));

          setMessages(messages);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });

      return () => unsubscribe();
    };

    fetchMessages();
  }, [user?.id, item?.id]);

  const onSend = async () => {
    setLoading(true);

    try {
      if (!messageText.trim()) {
        setLoading(false);
        return;
      }

      const messageData = {
        text: messageText,
        createdAt: firestore.FieldValue.serverTimestamp(),
        mobile: user?.mobile,
        sender_id: user?.id,
        receiver_id: item?.id
      };

      setMessageText('');
      await sendMessage(messageData);
    } catch (error) {
      console.error('Error sending message: ', error);
      setLoading(false);
    }
  };

  const sendMessage = async (messageData) => {
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('message')
      .add(messageData);

    setLoading(false);
  };

  const uploadFileToStorage = async (filePath, fileName) => {
    const reference = storage().ref(fileName);
    await reference.putFile(filePath);
    return await reference.getDownloadURL();
  };

  const sendImage = async () => {
    setLoading(true);

    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });

      if (image && image.path) {
        const downloadUrl = await uploadFileToStorage(image.path, `images/${Date.now()}_${user.id}.jpg`);

        const messageData = {
          image: downloadUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
          mobile: user?.mobile,
          sender_id: user?.id,
          receiver_id: item?.id
        };

        await sendMessage(messageData);
      }
    } catch (error) {
      console.error('Error selecting image: ', error);
      setLoading(false);
    }
  };

  const sendVideo = async () => {
    setLoading(true);

    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
      });

      if (video && video.path) {
        const downloadUrl = await uploadFileToStorage(video.path, `videos/${Date.now()}_${user.id}.mp4`);

        const messageData = {
          video: downloadUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
          mobile: user?.mobile,
          sender_id: user?.id,
          receiver_id: item?.id
        };

        await sendMessage(messageData);
      }
    } catch (error) {
      console.error('Error selecting video: ', error);
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('Recording: ', e.current_position);
        return;
      });
      console.log('Recording started:', result);
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      console.log('Recording stopped:', result);

      const downloadUrl = await uploadFileToStorage(result, `audios/${Date.now()}_${user.id}.mp4`);

      const messageData = {
        audio: downloadUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
        mobile: user?.mobile,
        sender_id: user?.id,
        receiver_id: item?.id
      };

      await sendMessage(messageData);
    } catch (error) {
      console.error('Error stopping recording: ', error);
    }
  };

  // const onSelectEmoji = (emoji) => {
  //   setMessageText(messageText + emoji);
  //   setShowEmojiPicker(false);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <Image source={{ uri: item?.image }} style={styles.profileImage} />
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
            <Text style={styles.profileName}>{item?.name}</Text>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                marginLeft: 10,
                marginTop: 20,
                backgroundColor: '#BFFF6F'
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 10,
            left: 20
          }}
        >
          <Image source={image.left} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
      </View>
      {isKeyboardOpen &&  <View  style={{height:55}} />}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender_id === user?.id ? styles.senderContainer : styles.receiverContainer
            ]}
          >
            <View style={styles.messageInfo}>
              <Text
                style={[
                  styles.messageSender,
                  item.sender_id === user?.id ? styles.senderName : styles.receiverName
                ]}
              >
                {item.sender_id === user?.id ? 'You' : item.name}
              </Text>
              <Text style={styles.messageTime}>{formatTime(item.createdAt)}</Text>
            </View>
            {item.text && (
              <Text
                style={[
                  styles.messageText,
                  item.sender_id === user?.id ? styles.senderText : styles.receiverText
                ]}
              >
                {item.text}
              </Text>
            )}
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}
            {item.video && (
              <Video source={{ uri: item.video }} style={styles.messageVideo} />
            )}
            {item.audio && (
              <TouchableOpacity onPress={() => audioRecorderPlayer.startPlayer(item.audio)}>
                <Text style={styles.messageAudio}>Play Audio</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <EmojiSelector
            onEmojiSelected={onEmojiSelected}
            showSearchBar={false}
            columns={8}
            showSectionTitles={false}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        {/* <TouchableOpacity onPress={toggleEmojiPicker} style={{ marginLeft: 10 }}>
          <Image source={image.emoji} style={{ height: 20, width: 20 }} resizeMode='contain' />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setShowModal(true)}>
          <Image source={image.gallery} style={{ height: 20, width: 30 }} resizeMode='contain' />
        </TouchableOpacity> */}
        <View style={{ width: '90%', height: 40 }}>

          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={messageText}
            onChangeText={setMessageText}
          />
        </View>



        {/* <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Image source={image.mic} style={{ height: 20, width: 20 }} resizeMode='contain' />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onSend} style={{ marginLeft: 10 }}>
          <Image source={image.send} style={{ height: 30, width: 30 }} resizeMode='contain' />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={openImagePicker}>

              <Text style={styles.modalText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={openVideoPicker}>

              <Text style={styles.modalText}>Pick a Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: wp(80),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333333',
  },
  cancelButton: {
    paddingVertical: 15,
    width: wp(80),
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#FF4081',
  },
  emojiPickerContainer: {
    position: 'absolute',
    bottom: hp(10),
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(5),
  },
  headerProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    marginLeft: wp(2),
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33196B',
    marginTop: 20,
  },
  messageList: {
    padding: wp(5),
  },
  messageContainer: {
    marginBottom: hp(2),
    padding: wp(3),
    borderRadius: 10,
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 0,
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff1fd',
    borderTopLeftRadius: 0,
    paddingHorizontal: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  messageText: {
    fontSize: 14,
    marginTop: 5,
  },
  senderText: {
    color: '#4635E2',
  },
  receiverText: {
    color: '#C43F8E',
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    minWidth: '20%',
  },
  messageTime: {
    fontSize: 10,
    color: '#4635E2',
    opacity: 0.5,
    marginLeft: 20,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  senderName: {
    color: '#4635E2',
    fontSize: 10,
  },
  receiverName: {
    color: '#C43F8E',
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textInput: {},
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  messageVideo: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  messageAudio: {
    fontSize: 14,
    marginTop: 10,
    color: '#4635E2',
    textDecorationLine: 'underline',
  },
});
