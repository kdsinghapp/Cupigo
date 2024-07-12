import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import PhoneSvg from '../../assets/svg/Phone.svg';
import { useNavigation } from '@react-navigation/native';
import { Screen } from 'react-native-screens';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import { CountryPicker } from 'react-native-country-codes-picker';
import { login } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
export default function Login() {
  const navigation = useNavigation()
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [code, setCode] = useState('');

  console.log(countryCode);
  
  const send_otp = () => {
    const params = {
      data: {
        country_code: countryCode,
        mobile: phoneNumber,
      },
      navigation: navigation,
    }
    dispatch(login(params))
  }
  return (
    <LinearGradient
      colors={['#BD0DF4', '#FA3EBA']}
      style={{ flex: 1 }}
    >

      {isLoading?<Loading />:null}
      <View style={styles.logoContainer}>
        <Image
          source={image.appLogo}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
      <LinearGradient
        colors={['#BD0DF4', '#FA3EBA']} style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Login With Phone,</Text>
        </View>
        <View style={styles.inputContainer}>
          <PhoneSvg width={24} height={24} />
          <TouchableOpacity onPress={() => setIsPickerVisible(true)} style={styles.countryCodeContainer}>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={'#BD0DF4'}
            style={styles.input}
            placeholder='Enter Your Phone Number'
            value={phoneNumber}
            onChangeText={(txt)=>setPhoneNumber(txt)}
            keyboardType='number-pad'
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            send_otp()

          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
      <CountryPicker
        show={isPickerVisible}
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setCode(item.code);
          setIsPickerVisible(false);
        }}
        popularCountries={['en', 'in', 'pl']}
        style={styles.countryPicker}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  countryPicker: {
    modal: {
      height: 400,
    },
  },
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
    borderRadius: mWidth * 0.03,
    marginTop: mHeight * 0.20,
    backgroundColor: colors.cardColor,


  },
  countryCodeText: {
    fontSize: 16,
    color: '#BD0DF4',
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
    marginLeft: 5,
    marginTop: 1,
    width:'80%'
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
