import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/src/components/common/themed-text';
import { ThemedView } from '@/src/components/common/themed-view';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>Màn hình Explore sẽ được phát triển sau.</ThemedText>
      <ThemedText>Tạm thời bỏ để tránh xung đột với react-native-reanimated.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
