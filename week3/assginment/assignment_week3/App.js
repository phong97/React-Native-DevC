import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePrompt: 'Fire!',
      userChoice: {},
      computerChoice: {},
      win: 0,
      lose: 0,
      draw: 0,
    }
  }

  onPress = playerChoice => {
    let { win, lose, draw } = this.state;
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    if (result === 'Victory!') {
      win++;
    } else if (result === 'Defeat!') {
      lose++;
    } else {
      draw++;
    }

    this.setState({
      gamePrompt: result,
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
      win,
      lose,
      draw
    })
  }

  getResultColor = () => {
    const { gamePrompt } = this.state;
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  getPercentScore= (value, total) => {
    const percentage = value/total*100;
    return percentage ? percentage.toFixed(0) : 0;
  }

  render() {
    const { userChoice, computerChoice, win, lose, draw } = this.state;
    const total = win + lose + draw;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.score}>
            <Text style={[styles.fontSize24, { color: 'green' }]}>Win: {win}</Text>
            <Text style={styles.fontSize24}>{this.getPercentScore(win, total)}%</Text>
          </View>
          <View style={styles.score}>
            <Text style={[styles.fontSize24, { color: '#250902' }]}>Draw: {draw}</Text>
            <Text style={styles.fontSize24}>{this.getPercentScore(draw, total)}%</Text>
          </View>
          <View style={styles.score}>
            <Text style={[styles.fontSize24, { color: 'red' }]}>Lose: {lose}</Text>
            <Text style={styles.fontSize24}>{this.getPercentScore(lose, total)}%</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={{ fontSize: 32, color: this.getResultColor(), }}>{this.state.gamePrompt}</Text>
          <View style={styles.choicesContainer}>
            <ChoiceCard
              player="Player"
              choice={userChoice}
            />
            <Text style={{ color: '#250902', fontSize: 24, }}>vs</Text>
            <ChoiceCard
              player="Computer"
              choice={computerChoice}
            />
          </View>
          {
            CHOICES.map(choice => {
              return <Button
                key={choice.name}
                name={choice.name}
                onPress={() => this.onPress(choice.name)} />;
            })
          }
        </View>
      </View>
    );
  }
}

const Button = (props) => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
)

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri: uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }

  if (userChoice === computerChoice) result = 'Tie game!';
  return [result, computerChoice];
};

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
    width: '100%',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    backgroundColor: '#f3f6fa',
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
  fontSize24: {
    fontSize: 24,
  },
  body: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingVertical: 40,
    shadowRadius: 5,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ebee',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
