

  import React from 'react';
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
  
  export default function Asklooking() {
    const navigation = useNavigation()
    return (
      <LinearGradient
      colors={['#BD0DF4', '#FA3EBA']}
      style={{flex:1}}
    >
        <View style={styles.logoContainer}>
          <Image
            source={image.whiteLogo}
            style={styles.logo}
            resizeMode='contain'
          />
          <View  
            
            style={{backgroundColor:'#eb90e7',
            alignSelf:'center',marginTop:30,
            borderRadius:20,height:20,width:'90%',marginBottom:20}}
            >
              <View  style={{backgroundColor:'#794ebc',height:20,width:'75%',borderRadius:20}} />
           
           
            </View>
        </View>
        <LinearGradient
      colors={['#BD0DF4', '#FA3EBA']}style={styles.contentContainer}>
        
       
          <Text style={[styles.greetingText,{fontSize:18,marginTop:20,width:'80%'}]}>What are you looking for ?</Text>
          <View style={styles.inputContainer}>
           
            <TextInput
              placeholderTextColor={'#BD0DF4'}
              style={styles.input}
              placeholder='select a genre'
            />
          </View>
          <Text style={[styles.greetingText,{fontSize:18,marginTop:20,width:'80%'}]}>What would be an ideal size?</Text>
          <View style={styles.inputContainer}>
           
            <TextInput
              placeholderTextColor={'#BD0DF4'}
              style={styles.input}
              placeholder='select your weight'
            />
          </View>
          <Text style={[styles.greetingText,{fontSize:18,marginTop:20,width:'80%'}]}>What would be an ideal weight?</Text>
          <View style={styles.inputContainer}>
           
            <TextInput
              placeholderTextColor={'#BD0DF4'}
              style={styles.input}
              placeholder='select a weight'
            />
          </View>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.ASK_RELATIONSHIP)
  
          }}
          style={styles.button}>
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
      marginTop:30

    },
    logo: {
      height: 80,
      width: 80,
    },
    contentContainer: {
      height: hp(65),
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: mWidth * 0.01,
      borderRadius: mWidth * 0.03,
      marginTop: mHeight * 0.10,
      backgroundColor: colors.cardColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    
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
      marginTop:10,
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
  