import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Linking } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      pageNumber: 1,
      hasErrored: false,
      lastPageReached: false,
    };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    const { pageNumber, articles, lastPageReached } = this.state;
    if (lastPageReached) return;
    this.setState({ loading: true });
    try {
      let result = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-09-27&sortBy=publishedAt&apiKey=3bb3b5f1609e46f09ed0b00f25f6e2d1&page=${pageNumber}`);
      let data = await result.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(data.articles)
        );
        this.setState({ articles: newArticleList, pageNumber: pageNumber + 1 });
      } else {
        this.setState({ lastPageReached: true });
      }
    } catch (error) {
      this.setState({ hasErrored: true });
    }
    this.setState({ loading: false });
  }

  onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  render() {
    const { loading, articles, hasErrored } = this.state;
    if (hasErrored) {
      return (
        <View style={styles.container}>
          <Text>Error =(</Text>
        </View>
      );
    }

    const renderArticleItem = ({ item }) => {
      return (
        <Card
          title={item.title}
          image={{ uri: item.urlToImage }}
        >
          <View style={styles.row}>
            <Text style={styles.label}>Source</Text>
            <Text style={styles.info}>{item.source.name}</Text>
          </View>
          <Text style={{ marginBottom: 10 }}>{item.content}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Published</Text>
            <Text style={styles.info}>
              {moment(item.publishedAt).format('LLL')}
            </Text>
          </View>
          <Button
            icon={<Icon />} title="Read more"
            backgroundColor="#03A9F4"
            onPress={() => this.onPress(item.url)}
          />
        </Card>
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{articles.length}</Text>
        </View>
        <FlatList
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={item => item.url}
          onEndReached={this.getNews}
          onEndReachedThreshold={1}
          ListFooterComponent={
            lastPageReached ? <Text>No more articles</Text> : <ActivityIndicator
              size="large"
              loading={loading}
            />
          }
        />
      </View>
    );
  }
}

const filterForUniqueArticles = arr => {
  const cleaned = [];
  arr.forEach(itm => {
    let unique = true;
    cleaned.forEach(itm2 => {
      const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
      if (isEqual) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
};

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});
