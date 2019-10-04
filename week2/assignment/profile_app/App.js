import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('./assets/avatar.png')}
            style={styles.ImageAvatar}
          />
        </View>
        <View style={styles.userInfo}>
          <Text>Trung QN</Text>
          <Text>Software Developer</Text>
          <View style={styles.buttonWrapper}>
            <Text style={styles.followButton}></Text>
            <View style={styles.sendButton}></View>
          </View>
        </View>
      </View>
      <View style={styles.countLike}></View>
      <View style={styles.imageArea}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 0.35,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  countLike: {
    flex: 0.15,
    backgroundColor: 'yellow',
  },
  imageArea: {
    flex: 0.5,
    backgroundColor: 'blue',
  },
  ImageAvatar: {
    width: 120,
    height: 120,
  },
  userInfo: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  followButton: {
    backgroundColor: 'blue',
    width: 120,
    height: 50,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: 'yellow',
    width: 50,
    height: 50,
  },
  imageWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
