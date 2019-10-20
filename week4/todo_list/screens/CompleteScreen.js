import React from 'react';
import { AsyncStorage } from 'react-native';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from "react-navigation";

const onLongPress = (todo, onDeleteTodo) => {
  const prompt = `"${todo.body}"`;
  Alert.alert(
    'Delete your todo?',
    prompt,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => onDeleteTodo(todo.id) }
    ],
    { cancelable: true }
  );
};

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo, props.onDeleteTodo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};

export default class CompleteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    }
  }

  readData = async () => {
    let todoList = await AsyncStorage.getItem('todoList');
    todoList = todoList ? JSON.parse(todoList) : [];
    this.setState({ todoList });
  }

  componentDidMount() {
    this.readData();
  }

  saveData = async (todoList) => {
    await AsyncStorage.setItem('todoList', JSON.stringify(todoList));
  }

  onToggleTodo = () => {
    const { todo } = this.state;
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 1000);
  };

  onDeleteTodo = id => {
    const { todoList } = this.state;
    const newTodoList = todoList.filter(todo => todo.id !== id);
    this.saveData(newTodoList);
    this.setState({ todoList: newTodoList });
  };


  render() {
    const { todoList, todoBody } = this.state;

    return (
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={styles.container}
      >
        <NavigationEvents
          onWillFocus={() => {
            this.readData();
          }}
        />
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.KeyboardAvoidingView}
        >
          <ScrollView>
            <View>
              {
                todoList.map((todo, idx) => {
                  if (todo.status === 'Done') {
                    return (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        idx={idx}
                        onToggleTodo={this.onToggleTodo}
                        onDeleteTodo={this.onDeleteTodo}
                      />
                    );
                  }
                })
              }
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  };
}

CompleteScreen.navigationOptions = {
  title: 'Complete Todos',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  KeyboardAvoidingView: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
  }
});
