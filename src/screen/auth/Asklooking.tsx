import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import { get_quesctions } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';

export default function Asklooking() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, age, gender, address, height1, height2, height3 } = route.params; // Receive data from previous screens
  const isLoading = useSelector(state => state.auth.isLoading);
  const Question = useSelector(state => state.auth.Question);

  // State variables for input fields
  const [genre, setGenre] = useState('');
  const [idealSize, setIdealSize] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const AboutQuestion = Question?.second; // Update to use Question.second

  useEffect(() => {
    if (isFocused) {
      getQuestions();
    }
  }, [isFocused]);

  const getQuestions = async () => {
    try {
      await dispatch(get_quesctions());
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle error here, such as displaying an error message or retrying
    }
  };

  const handleNext = () => {
    // Prepare data object to send to the next screen
    const data = {
      username,
      age,
      gender,
      address,
      height1,
      height2,
      height3,
      genre,
      idealSize,
      idealWeight,
    };

    // Navigate to the next screen with collected data
    navigation.navigate(ScreenNameEnum.ASK_RELATIONSHIP, { ...data });
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={{ flex: 1 }}>
      {isLoading ? <Loading /> : null}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image source={image.whiteLogo} style={styles.logo} resizeMode='contain' />
          <View style={styles.progressBar}>
            <View style={styles.progressIndicator} />
          </View>
        </View>
        <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={styles.contentContainer}>
          {AboutQuestion?.map((question, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={[styles.greetingText, { fontSize: 18, width: '80%' }]}>
                {question.question}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={'#BD0DF4'}
                  style={styles.input}
                  placeholder={`Enter ${question.question}`}
                  value={
                    index === 0 ? genre : index === 1 ? idealSize : index === 2 ? idealWeight : ''
                  }
                  onChangeText={text => {
                    if (index === 0) setGenre(text);
                    else if (index === 1) setIdealSize(text);
                    else if (index === 2) setIdealWeight(text);
                  }}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logo: {
    height: 80,
    width: 80,
  },
  progressBar: {
    backgroundColor: '#eb90e7',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    height: 20,
    width: '90%',
    marginBottom: 20,
  },
  progressIndicator: {
    backgroundColor: '#794ebc',
    height: 20,
    width: '75%', // Adjust width based on completion
    borderRadius: 20,
  },
  contentContainer: {
    minHeight: hp(65),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: mWidth * 0.01,
    borderRadius: mWidth * 0.03,
    marginTop: mHeight * 0.10,
    backgroundColor: colors.cardColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: mHeight * 0.05,
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
    marginTop: 10,
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
