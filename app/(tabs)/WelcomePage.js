import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('HomePage')}>
        <ImageBackground
          source={require('@/assets/images/nutri3.jpg')}
          style={styles.backgroundImage}
        >
          {/* Your other components/content here */}
          <View style={styles.content}>
            <Text style={styles.heading}>𝓗𝓲,..</Text>
            <Text style={styles.normal}>𝓖𝓮𝓽 𝓒𝓮𝓻𝓽𝓲𝓯𝓲𝓮𝓭</Text>
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
    width: '130%', // Set width to cover the entire screen horizontally
    height: '100%', // Set height to cover the entire screen vertically

  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 150,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:90,
    color:'black',
    fontStyle:'Bad Script'
  },
  normal: {
    fontSize: 45,
    fontWeight: 'bold',
  },
}); 


