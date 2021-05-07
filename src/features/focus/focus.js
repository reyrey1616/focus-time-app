import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import RoundedButton from '../../components/RoundedButton';

import { fontSizes, paddingSizes, spacing } from '../../utils/sizes';

const { useState } = React;
const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: fontSizes.md,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: '#444',
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
