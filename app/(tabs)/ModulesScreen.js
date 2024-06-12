import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../../config/firebase'; // Import db from your firebaseConfig.js file
import { collection, getDocs } from 'firebase/firestore';

export default function ModulesScreen() {
  const [ppts, setPpts] = useState([]);

  useEffect(() => {
    const fetchPpts = async () => {
      const pptList = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'ppts'));
        querySnapshot.forEach(doc => {
          pptList.push({ id: doc.id, ...doc.data() });
        });
        setPpts(pptList);
      } catch (error) {
        console.error("Error fetching PPTs: ", error);
      }
    };

    fetchPpts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.pptItem}>
      <Text style={styles.pptTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ppts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pptItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  pptTitle: {
    fontSize: 18,
  },
});
