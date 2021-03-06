import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { gbMap, svMap, usMap } from '@assets';
import { ClickableText, RegularText } from '@covid/components/Text';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import { cleanIntegerVal } from '@covid/utils/number';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { IContentService } from '@covid/core/content/ContentService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { colors } from '@theme';
import { BrandedButton } from '@covid/components';

import { ContributionCounter } from './components/ContributionCounter';
import { getLocaleFlagIcon } from './helpers';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
};

const Welcome1Screen: React.FC<PropsType> = ({ navigation }) => {
  const [userCount, setUserCount] = useState<number>(0);

  const contentService = useInjection<IContentService>(Services.Content);

  useEffect(() => {
    contentService.getUserCount().then((response) => {
      if (response) {
        const userCount = cleanIntegerVal(response);
        setUserCount(userCount);
      }
    });
  }, [contentService.getUserCount, cleanIntegerVal, setUserCount]);

  const getMapImage = useCallback(() => {
    if (isGBCountry()) {
      return gbMap;
    }
    if (isSECountry()) {
      return svMap;
    }
    return usMap;
  }, [isGBCountry, isSECountry, gbMap, svMap, usMap]);

  const getFlagIcon = useCallback(getLocaleFlagIcon, [getLocaleFlagIcon]);

  const onLoginPress = useCallback(() => navigation.navigate('Login'), [navigation.navigate]);

  const onSelectCountryPress = useCallback(() => navigation.navigate('CountrySelect'), [navigation.navigate]);

  const onNextButtonPress = useCallback(() => navigation.navigate('Welcome2'), [navigation.navigate]);

  return (
    <View style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image testID="map" style={styles.mapImage} source={getMapImage()} />
        <View style={styles.loginContainer}>
          <ClickableText testID="login" style={styles.login} onPress={onLoginPress}>
            {i18n.t('welcome.sign-in')}
          </ClickableText>
          <View style={styles.pipe} />
          <TouchableOpacity testID="selectCountry" style={styles.countryFlag} onPress={onSelectCountryPress}>
            <Image testID="flag" style={styles.flagIcon} source={getFlagIcon()} />
          </TouchableOpacity>
        </View>

        <View style={styles.rootContainer}>
          <View style={styles.covidContainer}>
            <RegularText style={styles.subtitle}>{i18n.t('welcome.take-a-minute')}</RegularText>
          </View>
        </View>
        <View style={styles.contributors}>
          <ContributionCounter testID="counter" variant={1} count={userCount} />
        </View>

        <View style={styles.nextButtonContainer}>
          <BrandedButton testID="more" style={styles.nextButton} onPress={onNextButtonPress}>
            {i18n.t('welcome.tell-me-more')}
          </BrandedButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
    backgroundColor: colors.brand,
  },
  scrollView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    marginTop: 32,
    flex: 1,
    backgroundColor: colors.brand,
  },
  nextButtonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: colors.purple,
    fontSize: 16,
  },
  covidContainer: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  mapImage: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 48,
    paddingVertical: 24,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontFamily: 'SofiaPro-Light',
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  contributors: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 32,
    top: 60,
  },
  countryFlag: {},
  login: {
    color: colors.white,
  },
  pipe: {
    backgroundColor: colors.white,
    height: 32,
    marginHorizontal: 16,
    width: 1,
  },
});

export default Welcome1Screen;
