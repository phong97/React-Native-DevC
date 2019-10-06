import React from 'react';
import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

const feedData = [
  {
    id: 1,
    name: 'Jennifer',
    image: require('./assets/image1.jpg'),
    likeCount: 128,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 2,
    name: 'Jennifer',
    image: require('./assets/image2.jpg'),
    likeCount: 58,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 3,
    name: 'Jennifer',
    image: require('./assets/image3.jpg'),
    likeCount: 200,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 4,
    name: 'Jennifer',
    image: require('./assets/image4.jpg'),
    likeCount: 400,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 5,
    name: 'Jennifer',
    image: require('./assets/image5.jpg'),
    likeCount: 258,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 6,
    name: 'Jennifer',
    image: require('./assets/image6.jpg'),
    likeCount: 97,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 7,
    name: 'Jennifer',
    image: require('./assets/image7.jpg'),
    likeCount: 32,
    avatar: require('./assets/avatar.jpg')
  },
  {
    id: 8,
    name: 'Jennifer',
    image: require('./assets/image8.jpg'),
    likeCount: 164,
    avatar: require('./assets/avatar.jpg')
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      {/* header  */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
          }}
          style={styles.instagramImage}
          resizeMode="contain"
        />
        <Feather name="inbox" size={27} color="black" />
      </View>

      {/* poster  */}

      <ScrollView>
        {
          feedData.map(feed => {
            return (
              <View style={styles.poster} key={feed.id}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={feed.avatar}
                    style={styles.avatarImage}
                    resizeMode='cover'
                  />
                  <Text style={styles.posterName}>{feed.name}</Text>
                </View>

                <View style={styles.imageWrapper}>
                  <Image
                    source={feed.image}
                    style={styles.imagePoster}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.posterIconWrapper}>
                  <Feather
                    name='heart'
                    style={styles.posterIcon}
                    onPress={() => alert("Liked")}
                  />
                  <Feather
                    name='message-square'
                    style={styles.posterIcon}
                  />
                  <Feather
                    name='share'
                    style={styles.posterIcon}
                  />
                </View>

                {/* rule */}
                <View style={styles.rule} />
                <View style={styles.numberHeart}>
                  <AntDesign
                    name='heart'
                    style={styles.posterIcon}
                  />
                  <Text>
                    {feed.likeCount} likes
                  </Text>
                </View>
                {/* rule */}
                <View style={styles.rule} />
              </View>
            );
          })
        }
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f3f6fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  instagramImage: {
    flex: 1,
    width: null,
    height: 44
  },
  poster: {
    marginTop: 4,
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    marginHorizontal: 12,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 30,
  },
  posterName: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '500'
  },
  imageWrapper: {
    height: 300,
  },
  imagePoster: {
    flex: 1,
    width: null,
    height: null,
  },
  posterIconWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  posterIcon: {
    fontSize: 27,
    color: 'black',
    paddingLeft: 12,
    paddingRight: 4,
  },
  rule: {
    borderBottomWidth: 1,
    marginVertical: 12,
    borderColor: '#efefef',
  },
  numberHeart: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
