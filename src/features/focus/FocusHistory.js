import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import RoundedButton from '../../components/RoundedButton';

const historyItem = ({ item, index }) => {
  return <Text key = {index} style={styles.historyItem(item.status)}> {item.subject}</Text>;
};

const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };


  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> Thisngs we've focused on </Text>

            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={historyItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 0 ? 'green' : 'red',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'black',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});

export default FocusHistory;
