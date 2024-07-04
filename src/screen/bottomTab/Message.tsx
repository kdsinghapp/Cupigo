import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

const messages = [
  { id: '1', sender: true, text: 'Hey!', time: '2:30 PM', date: 'Today' },
  { id: '2', sender: false, text: 'Hi there!', time: '2:31 PM', date: 'Today' },
  { id: '3', sender: true, text: 'How are you?', time: '2:32 PM', date: 'Today' },
  { id: '4', sender: false, text: 'I am good, thanks!', time: '2:33 PM', date: 'Today' },
  // Add more messages as needed
];

export default function Chat() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerProfile}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
          <Text style={styles.profileName}>User Name</Text>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender ? styles.senderContainer : styles.receiverContainer]}>
            <Text style={[styles.messageText, item.sender ? styles.senderText : styles.receiverText]}>
              {item.text}
            </Text>
            <View style={styles.messageInfo}>
              <Text style={styles.messageTime}>{item.time}</Text>
              <Text style={[styles.messageSender, item.sender ? styles.senderName : styles.receiverName]}>
                {item.sender ? 'You' : 'User'}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons name="happy-outline" size={24} color="#4635E2" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
        />
        <TouchableOpacity>
          <MaterialIcons name="photo-library" size={24} color="#4635E2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={24} color="#4635E2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={24} color="#4635E2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(5),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    marginLeft: wp(2),
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff1fd',
  },
  messageText: {
    fontSize: 16,
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
  },
  messageTime: {
    fontSize: 12,
    color: '#4635E2',
    opacity: 0.5,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  senderName: {
    color: '#4635E2',
  },
  receiverName: {
    color: '#C43F8E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: wp(2),
    backgroundColor: '#fff',
  },
});
