import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { add_support_inquiries } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import { errorToast } from '../../configs/customToast';

export default function ContactUs() {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.User);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
const [message,setmessage] = useState('')
  const contact_us =async()=>{
    if(message == '') return errorToast('message is empty')
const params ={
   user_id:user?.id,
   message:message
}

    dispatch(add_support_inquiries(params)).then(res=>{
      setmessage('')
    })
  }
  return (
    <View style={styles.container}>
      {isLoading?<Loading />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Image source={image.left} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image.contact} style={styles.helpImage} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How can we help?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type Here..."
          multiline
          value={message}
          onChangeText={setmessage}
          keyboardType='default'
        />
      </View>
      <TouchableOpacity onPress={()=>{
        contact_us()
      }}>
        <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </LinearGradient>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6F3',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    position:'absolute',
    top:0
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: -50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  helpImage: {
    width: wp(80),
    height: hp(30),
    resizeMode: 'contain',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6EC7',
    borderRadius: 10,
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
    color: '#FF6EC7',
    fontWeight: '700',
  },
  textInput: {
    height: hp(15),
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
