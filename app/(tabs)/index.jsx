import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/nutri.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nutrimade!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Welcome to Nutimade, the ultimate nutrition companion tailored to help you achieve your health and wellness goals.</ThemedText> 
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ThemedView>
      {/* <ThemedView style={[styles.stepContainer, styles.row]}>
        <TouchableOpacity style={[styles.button, styles.googleButton]}>
          <Icon name="google" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.facebookButton]}>
          <Icon name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
    marginLeft:20,
    marginRight:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'black',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    flex: 0.4,
    marginLeft:80,
    borderRadius:10
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    flex: 0.4,
    marginRight:80,
    borderRadius:10
  },
  reactLogo: {
    height: 250,
    width: 'auto',
    position: 'relative',
  },
});
