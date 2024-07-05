import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { image } from '../../configs/utils/images';
import { useSelector } from 'react-redux';

interface SplashScreenProps {

}

const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const navigation = useNavigation();

  const isLogOut = useSelector((state) => state.auth.isLogOut);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const isFoucs = useIsFocused();

  const checkLogout = () => {
    console.log('================checkLogout===========isLogOut=========', isLogOut);
    console.log('================checkLogout===========isLogin=========', isLogin);
    if (!isLogOut && !isLogin || isLogOut && !isLogin) {
      console.log('================Login====================');
      navigation.navigate(ScreenNameEnum.SIGNUP_METHOD);
    }
    if (!isLogOut && isLogin) {
      console.log('================HomeTab====================');
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
    }
  }

  useEffect(() => {
    checkLogout();
  }, [isFoucs, isLogOut]);



  return (
    <View style={styles.container}>
      <Image
        source={image.appLogo}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe4fa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
  },
});

export default SplashScreen;
