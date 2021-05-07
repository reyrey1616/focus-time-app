import * as React from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import Focus from './src/features/focus/focus';
import Timer from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';
import FocusHistory from './src/features/focus/FocusHistory';

const { useState, useEffect } = React;

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 0,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };


  const clearSubject = () => {
    addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      console.log(history)
      if (history && JSON.parse(history).length) {
          console.log(history)
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          clearSubject={clearSubject}
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: 'rgba(245,245,245, 1)',
    paddingTop: Platform.OS === 'ios' ? spacing.lg : spacing.lg,
    color: '#444',
  },
});
