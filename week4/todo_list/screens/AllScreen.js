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

export default class AllScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            todoBody: '',
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

    onToggleTodo = id => {
        const { todoList } = this.state;
        const todo = todoList.find(todo => todo.id === id);
        todo.status = todo.status === 'Done' ? 'Active' : 'Done';
        const foundIndex = todoList.findIndex(todo => todo.id === id);
        todoList[foundIndex] = todo;
        const newTodoList = [...todoList];
        this.saveData(newTodoList);
        this.setState({ todoList: newTodoList });
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

    onSubmitTodo = () => {
        const { todoList, todoBody } = this.state;
        if (!todoBody) {
            return;
        }
        const newTodo = {
            body: todoBody,
            status: 'Active',
            id: todoList.length + 1
        };
        const newTodoList = [...todoList, newTodo];
        this.saveData(newTodoList);
        this.setState({ todoList: newTodoList, todoBody: '' });
    };

    setTodoBody = (text) => {
        this.setState({ todoBody: text });
    }

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
                                    return (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            idx={idx}
                                            onToggleTodo={this.onToggleTodo}
                                            onDeleteTodo={this.onDeleteTodo}
                                        />
                                    );
                                })
                            }
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={todoBody}
                                    style={styles.todoInput}
                                    onChangeText={text => this.setTodoBody(text)}
                                />
                                <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    };
}

AllScreen.navigationOptions = {
    title: 'All Todos',
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
    todoInput: {
        width: '95%',
        minHeight: 32,
        color: 'white',
        borderWidth: 1,
        marginTop: '10%',
        marginBottom: '5%',
        borderColor: 'grey',
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    },
    button: {
        height: 50,
        width: '50%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    KeyboardAvoidingView: {
        flex: 1,
        width: '100%',
        paddingTop: 24,
    }
});
