import React from 'react';
import { View } from 'react-native';

import { SolidColorBar } from '@covid/components';

import { TProgress } from '../types';

interface IProps {
  current: number;
  progress: TProgress;
  total: number;
}

function ProgressBar({ current, progress, total }: IProps) {
  const getProgress = () => {
    switch (progress) {
      case 'NOT_STARTED':
        return '0%';
      case 'COMPLETED':
        return '100%';
      default:
        return '62%';
    }
  };

  const paddingRight = current < total - 1 ? 4 : 0;
  const width = current === 0 || current === total - 1 ? '20%' : '30%';

  return (
    <View style={{ width, paddingRight }}>
      <View>
        <SolidColorBar backgroundColor="#E2E2E2" height={8} />
      </View>
      <View style={{ position: 'absolute', width: getProgress() }}>
        <SolidColorBar backgroundColor="#024364" height={8} />
      </View>
    </View>
  );
}

export default ProgressBar;
