
  import React, { useState } from 'react';
  import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
  import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
  import { colors } from '../../configs/utils/colors';
  import { image, mHeight, mWidth } from '../../configs/utils/utils';
  import { TextInput } from 'react-native-gesture-handler';
  import LinearGradient from 'react-native-linear-gradient';
  import PhoneSvg from '../../assets/svg/Phone.svg'; 
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { Screen } from 'react-native-screens';
  import ScreenNameEnum from '../../routes/screenName.enum';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../configs/Loader';
import { login_with_otp } from '../../redux/feature/authSlice';


  export default function OtpScreen() {
    const route = useRoute()
    const {mobile} = route.params
    const navigation = useNavigation()
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 4});
    const isLoading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  
  const valid_otp = () => {
    try{
    const params = {
      data: {
        otp: value,
        mobile: mobile,
      },
      navigation: navigation,
    }
    dispatch(login_with_otp(params))
  }catch(err){
    console.log(err);
    
  }
  }
  
  return (
      <LinearGradient
      colors={['#BD0DF4', '#FA3EBA']}
      style={{flex:1}}
    >
      {isLoading?<Loading />:null}
        <View style={styles.logoContainer}>

          <Image
            source={image.whiteLogo}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
        <LinearGradient
      colors={['#BD0DF4', '#FA3EBA']}style={styles.contentContainer}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Enter the verification code</Text>
          </View>
          <View style={styles.codeFieldContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={[
                  styles.cellContainer,
                  isFocused && styles.focusCellContainer,
                ]}>
                <Text
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
          <TouchableOpacity
          onPress={()=>{
            valid_otp()
  
          }}
          style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    codeFieldContainer: {
      height: hp(10),
      alignSelf: 'center',
      marginTop: 30,
    },
    codeFieldRoot: {
      marginTop: 20,
     
    },
    cellContainer: {
      backgroundColor:'#fff',
      borderRadius: 10,
      marginHorizontal: 5,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      width: 55,
    },
    focusCellContainer: {
      borderColor: '#6D6EEC',
    },
    cell: {
      fontWeight: '600',
      fontSize: 24,
      fontFamily: 'Federo-Regular',
      color: '#000',
      textAlign: 'center',
      borderRadius: 10,
    },
    focusCell: {
      borderColor: '#6D6EEC',
      borderRadius: 10,
    },
    container: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    logoContainer: {
      height: hp(20),
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:50
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
  