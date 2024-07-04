import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { image } from '../../configs/utils/images'; // Adjust the path as necessary
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Search from '../../assets/svg/search.svg'
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
const messages = [
  { id: '1', name: 'Emelie', message: 'Sticker 😍', time: '23 min', unread: 1 },
  { id: '2', name: 'Abigail', message: 'Typing..', time: '27 min', unread: 2 },
  { id: '3', name: 'Elizabeth', message: 'Ok, see you then.', time: '33 min', unread: 0 },
  { id: '4', name: 'Chloe', message: 'You: Hello how are you?', time: '55 min', unread: 0 },
  { id: '5', name: 'Grace', message: 'You: Great I will write later..', time: '1 hour', unread: 0 },
];

const matches = [
  { id: '1', image: image.bg },
  { id: '2', image: image.bg },
  { id: '3', image: image.bg },
  { id: '4', image: image.bg },
  { id: '5', image: image.bg },
];

const Message = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Message</Text>
      <View style={styles.searchInput}>
<Search />
      <TextInput  placeholder="Search" style={{marginLeft:10}} />
      </View>
      <Text style={styles.sectionTitle}>New Matches</Text>
      <View style={{height:hp(8),
      }}>
      <FlatList
        horizontal
        data={matches}
        renderItem={({ item }) => (
          <View style={[{borderWidth:2,borderColor:'#fff'},styles.matchImage]}>
          <Image source={item.image}   resizeMode='contain' style={{height:50,width:50,borderRadius:25}}/>
          <View  style={{height:8,width:8,borderRadius:4,
           right:0,top:5,
            backgroundColor:'#BFFF6F',position:'absolute',}} />
          </View>
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
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.CHAT_SCREEN)
          }}
          style={styles.messageItem}>
            <Image source={image.bg} style={styles.userImage} />
            <View style={styles.messageLeft}>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userMessage}>{item.message}</Text>
              </View>
              </View>
              <View style={styles.messageRight}>
                <Text style={styles.messageTime}>{item.time}</Text>
                {item.unread > 0 && (
         <LinearGradient
         colors={['#BD0DF4', '#FA3EBA']} style={styles.unreadBadge}>
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
   flexDirection:'row',
   alignItems:'center',
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
    borderRadius:27.5,
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
    width:'70%'
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
