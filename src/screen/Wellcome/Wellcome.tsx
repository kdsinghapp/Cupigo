import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#BD0DF4', '#FA3EBA']}
        style={styles.background}
      >
        <View style={styles.content}>
        <Image
        resizeMode='contain'
        source={image.heartLogo}
        style={styles.logo}
      />
          
        </View>
        <View style={{position:'absolute',bottom:30,left:20}}>
        <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandName}>Cupigo!</Text>
        </View>
        <View style={{position:'absolute',bottom:20,right:0}}>
        <Image
        resizeMode='contain'
        source={image.logoLine}
        style={{height:hp(18),width:wp(60)}}
      />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height:hp(40),
   width:170
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
    fontSize:40,
    color: '#FFF',
    marginTop: 20,
    fontWeight:'600'
  },
  brandName: {
    fontSize:40,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Welcome;
