import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../../configs/Header';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { image } from '../../configs/utils/images';
import Line from '../../assets/svg/line.svg';
import LinearGradient from 'react-native-linear-gradient';

const subscriptions = [
  {
    logo: image.platinum,
    price: '14.99€',
    live: '50 EXTRA LIVES',
    rose: '100 ROSES',
  },
  {
    logo: image.gold,
    price: '7.99€',
    live: '20 EXTRA LIVES',
    rose: '50 ROSES',
  },
  {
    logo: image.silver,
    price: '4.99€',
    live: '5 EXTRA LIVES',
    rose: '20 ROSES',
  },
];

export default function Subscription() {
  const [currentSubscription, setCurrentSubscription] = useState(0);

  const handleLeftPress = () => {
    setCurrentSubscription((prev) => (prev > 0 ? prev - 1 : subscriptions.length - 1));
  };

  const handleRightPress = () => {
    setCurrentSubscription((prev) => (prev < subscriptions.length - 1 ? prev + 1 : 0));
  };

  const { logo, price, live, rose } = subscriptions[currentSubscription];

  return (
    <View style={styles.container}>
      <Header title='Subscription' />
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={image.Sub_b}
            resizeMode='cover'
            style={styles.image}
          />
          <View style={styles.subscriptionDetails}>
            <Image source={logo} resizeMode='contain' style={styles.logo} />
            <View style={styles.lineContainer}>
              <Line />
            </View>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.live}>{live}</Text>
          </View>
          <View style={styles.roseContainer}>
            <Text style={styles.roseText}>{rose}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleLeftPress}>
                <Image source={image.left} style={styles.arrowButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRightPress}>
                <Image source={image.right} style={styles.arrowButton} />
              </TouchableOpacity>
            </View>
            <Text style={styles.detailText}>CUSTOMIZABLE WALL</Text>
            <Text style={styles.detailText}>LEAVE THE CHAT AT ANY TIME WITHOUT PENALTY</Text>
            <Text style={styles.detailText}>ADD MULTIPLE PHOTOS</Text>
          </View>
        </View>
        <LinearGradient colors={['#BD0DF4', '#FA3EBA']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.linearGradient}>
          <Text style={styles.buttonText}>Choose this type of subscription</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#fff',
    height: hp(60),
    borderRadius: 20,
    width: wp(90),
    overflow: 'hidden',
    position: 'relative', // Ensure positioning for the absolute image
  },
  image: {
    height: hp(37),
    width: '100%',
    position: 'absolute',
    top: -20,
    left: 0,
  },
  subscriptionDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    height: 20,
  },
  lineContainer: {
    marginTop: 15,
  },
  price: {
    fontSize: 50,
    fontWeight: '900',
    color: '#fff',
  },
  live: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  roseContainer: {
    alignItems: 'center',
    marginTop: hp(10),
  },
  roseText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#BD0DF4',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  arrowButton: {
    height: 35,
    width: 35,
  },
  detailText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FA3EBA',
    marginTop: 10,
  },
  linearGradient: {
    marginTop: 20,
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
