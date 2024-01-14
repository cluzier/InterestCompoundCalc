import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('');
  const [annualAddition, setAnnualAddition] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const formatNumber = (
    value: string | number,
    decimalPlaces: number = 2,
  ): string => {
    const stringValue =
      typeof value === 'number' ? value.toFixed(decimalPlaces) : value;
    const parts = stringValue.split('.');
    parts[0] = parts[0]
      .replace(/[^0-9]/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length === 2 ? `${parts[0]}.${parts[1]}` : parts[0];
  };

  const calculateInterest = () => {
    // Set default values to '0' if the user didn't enter a number
    const principalAmount = parseFloat(principal.replace(/,/g, '')) || 0;
    const annualAdditionAmount =
      parseFloat(annualAddition.replace(/,/g, '')) || 0;
    const ratePercent = parseFloat(rate) / 100 || 0;
    const years = parseFloat(time) || 0;

    // Compound interest formula with annual addition
    const compoundInterest =
      principalAmount * Math.pow(1 + ratePercent, years) +
      annualAdditionAmount *
        ((Math.pow(1 + ratePercent, years) - 1) / ratePercent);

    setResult(compoundInterest);
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Compound Interest Calculator</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Principal amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formatNumber(principal)}
            onChangeText={text => setPrincipal(formatNumber(text))}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Annual Addition</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formatNumber(annualAddition)}
            onChangeText={text => setAnnualAddition(formatNumber(text))}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Years to grow</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formatNumber(time)}
            onChangeText={text => setTime(formatNumber(text))}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Annual interest rate (%)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={rate}
            onChangeText={text => setRate(text)}
          />
        </View>
        <Button title="Calculate" onPress={calculateInterest} />
        {result !== null && (
          <Text style={styles.resultText}>
            Future Value: ${formatNumber(result)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 75,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompoundInterestCalculator;
