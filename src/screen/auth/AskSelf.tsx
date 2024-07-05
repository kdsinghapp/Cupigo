import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function AskSelf() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, age } = route.params; // Receive the username and age from the previous screen
  const [gender, setGender] = useState('');

  const handleNext = () => {
    // Pass the username, age, and gender to the next screen
    navigation.navigate(ScreenNameEnum.ASK_LIVE, { username, age, gender });
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
          <Text style={styles.greetingText}>How do you define yourself</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image source={image.Gender} style={styles.icon} />
          <TouchableOpacity onPress={() => setGender('male')} style={gender === 'male' ? styles.selectedButton : styles.genderButton}>
            <Text style={[styles.genderText,{color:gender === 'male'?'#fff':'#BD0DF4'}]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('female')} style={gender === 'female' ? styles.selectedButton : styles.genderButton}>
            <Text style={[styles.genderText,{color:gender === 'female'?'#fff':'#BD0DF4'}]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('transgender')} style={gender === 'transgender' ? styles.selectedButton : styles.genderButton}>
            <Text style={[styles.genderText,{color:gender === 'transgender'?'#fff':'#BD0DF4'}]}>Transgender</Text>
          </TouchableOpacity>
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
    width: '30%',
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
    marginTop: 20,
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
  genderButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: wp(80),
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#BD0DF4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: wp(80),
    alignItems: 'center',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#BD0DF4',
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
