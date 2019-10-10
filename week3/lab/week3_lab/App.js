import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCurrencyValue: 0,
      convertedCurrencyValue: 0,
      fromCurrency: 'vnd',
      toCurrency: 'usd',
    }
  }

  handleChangeInput = text => {
    text = text === '' ? 0 : text;
    const convertedCurrencyValue = convertCurrency(text, this.state.fromCurrency);
    this.setState({ currentCurrencyValue: text, convertedCurrencyValue });
  }

  setConversionCurrencies = (from, to) => {
    const convertedCurrencyValue = convertCurrency(this.state.currentCurrencyValue, from);
    this.setState({ fromCurrency: from, toCurrency: to, convertedCurrencyValue });
  }

  render() {
    const { currentCurrencyValue, convertedCurrencyValue, fromCurrency, toCurrency } = this.state;

    return (
      <View style={styles.container}>
        <Text>Please enter the value of currency you want to convert  </Text>
        <TextInput
          onChangeText={this.handleChangeInput}
          keyboardType='number-pad'
          autoFocus={true}
          textAlign='center'
          placeholder='100,000,000'
          selectionColor='red'
          style={{
            height: 60,
            padding: 5,
            width: 300,
            fontSize: 35,
            borderWidth: 1,
            borderColor: 'lightblue'
          }}
        />
        <ConversionTypeButton
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
          to="usd"
          from="vnd"
          setConversionCurrencies={this.setConversionCurrencies} />
        <ConversionTypeButton
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
          to="vnd"
          from="usd"
          setConversionCurrencies={this.setConversionCurrencies} />
        <View>
          <Text>Current currency:</Text>
        </View>
        <View>
          <FormattedCurrency
            type={fromCurrency}
            value={currentCurrencyValue}
          />
        </View>
        <View>
          <Text>Conversion currenecy:</Text>
        </View>
        <View>
          <FormattedCurrency
            type={toCurrency}
            value={convertedCurrencyValue}
          />
        </View>
      </View>
    );
  }
}

const ConversionTypeButton = ({
  fromCurrency,
  toCurrency,
  from,
  to,
  setConversionCurrencies
}) => {
  const backgroundColor =
    fromCurrency === from && toCurrency === to ? 'lightblue' : null;
  const buttonStyle = { backgroundColor: backgroundColor };

  const fromFlag = from === 'usd' ? '🇺🇸' : '🇻🇳';
  const toFlag = to === 'usd' ? '🇺🇸' : '🇻🇳';

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => setConversionCurrencies(from, to)}
    >
      <Text style={styles.buttonText}>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};

const convertCurrency = (currentCurrencyValue, fromCurrency) => {
  let value;
  if (fromCurrency === 'vnd') {
    value = currentCurrencyValue / 23000;
  } else {
    value = 23000 * currentCurrencyValue;
  }
  return value === 0 ? 0:value.toFixed(5);
};

const FormattedCurrency = props => {
  const format = props.type === 'usd' ? '$' : 'đ';
  const flag = props.type === 'usd' ? '🇺🇸' : '🇻🇳';

  return (
     <NumberFormat
      value={props.value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={format}
      renderText={value => <Text style={styles.currencyText}>{value} {flag}</Text>} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center'
  },
  currencyText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold'
  }
});
