import React from "react";
import { Image, Text, ScrollView, StyleSheet } from "react-native";

export default function ConversationScreen(props) {
  const propsFromMessages = props.navigation.state.params;
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image
        source={{uri: props.navigation.state.params.avatar_url}}
        style={{
          width: 200,
          height: 200
        }}
      />
      <Text>{props.navigation.state.params.name}</Text>
      <Text>{props.navigation.state.params.last_message_content}</Text>
    </ScrollView>
  );
}

ConversationScreen.navigationOptions = {
  title: "Conversation"
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  }
});
