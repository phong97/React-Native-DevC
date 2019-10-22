import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import MessageCard from "../components/MessageCard";
import messages from "../utils/messages";

export default function MessagesScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {
          messages.map(msg => {
            return (
              <View
                key={msg.id}
                style={{ padding: 5 }}
              >
                <MessageCard
                  onGoToConversation={props.navigation.navigate}
                  msg={msg}
                />
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );
}

MessagesScreen.navigationOptions = props => {
  return {
    title: "Messages",
    headerLeft: () => {
      return (
        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Image
            style={{ height: 30, width: 30, marginLeft: 20 }}
            source={{
              uri:
                "https://cdn3.iconfinder.com/data/icons/ui-ux-essentials-solid/24/hamburger-menu-solid-512.png"
            }}
          />
        </TouchableOpacity>
      );
    }
  };
};

;
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#fff"
  },
  contentContainer: {
    alignItems: "center", justifyContent: "center"
  },
  messageCardStyle: {
    margin: 5, padding: 5, width: "100%", shadowRadius: 5, shadowOpacity: 0.9, flexDirection: "row", alignItems: "center", backgroundColor: "white", justifyContent: "space-around", shadowColor: "rgba(0,0,0,0.2)", shadowOffset: {
      height: 5, width: 5
    }
  },
  image: {
    width: 75, height: 75, borderWidth: 1, borderRadius: 37, borderColor: "grey"
  },
  cardTextContainer: {
    flex: 1, marginLeft: 10
  },
  cardText: {
    flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between"
  }
})
