import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useColorScheme
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { auth } from '../../config/firebase';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Sign-up successful! Please check your email for verification.'
      });

      console.log('Sign-up successful:', user);
      navigation.navigate('WelcomePage');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'The email address is already in use by another account.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'The password is too weak. Please use a stronger password.';
    }

    Alert.alert('Sign-up Error', errorMessage);
  };

  return (
    <View style={[styles.container, isDarkMode && darkStyles.container]}>
      <Text style={[styles.title, isDarkMode && darkStyles.title]}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDarkMode && darkStyles.label]}>Full Name</Text>
        <TextInput
          style={[styles.input, isDarkMode && darkStyles.input]}
          placeholder="Enter your full name"
          placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          onChangeText={text => setFullName(text)}
          value={fullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDarkMode && darkStyles.label]}>Email</Text>
        <TextInput
          style={[styles.input, isDarkMode && darkStyles.input]}
          placeholder="Enter your email"
          placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDarkMode && darkStyles.label]}>Password</Text>
        <TextInput
          style={[styles.input, isDarkMode && darkStyles.input]}
          placeholder="Enter your password"
          placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={[styles.signUpButton, isDarkMode && darkStyles.signUpButton]} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.buttonText, isDarkMode && darkStyles.buttonText]}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.footerText, isDarkMode && darkStyles.footerText]}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.feelingLuckyText, isDarkMode && darkStyles.feelingLuckyText]}>Sign up with</Text>
      <View style={styles.signUpWithContainer}>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={24} color="blue" style={styles.icon} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={24} color="red" style={styles.icon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: 'grey',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  signUpButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    color: 'blue',
  },
  signUpWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  socialButtonText: {
    color: 'blue',
  },
  feelingLuckyText: {
    marginTop: 10,
    color: 'black',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
  },
  label: {
    color: '#ccc',
  },
  input: {
    borderColor: '#444',
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#1a73e8',
  },
  buttonText: {
    color: '#fff',
  },
  footerText: {
    color: '#4d90fe',
  },
  feelingLuckyText: {
    color: '#fff',
  },
});
