import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Modules" component={ModulesScreen} />
        <Tab.Screen name="Videos" component={VideosScreen} />
        <Tab.Screen name="Certifications" component={CertificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function ModulesScreen() {
  return (
    <View style={styles.container}>
      <Text>Modules Screen</Text>
    </View>
  );
}

function VideosScreen() {
  return (
    <View style={styles.container}>
      <Text>Videos Screen</Text>
    </View>
  );
}

function CertificationsScreen() {
  return (
    <View style={styles.container}>
      <Text>Certifications Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
