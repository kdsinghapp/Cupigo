import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Search from '../../assets/svg/search.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import  firestore  from '@react-native-firebase/firestore';
const Message = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);

  // Function to fetch matches and messages from Firestore
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesSnapshot = await firestore().collection('matches').get();
        const matchesData = matchesSnapshot.docs.map(doc => ({
          id: doc.id,
          image: doc.data().imageUrl // Assuming imageUrl is stored in Firestore
        }));
        setMatches(matchesData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await firestore().collection('messages').get();
        const messagesData = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          message: doc.data().message,
          time: doc.data().time,
          unread: doc.data().unread
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMatches();
    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Message</Text>
      <View style={styles.searchInput}>
        <Search />
        <TextInput
          placeholder="Search"
          style={{ marginLeft: 10 }}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      <Text style={styles.sectionTitle}>New Matches</Text>
      <View style={{ height:80}}>
        <FlatList
          horizontal
          data={matches}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // Navigate to match details or chat screen
                navigation.navigate(ScreenNameEnum.CHAT_SCREEN);
              }}
              style={[{ borderWidth: 2, borderColor: '#fff' }, styles.matchImage]}
            >
              <Image source={{ uri: item.image }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 25 }} />
              <View style={{ height: 8, width: 8, borderRadius: 4, right: 0, top: 5, backgroundColor: '#BFFF6F', position: 'absolute' }} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={styles.sectionTitle}>Messages</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Navigate to chat screen with user details
              navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { userId: item.id }); // Pass userId or other details as needed
            }}
            style={styles.messageItem}
          >
            {/* Replace with actual user image from Firestore */}
            <Image source={{ uri: 'https://example.com/userimage.jpg' }} style={styles.userImage} />
            <View style={styles.messageLeft}>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userMessage}>{item.message}</Text>
              </View>
            </View>
            <View style={styles.messageRight}>
              <Text style={styles.messageTime}>{item.time}</Text>
              {item.unread > 0 && (
                <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </LinearGradient>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5A2D82',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  matchImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  messageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  userMessage: {
    fontSize: 14,
    color: 'gray',
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
  },
  unreadBadge: {
    backgroundColor: '#5A2D82',
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Message;
