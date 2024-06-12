import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModulesScreen from './ModulesScreen';
import VideosScreen from './VideosScreen';
import CertificationsScreen from './CertificationsScreen';

const Tab = createBottomTabNavigator();

function CustomTabLabel({ label }) {
  return (
    <View style={styles.tabLabelContainer}>
      <Text style={styles.tabLabelText}>{label}</Text>
    </View>
  );
}

export default function HomePage() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Modules') {
              iconName = focused ? 'view-list' : 'view-list-outline';
            } else if (route.name === 'Videos') {
              iconName = focused ? 'video' : 'video-outline';
            } else if (route.name === 'Certifications') {
              iconName = focused ? 'certificate' : 'certificate-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: ({ focused }) => {
            let label;
            if (route.name === 'Modules') {
              label = 'Modules';
            } else if (route.name === 'Videos') {
              label = 'Videos';
            } else if (route.name === 'Certifications') {
              label = 'Certifications';
            }
            return <CustomTabLabel label={label} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Modules" component={ModulesScreen} />
        <Tab.Screen name="Videos" component={VideosScreen} />
        <Tab.Screen name="Certifications" component={CertificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabelText: {
    textAlign: 'center',
  },
});
