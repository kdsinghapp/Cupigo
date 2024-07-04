import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
// import PhoneSvg from '../../assets/svg/Phone.svg'; // Assuming Phone.svg is an SVG component

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={image.appLogo}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Login With Phone,</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <PhoneSvg width={24} height={24} /> Adjust width and height as per your SVG */}
          <TextInput
            placeholderTextColor={'#BD0DF4'}
            style={styles.input}
            placeholder='Enter Your Phone Number'
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  logo: {
    height: 80,
    width: 80,
  },
  contentContainer: {
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: mWidth * 0.01,
    borderRadius: mWidth * 0.02,
    marginTop: mHeight * 0.20,
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
