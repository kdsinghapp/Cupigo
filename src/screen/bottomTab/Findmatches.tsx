import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated } from 'react-native';
import Header from '../../configs/Header';
import { image } from '../../configs/utils/images';
import { useDispatch, useSelector } from 'react-redux';
import { matchPersons } from '../../redux/feature/featuresSlice';
import  firestore  from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Screen } from 'react-native-screens';
import ScreenNameEnum from '../../routes/screenName.enum';
export default function FindMatches() {
  const [modalVisible, setModalVisible] = useState(false);
  const animation = new Animated.Value(0);

  const findMatches = useSelector(state => state.feature.matchPersons);
  const user = useSelector(state => state.auth.User);

  const dispatch = useDispatch();
const navigation = useNavigation()
  useEffect(() => {
    let intervalId;

    if (modalVisible) {
      // Start an interval to fetch matches every 2 seconds
      intervalId = setInterval(() => {
        const params = {
          user_id: user?.id
        };
        dispatch(matchPersons(params));
      }, 10000);

      // Start animation loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Clear interval and stop animation
      clearInterval(intervalId);
      animation.stopAnimation();
      animation.setValue(0);
    }

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, [modalVisible, user?.id]);

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const animatedStyle = {
    opacity: animation,
  };



  const saveUserToFirestore = async (user, matchedUser) => {
    // Check if user and matchedUser are defined and have the necessary properties
    if (!user || !user.id) {
      console.error('User is undefined or invalid');
      return;
    }
    if (!matchedUser || !matchedUser.id) {
      console.error('MatchedUser is undefined or invalid');
      return;
    }
  
    try {
      const userDoc = await firestore().collection('matches').doc(user.id).get();
      if (userDoc.exists) {
        const userContacts = userDoc.data().contacts || [];
        if (!userContacts.some(contact => contact.id === matchedUser.id)) {
          userContacts.push({
            id: matchedUser.id || '', // Handle undefined id
            userName: matchedUser.user_name || 'Unknown', // Handle undefined user_name
            userImage: matchedUser.image || '', // Handle undefined image
          });
          await firestore().collection('matches').doc(user.id).update({
            contacts: userContacts,
          });
        }
      } else {
        await firestore().collection('matches').doc(user.id).set({
          contacts: [{
            id: matchedUser.id || '', // Handle undefined id
            userName: matchedUser.user_name || 'Unknown', // Handle undefined user_name
            userImage: matchedUser.image || '', // Handle undefined image
          }],
        });
      }
      console.log('User saved to Firestore successfully');
      navigation.navigate(ScreenNameEnum.mess)
    } catch (error) {
      console.error('Error saving user to Firestore: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Header title='Find Matches' />

      <View style={styles.center}>
        <TouchableOpacity onPress={handleIconPress}>
          <Image 
            source={image.appLogo}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Animated.View style={[styles.animationContainer, animatedStyle]}>
              <Image source={image.radar} style={{ height: 120, width: 120, marginTop: 40 }} />
            </Animated.View>
 {findMatches&&<TouchableOpacity 
 onPress={()=>{
    saveUserToFirestore(user,findMatches)
 }}
 style={{flexDirection:'row',alignItems:'center',backgroundColor:'pink',borderRadius:20,padding:5}}>

 <Image source={{uri:findMatches?.image}}  style={{height:40,width:40,borderRadius:20}} />
 <Text style={{marginLeft:10,fontWeight:'700',color:'#FA3EBA'}}>{findMatches?.user_name}</Text>
 </TouchableOpacity>
 }

            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  animationContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff4f8b',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
