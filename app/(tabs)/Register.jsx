import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {auth, db} from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo and FontAwesome icons


export default function RegisterScreen() {
  const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignUp = async() => {
      // Implement sign-up logic here
    //   const auth1 = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);

            // Additional actions after successful sign-up, such as navigating to another screen
            console.log('Sign-up successful:', user);
            navigation.navigate('WelcomePage');
      console.log('Full Name:', fullName);
      console.log('Email:', email);
      console.log('Password:', password);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            onChangeText={text => setFullName(text)}
            value={fullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
         <View style={styles.footer}>
         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={styles.footerText}>Already have an account? Login</Text>
    </TouchableOpacity>
        </View>
        <Text style={styles.feelingLuckyText}>Sign up with</Text>
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
       
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
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
    },
    signUpButton: {
      backgroundColor: 'orange',
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

  