import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModulesScreen() {
  const [ppts, setPpts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPptUrl, setSelectedPptUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPpts = async () => {
      const pptList = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'ppts'));
        querySnapshot.forEach(doc => {
          pptList.push({ id: doc.id, ...doc.data() });
        });
        setPpts(pptList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PPTs: ", error);
        setLoading(false);
      }
    };

    fetchPpts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.pptItem} onPress={() => handlePptPress(item.url)}>
      <MaterialCommunityIcons name="file-powerpoint" size={24} color="#007BFF" />
      <Text style={styles.pptTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handlePptPress = (url) => {
    setSelectedPptUrl(url);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modules</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={ppts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide">
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <MaterialCommunityIcons name="close" size={36} color="#007BFF" />
          </TouchableOpacity>
        </View>
        <WebView source={{ uri: selectedPptUrl }} style={styles.webview} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  pptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pptTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  webview: {
    flex: 1,
  },
});
