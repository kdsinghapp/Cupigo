import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function Asklive() {
  const navigation = useNavigation();
  const route = useRoute();
  const { age, gender, username } = route.params; // Receive age and gender from previous screen
  const [address, setAddress] = useState('');

  const handleNext = () => {
    // Navigate to the next screen with all collected data
    navigation.navigate(ScreenNameEnum.ASK_ABOUT, { username, age, gender, address });
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={{ flex: 1 }}>
      <View style={styles.logoContainer}>
        <Image source={image.whiteLogo} style={styles.logo} resizeMode="contain" />
        <View style={styles.progressBar}>
          <View style={styles.progressIndicator} />
        </View>
      </View>
      <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Where do you live?</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image source={image.city} style={styles.icon} />
          <TextInput
            placeholderTextColor={'#BD0DF4'}
            style={styles.input}
            placeholder="Write your city here"
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  icon:{
height:30,width:30
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    height: 80,
    width: 80,
  },
  progressBar: {
    backgroundColor: '#eb90e7',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    height: 20,
    width: '90%',
    marginBottom: 20,
  },
  progressIndicator: {
    backgroundColor: '#794ebc',
    height: 20,
    width: '45%',
    borderRadius: 20,
  },
  contentContainer: {
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: mWidth * 0.01,
    borderRadius: mWidth * 0.03,
    marginTop: mHeight * 0.10,
    backgroundColor: colors.cardColor,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    width: wp(80),
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    width:'90%'
  },
  button: {
    backgroundColor: colors.btnColor,
    paddingHorizontal: mWidth * 0.05,
    paddingVertical: mHeight * 0.03,
    width: mWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: mHeight * 0.05,
    borderRadius: mWidth * 0.01,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});
