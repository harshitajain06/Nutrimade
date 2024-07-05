import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { db } from '../../config/firebase'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VideosScreen() {
  const [videos, setVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoList = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        querySnapshot.forEach(doc => {
          videoList.push({ id: doc.id, ...doc.data() });
        });
        setVideos(videoList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos: ", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoPress(item.url)}>
      <MaterialCommunityIcons name="video" size={24} color="#007BFF" />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleVideoPress = (url) => {
    setSelectedVideoUrl(url);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Videos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={videos}
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
        <WebView source={{ uri: selectedVideoUrl }} style={styles.webview} />
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
  videoItem: {
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
  videoTitle: {
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
