import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';

const WelcomePage = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Home')}>
        <ImageBackground
          source={require('@/assets/images/nutri.jpg')}
          style={styles.backgroundImage}
        >
          {/* Your other components/content here */}
          <View style={styles.content}>
            <Text style={styles.heading}>Hi,...</Text>
            <Text style={styles.normal}>Press Anywhere to Continue</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%', // Set width to cover the entire screen horizontally
    height: '100%', // Set height to cover the entire screen vertically
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 150,
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normal: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
}); 

export default WelcomePage;
