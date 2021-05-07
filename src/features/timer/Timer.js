import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Platform,
} from 'react-native';
import { fontSizes, paddingSizes, spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import Timing from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const { useState, useEffect } = React;
const DEFAULT_TIME = 0.1;

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate('10s');
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setIsStarted(false);
    setProgress(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={{ padding: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View>
        <ProgressBar
          style={{ color: '#5E84E2', height: 10 }}
          progress={progress}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            size={100}
            onPress={() => {
              setIsStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            title="start"
            size={100}
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => {
            clearSubject();
          }}
        />
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#444',
    textAlign: 'center',
  },
  task: {
    color: '#444',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
