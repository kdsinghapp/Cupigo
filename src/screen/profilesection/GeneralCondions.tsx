
  import React from 'react';
  import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { useNavigation } from '@react-navigation/native';
  
  const GeneralCondions = () => {
    const navigation =useNavigation()
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>General conditions</Text>
        <View style={styles.iconContainer}>
          <Image 
            source={image.genral}
            style={styles.icon}
            resizeMode='contain'
          />
        </View>
        <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top:0,
          left:0
        }}
      >
        <Image source={image.left} style={{ height: 40, width: 40 }} />
      </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scope And Application</Text>
          <Text style={styles.sectionText}>
            These General Conditions apply to all agreements, contracts, and transactions between the parties, unless explicitly stated otherwise.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Definitions</Text>
          <Text style={styles.sectionText}>
            Agreement: The binding contract between the parties, including all schedules and annexes.{"\n"}
            Party: Any individual or entity entering into the agreement.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Term And Termination</Text>
          <Text style={styles.sectionText}>
            The agreement shall commence on the effective date and continue until terminated by either party with [x] days' written notice. Either party may terminate the agreement for cause if the other party breaches any material term.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={styles.sectionText}>
            Ownership of intellectual property created before and during the term of the agreement.
          </Text>
        </View>
      </ScrollView>
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
      color: '#800080',
      marginBottom: 20,
      textAlign: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: 20,
      height:hp(20),
  
      justifyContent:'center'
    },
    icon: {
      width: '80%',
      height: '80%',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ff00ff',
      marginBottom: 10,
    },
    sectionText: {
      fontSize: 16,
      color: '#800080',
      lineHeight: 22,
    },
  });
  
  export default GeneralCondions;
  