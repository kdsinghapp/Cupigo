
// DistanceScreen.js
import React from 'react';
import { View, StyleSheet, Image ,Text, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import { image } from '../../configs/utils/images';
import { useNavigation } from '@react-navigation/native';

const Distance = () => {
  const users = [
    { id: 1, image: 'user1.jpg', coordinate: { latitude:22.694308,longitude: 75.866650 } },
    { id: 2, image: 'user2.jpg', coordinate: { latitude: 22.693783 ,longitude:75.869683  } },
    { id: 3, image: 'user2.jpg', coordinate: { latitude: 22.691340, longitude:75.866213 ,  } },
    // Add more users here
  ];
const navigation = useNavigation()
  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}
            >
              <Image source={image.left} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Distance</Text>
          </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 22.692591, 
          longitude: 75.867380,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {users.map(user => (
          <Marker key={user.id} coordinate={user.coordinate}>
            <TouchableOpacity style={styles.marker}>
              <Image source={image.img} style={styles.image} />
            </TouchableOpacity>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  
    backgroundColor: '#FFE6F3',
    paddingVertical:5
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33196B',
    marginLeft: -50,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33196B',
  },
  map: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth:10,
    borderColor: '#fff',
    backgroundColor: '#ff69b4',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Distance;
