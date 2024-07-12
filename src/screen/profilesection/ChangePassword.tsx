
    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
    import { image } from '../../configs/utils/images'; // Ensure you have this image config
    
    export default function ChangePassword() {
      const navigation = useNavigation();
      const [currentPassword, setCurrentPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
    
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
            <Text style={styles.headerText}>Change password</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Image source={image.lock} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <Image source={image.eye} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Image source={image.lock} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <Image source={image.eye} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Image source={image.lock} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <Image source={image.eye} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFE6F3',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        color: '#333',
        marginLeft: -50,
      },
      inputContainer: {
        marginTop: 20,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        marginBottom: 15,
        paddingVertical:5,
        paddingHorizontal: 10,
      },
      icon: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      textInput: {
        flex: 1,
        height: hp(6),
      },
      eyeIcon: {
        padding: 5,
      },
    });
    
    