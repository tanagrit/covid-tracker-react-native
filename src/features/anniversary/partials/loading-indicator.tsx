import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';

function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.activityIcon}>
        <ActivityIndicator size="small" color="#0165B5" />
      </View>
      <Text textClass="pXSmallMedium" textAlign="center" style={{ color: '#0165B5' }}>
        {`Loading your\nTimeline`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  activityIcon: {
    marginBottom: 8,
  },
});

export default LoadingIndicator;
