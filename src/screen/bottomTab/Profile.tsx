
    import React from 'react';
    import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import RightIcon from '../../assets/svg/Right.svg'; // Assuming you have an SVG or image for the right arrow icon
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
    
    const options = [
      { id: '1', title: 'Biography' },
      { id: '2', title: 'Change Password' },
      { id: '3', title: 'Change Identifier' },
      { id: '4', title: 'Distance' },
      { id: '5', title: 'Privacy Policy' },
      { id: '6', title: 'Rate Cupigo!' },
      { id: '7', title: 'Contact Us' },
      { id: '8', title: 'Subscription' },
      { id: '9', title: 'General conditions of use' },
      { id: '10', title: 'Setting' },
      { id: '11', title: 'Log Out' },
    ];
    
    const Profile = () => {
      const navigation = useNavigation()
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Profile</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={()=>{
                if(item.title == 'Log Out'){
                  navigation.navigate(ScreenNameEnum.SIGNUP_METHOD)
                }
              }}
              style={styles.optionItem}>
                <Text style={styles.optionText}>{item.title}</Text>
                <RightIcon height={35} /> 
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />

          <View   style={{height:60}}/>
          </ScrollView>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F7DFFF',
        padding: 20,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#5A2D82',
      },
      optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
      },
      optionText: {
        fontSize: 18,
        color: '#FA3EBA',
        fontWeight:'500'
      },
    });
    
    export default Profile;
    