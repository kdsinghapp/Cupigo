import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_profile, update_profile } from '../../redux/feature/authSlice';
import { image } from '../../configs/utils/images';
import { colors } from '../../configs/utils/colors';

const Setting = () => {
  const [generalNotification, setGeneralNotification] = useState(false);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [appUpdates, setAppUpdates] = useState(false);

  const navigation = useNavigation();
  const profile = useSelector(state => state.auth.user_profile?.result);
  const user = useSelector(state => state.auth.User);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(get_profile({ user_id: user.id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (profile) {
      setGeneralNotification(profile.general_notification === "ON");
      setSound(profile.sound === "ON");
      setVibrate(profile.vibrate === "ON");
      setAppUpdates(profile.app_update === "ON");
    }
  }, [profile]);

  const handleGeneralNotificationChange = (value) => {
    setGeneralNotification(value);
    updateProfileSettings({ general_notification: value ? "ON" : "OFF" });
  };

  const handleSoundChange = (value) => {
    setSound(value);
    updateProfileSettings({ sound: value ? "ON" : "OFF" });
  };

  const handleVibrateChange = (value) => {
    setVibrate(value);
    updateProfileSettings({ vibrate: value ? "ON" : "OFF" });
  };

  const handleAppUpdatesChange = (value) => {
    setAppUpdates(value);
    updateProfileSettings({ app_update: value ? "ON" : "OFF" });
  };

  const updateProfileSettings = (updatedSettings) => {
    const updatedProfile = {
user_id:user?.id,
      ...updatedSettings,
    };
    dispatch(update_profile(updatedProfile)).then(res=>{
      if (user?.id) {
        dispatch(get_profile({ user_id: user.id }));
      }
  })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 10,
          left: 20
        }}
      >
        <Image source={image.left} style={{ height: 40, width: 40 }} />
      </TouchableOpacity>
      <View style={styles.option}>
        <Text style={styles.optionText}>General Notification</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#ff00ff' }}
          thumbColor={generalNotification ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleGeneralNotificationChange}
          value={generalNotification}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Sound</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#ff00ff' }}
          thumbColor={sound ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSoundChange}
          value={sound}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Vibrate</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#ff00ff' }}
          thumbColor={vibrate ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleVibrateChange}
          value={vibrate}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>App Updates</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#ff00ff' }}
          thumbColor={appUpdates ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleAppUpdatesChange}
          value={appUpdates}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorLight,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5A2D82',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#800080',
    fontWeight: '600'
  },
});

export default Setting;
