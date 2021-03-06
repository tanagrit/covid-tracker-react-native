import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { facebook } from '@assets';
import { colors } from '@theme';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { openWebLink } from '@covid/utils/links';
import { BrandedButton } from '@covid/components';

export const FacebookSECard: React.FC = () => {
  const onButtonPress = () => {
    Analytics.track(events.CLICK_CALLOUT, {
      calloutID: 'facebookSE',
    });
    openWebLink('https://www.facebook.com/covidsymptomstudysverige');
  };

  return (
    <View style={styles.container}>
      <View style={styles.socialIconContainer}>
        <Image source={facebook} style={styles.socialIcon} />
      </View>
      <RegularBoldText style={styles.primaryText}>Följ oss på Facebook!</RegularBoldText>
      <RegularText style={styles.secondaryText}>
        På Facebook hittar du alltid det senaste om COVID Symptom Study, bland annat länkar, artiklar och information om
        uppdateringar.
      </RegularText>
      <BrandedButton onPress={onButtonPress} style={styles.shareButton}>
        Följ oss på Facebook
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  primaryText: {
    paddingHorizontal: 30,
    fontSize: 20,
    textAlign: 'center',
  },
  secondaryText: {
    paddingVertical: 10,
    marginHorizontal: 32,
    textAlign: 'center',
    color: colors.secondary,
  },
  shareButton: {
    backgroundColor: colors.facebook,
    height: 42,
    marginVertical: 20,
    marginHorizontal: 72,
  },
  shareLink: {
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  socialIconContainer: {
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
  },
  socialIcon: {
    maxWidth: 48,
    maxHeight: 48,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
});
