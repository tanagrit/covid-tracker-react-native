import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { BackButton, BasicNavHeader, SafeLayout, Spacer, SpeechCard, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { dietStudyPlaybackGutDiagram } from '@assets';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';

import dietStudyPlaybackCoordinator from '../DietStudyPlaybackCoordinator';
import { GutScore } from '../components';

function DietStudyGut() {
  const { dietScore } = dietStudyPlaybackCoordinator;
  const beforeScore = dietScore ? dietScore?.pre_gut_friendly_score : 0;
  const duringScore = dietScore ? dietScore.post_gut_friendly_score : 0;

  return (
    <SafeLayout withGutter={false} style={{ backgroundColor: '#FFF' }}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={16} textClass="h2">
            {i18n.t('diet-study.gut-title')}
          </Text>
          <GutScore beforeScore={beforeScore} duringScore={duringScore} />
          <Spacer space={24} />
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-body-0')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-body-1')}
          </Text>
          <Image style={styles.diagram} source={dietStudyPlaybackGutDiagram} />
          <Text rhythm={16} textClass="h4">
            {i18n.t('diet-study.gut-microbiome-title')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-microbiome-body-0')}
          </Text>
          <Text textClass="pLight" rhythm={48}>
            {i18n.t('diet-study.gut-microbiome-body-1')}
          </Text>
          <Text rhythm={16} textClass="h4">
            {i18n.t('diet-study.gut-score-title')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-score-body-0')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-score-body-1')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-score-body-2')}
          </Text>
          {getDietStudyDoctorImage()}
        </View>
        <SpeechCard>
          <Text rhythm={16} textClass="h4">
            {i18n.t('diet-study.gut-tips-title')}
          </Text>
          <Text rhythm={16} textClass="pLight">
            {i18n.t('diet-study.gut-tips-body-0')}
          </Text>
          <Text rhythm={16} textClass="pLight">
            {i18n.t('diet-study.gut-tips-body-1')}
          </Text>
          <Text rhythm={16} textClass="pLight">
            {i18n.t('diet-study.gut-tips-body-2')}
          </Text>
        </SpeechCard>
        <BackButton style={{ marginVertical: 16 }} />
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  diagram: {
    width: '100%',
    aspectRatio: 1200 / 1270,
    height: undefined,
    resizeMode: 'contain',
    marginBottom: 48,
  },
});

export default DietStudyGut;
