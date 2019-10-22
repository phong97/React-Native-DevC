import React from 'react';
import { Platform, View, Text } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessagesScreen from '../screens/MessagesScreen';
import ContactsScreen from '../screens/ContactsScreen';
import GroupsScreen from '../screens/GroupsScreen';
import MoreScreen from '../screens/MoreScreen';
import TimelineScreen from '../screens/TimelineScreen';
import ConversationScreen from "../screens/ConversationScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MessagesStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    Conversation: ConversationScreen
  },
  config
);

MessagesStack.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-chatbubbles'}
    />
  )
};

MessagesStack.path = '';

const ContactsStack = createStackNavigator(
  {
    Contacts: ContactsScreen
  },
  config
);

ContactsStack.navigationOptions = {
  tabBarLabel: "Contacts",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contacts" : "md-link"}
    />
  )
};

ContactsStack.path = "";

const GroupsStack = createStackNavigator(
  {
    Groups: GroupsScreen
  },
  config
);

GroupsStack.navigationOptions = {
  tabBarLabel: "Groups",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-people" : "md-options"}
    />
  )
};

GroupsStack.path = "";

const TimelineStack = createStackNavigator(
  {
    Timeline: TimelineScreen
  },
  config
);

TimelineStack.navigationOptions = {
  tabBarLabel: "Timeline",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-paper"
    />
  )
};

TimelineStack.path = "";

const MoreStack = createStackNavigator(
  {
    More: MoreScreen
  },
  config
);

MoreStack.navigationOptions = {
  tabBarLabel: "More",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-options"
    />
  )
};

MoreStack.path = "";

const tabNavigator = createBottomTabNavigator({
  MessagesStack,
  ContactsStack,
  GroupsStack,
  TimelineStack,
  MoreStack,
});

tabNavigator.path = '';

const drawer = createDrawerNavigator(
  {
    Initial: tabNavigator
  },
  {
    contentComponent: MoreScreen
  }
);

export default drawer;
