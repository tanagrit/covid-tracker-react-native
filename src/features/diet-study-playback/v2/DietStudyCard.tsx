import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { Avatar, Spacer, Text, RoundIconButton } from '@covid/components';
import { drSarahBerry, QuoteMarks } from '@assets';
import { TStyleObject } from '@covid/utils/types';

import appCoordinator from '../../AppCoordinator';

interface IProps {
  style?: TStyleObject;
}

function DietStudyCard({ style }: IProps) {
  const getImgSrc = () => {
    // en, es, en-US, sv-SE
    const locale = i18n.currentLocale();
    switch (locale) {
      default:
        return drSarahBerry;
    }
  };

  const handleOnPress = () => {
    appCoordinator.goToDietStudy();
  };

  return (
    <View style={[styles.container, styles.shadow, style]}>
      <View style={[styles.row, { marginBottom: 12 }]}>
        <View style={styles.column}>
          <QuoteMarks />
          <Spacer />
          <Text textClass="h5Regular">{i18n.t('diet-study.results-ready')}</Text>
        </View>
        <View>
          <Avatar imgsrc={getImgSrc()} />
          <Text>{i18n.t('diet-study.doctor-name')}</Text>
          <Text textClass="pSmall" style={{ color: '#888B8C' }}>
            {i18n.t('diet-study.doctor-title')}
          </Text>
          <Text textClass="pSmall" style={{ color: '#888B8C' }}>
            {i18n.t('diet-study.doctor-location')}
          </Text>
        </View>
      </View>
      <View style={[styles.row, { alignItems: 'center' }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.button} onPress={handleOnPress}>
            <Text style={{ color: 'white' }} textClass="label">
              {i18n.t('navigation.insights').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <RoundIconButton
            iconName="arrow_forward_ios"
            onPress={handleOnPress}
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default DietStudyCard;