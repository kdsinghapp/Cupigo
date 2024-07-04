
  import React from 'react';
  import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { image } from '../../../configs/utils/images';
  
  
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
       
          <View style={styles.headerProfile}>
            <Image source={image.bg} style={styles.profileImage} />
            <View style={{flexDirection:'row',alignItems:'center',height:50}} >

            <Text style={styles.profileName}>Belle Benson</Text>
            <View   style={{height:8,width:8,borderRadius:4,
              marginLeft:10,marginTop:20,
              backgroundColor:'#BFFF6F'}}/>
            </View>
          </View>
          <TouchableOpacity 
          onPress={()=>{
            navigation.goBack()
          }}
          style={{
            position:'absolute',
            top:10,
            left:20
          }}>
            <Image   source={image.left} style={{height:40,width:40}}/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.sender ? styles.senderContainer : styles.receiverContainer]}>
            
              <View style={styles.messageInfo}>
                <Text style={[styles.messageSender, item.sender ? styles.senderName : styles.receiverName]}>
                  {item.sender ? 'You' : 'User'}
                </Text>
                <Text style={styles.messageTime}>{item.time}</Text>
                
              </View>
              <Text style={[styles.messageText, item.sender ? styles.senderText : styles.receiverText]}>
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
     <View style={{width:'65%',     height: 40,}}> 
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
          />
     </View>
          <TouchableOpacity style={{marginLeft:10}}>
          <Image  source={image.send} style={{height:20,width:20}}  resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}}>
          <Image  source={image.emoji} style={{height:20,width:20}} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}}>
          <Image  source={image.gallery} style={{height:20,width:30}} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}}>
          <Image  source={image.mic} style={{height:20,width:20}} resizeMode='contain'/>
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
     
    },
    headerProfile: {
      flex: 1,
     justifyContent:'center',
      alignItems: 'center',
      marginLeft: wp(2),
      marginTop:40
    },
    profileImage: {
      width: 120,
      height:120,
      borderRadius:60,
    },
    profileName: {
      marginLeft: wp(2),
      fontSize: 18,
      fontWeight: 'bold',
      color:'#33196B',
      marginTop:20
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
      borderTopLeftRadius:30,
      borderBottomLeftRadius:30,
      paddingHorizontal:30,
      borderBottomRightRadius:30,
      borderTopRightRadius:0
    },
    receiverContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#fff1fd',
     borderTopLeftRadius:0,
      paddingHorizontal:30,
      borderBottomRightRadius:30,
      borderBottomLeftRadius:30,
      borderTopRightRadius:30
    },
     messageText: {
      fontSize:14,
      marginTop:5
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
      minWidth:'20%'
    },
    messageTime: {
      fontSize: 12,
      color: '#4635E2',
      opacity: 0.5,
      marginLeft:20
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
      
 
    },
  });
  