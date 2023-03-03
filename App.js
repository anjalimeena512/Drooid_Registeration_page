import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Item } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Picker} from '@react-native-community/picker';

const RegistrationForm = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    //console.log(`First Name: ${text}`);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    //console.log(`Last Name: ${text}`);
  };

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
    //console.log(`Mobile Number: ${text}`);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    //console.log(`Email: ${text}`);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    //console.log(`Password: ${text}`);
  };

  const handleSubmit = () => {
    if (!firstName) {
      setFirstNameError('First name is required');
      return;
    }

    if (!lastName) {
      setLastNameError('Last name is required');
      return;
    }

    if (!mobileNumber) {
      setMobileNumberError('Mobile number is required');
      return;
    }

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    console.log('User Input:', { firstName, lastName, mobileNumber, email, password });
    navigation.navigate('AdditionalInformation');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.form}>
        <Input
          placeholder="First Name"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={firstName}
          onChangeText={handleFirstNameChange}
          errorMessage={firstNameError}
        />
        <Input
          placeholder="Last Name"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={lastName}
          onChangeText={handleLastNameChange}
          errorMessage={lastNameError}
        />
        <Input
          placeholder="Mobile Number"
          leftIcon={{ type: 'font-awesome', name: 'mobile' }}
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          errorMessage={mobileNumberError}
        />
        <Input
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
          value={email}
          onChangeText={handleEmailChange}
          errorMessage={emailError}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
          errorMessage={passwordError}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          icon={<Icon name="check" size={15} color="white" />}
          buttonStyle={styles.submitButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const AdditionalInformation = () => {
  const navigation = useNavigation();

  const [gender, setGender] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleAreaOfInterestChange = (value) => {
    setAreaOfInterest(value);
  };

  const handleSubmit = () => {
    console.log(`Selected gender: ${gender}, Selected area of interest: ${areaOfInterest}`);
    navigation.navigate('InterestInformation', { areaOfInterest });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.form}>
        <Picker
          selectedValue={gender}
          onValueChange={handleGenderChange}
          style={{ marginBottom: 40 }}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        <Picker
          selectedValue={areaOfInterest}
          onValueChange={handleAreaOfInterestChange}
          style={{ marginBottom: 20 }}
        >
          <Picker.Item label="Select Area of Interest" value="" />
          <Picker.Item label="Technology" value="technology" />
          <Picker.Item label="Arts" value="arts" />
          <Picker.Item label="Sports" value="sports" />
          <Picker.Item label="Education" value="education" />
          <Picker.Item label="Others" value="other" />
        </Picker>
        <Button
          title="Submit"
          onPress={handleSubmit}
          icon={<Icon name="check" size={15} color="white" />}
          buttonStyle={styles.submitButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const InterestInformation = ({ route }) => {
  const { areaOfInterest } = route.params;

  let information = '';

  switch (areaOfInterest) {
    case 'technology':
      information = 'Technology information :- Technology is a broad term that refers to the tools, methods, techniques, and processes that are used to create, develop, and maintain products, systems, and services. Technology has had a profound impact on human civilization and has transformed many aspects of our daily lives.';
      break;
    case 'arts':
      information = 'Arts information';
      break;
    case 'sports':
      information = 'Sports information';
      break;
    case 'education':
      information = 'Education information';
      break;
    default:
      information = 'No information available';
  }

  return (
    <View style={styles.container}>
      <Text>{information}</Text>
    </View>
  );
};

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Registration" component={RegistrationForm} />
        <Stack.Screen name="AdditionalInformation" component={AdditionalInformation} />
        <Stack.Screen name="InterestInformation" component={InterestInformation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  submitButton: {
    backgroundColor: '#007aff',
    marginTop: 20,
  },
});
