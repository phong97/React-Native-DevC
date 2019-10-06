import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

const POLO_BLUE_COLOR = 'rgb(51,60,87)';
const FOLLOW_COLOR = 'rgb(71,113,246)';
const SEND_MESSAGE_COLOR = 'rgb(120,213,250)';

const imgData = [
  {
    id: 1,
    image: require('./assets/image1.jpg'),
  },
  {
    id: 2,
    image: require('./assets/image2.jpg'),
  },
  {
    id: 3,
    image: require('./assets/image3.jpg'),
  },
  {
    id: 4,
    image: require('./assets/image4.jpg'),
  },
  {
    id: 5,
    image: require('./assets/image5.jpg'),
  },
  {
    id: 6,
    image: require('./assets/image6.jpg'),
  },
  {
    id: 7,
    image: require('./assets/image7.jpg'),
  },
  {
    id: 8,
    image: require('./assets/image8.jpg'),
  },
];

export default function App() {
  const centerImgData = Math.floor(imgData.length / 2);

  return (
    <View style={styles.container}>
      <View style={styles.btnHeader}>
        <TouchableOpacity>
          <Ionicons
            name='md-arrow-back'
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name='appstore1'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.imageAvatarWrapper}>
          <Image
            source={require('./assets/avatar.jpg')}
            style={styles.ImageAvatar}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.textName}>Floyd Hayes</Text>
          <Text style={styles.textJob}>Photographer</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => alert("send message button")}
            >
              <View style={[styles.btn, styles.followButton]}>
                <Text style={styles.btnLabel}>Follow</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("send message button")}
            >
              <View style={[styles.btn, styles.sendButton]}>
                <Feather
                  name='send'
                  color='white'
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.countLike}>
        <View style={styles.countGroup}>
          <Text style={styles.countText}>210</Text>
          <Text style={styles.countLabelText}>Photos</Text>
        </View>
        <View style={styles.countGroup}>
          <Text style={styles.countText}>150K</Text>
          <Text style={styles.countLabelText}>Followers</Text></View>
        <View style={styles.countGroup}>
          <Text style={styles.countText}>605</Text>
          <Text style={styles.countLabelText}>Following</Text></View>
      </View>

      <View style={styles.imageArea}>
        <ScrollView contentContainerStyle={styles.imageGroup}>
          <View>
            {
              imgData.slice(0, centerImgData).map(item => {
                return <Image
                  style={styles.image}
                  source={item.image}
                  key={item.id}
                />
              })
            }
          </View>
          <View>
            {
              imgData.slice(centerImgData).map(item => {
                return <Image
                  style={styles.image}
                  source={item.image}
                  key={item.id}
                />
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  btnHeader: {
    flex: 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flex: 0.28,
    flexDirection: 'row',
  },
  countLike: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageArea: {
    flex: 0.6,
  },
  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ImageAvatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
  },
  userInfo: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  textJob: {
    fontSize: 16,
    fontWeight: '200',
    marginTop: 4,
    color: "#bec1d0",
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 24,
  },
  btn: {
    height: 36,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  followButton: {
    backgroundColor: FOLLOW_COLOR,
    width: 140,
  },
  sendButton: {
    backgroundColor: SEND_MESSAGE_COLOR,
    width: 52,
    marginLeft: 8,
  },
  imageAvatarWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    color: 'white',
  },
  countText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countLabelText: {
    fontSize: 16,
    fontWeight: '200',
    color: "#bec1d0",
  },
  countGroup: {
    alignItems: 'center',
  },
  image: {
    height: 160,
    width: 160,
    margin: 12,
    borderRadius: 20,
  },
  icon: {
    fontSize: 24,
    paddingHorizontal: 20,
    paddingVertical:8,
  }
});
