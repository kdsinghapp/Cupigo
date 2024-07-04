import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

const SignupMethod = ({  }) => {

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#BD0DF4', '#FA3EBA']}
        style={styles.background}
      >
        <LinearGradient
          colors={['#BD0DF4', '#FA3EBA']} style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

            borderRadius: 10, height: hp(50), width: wp(90), padding: 20
          }}>
          <Text style={styles.welcomeText}>Hello, <Text style={[styles.welcomeText, { fontWeight: '500' }]}>Welcome</Text> </Text>
          <TouchableOpacity style={[styles.button, { marginTop: 50 }]} onPress={() => { }}>
            <Image source={image.F_icon} style={{ height: 30, width: 30 }} />
            <Text style={styles.buttonText}>Sign with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Image source={image.G_icon} style={{ height: 30, width: 30 }} />
            <Text style={styles.buttonText}>Sign with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPressIn={()=>{
            navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
          }}
          style={styles.button} onPress={() => { }}>
            <Image source={image.call_icon} style={{ height: 30, width: 30 }} />
            <Text style={styles.buttonText}>Sign with Phone</Text>
          </TouchableOpacity>
        </LinearGradient>

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: hp(40),
    width: 170
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 20,
    fontWeight: '800',
    alignSelf: 'center'
  },
  brandName: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFFFFF', // White button background
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000000', // Black text color
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500'

  },
});

export default SignupMethod;
