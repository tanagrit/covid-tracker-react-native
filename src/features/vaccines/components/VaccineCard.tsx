import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import moment from 'moment';
import { Text } from 'native-base';

import { Header3Text, RegularText } from '@covid/components/Text';
import { tick } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { vaccineBrandDisplayName, Dose, VaccineRequest, VaccineBrands } from '@covid/core/vaccine/dto/VaccineRequest';
import QuestionCircle from '@assets/icons/QuestionCircle';

export const displayDescriptionNameMap = {
  mrna: 'mRNA',
  not_sure: i18n.t('vaccines.your-vaccine.name-i-dont-know'),
};

type Props = {
  vaccine: VaccineRequest;
  style?: ViewStyle;
  onPressEdit: (index: number) => void;
};

export const VaccineCard: React.FC<Props> = ({ vaccine, style, onPressEdit }) => {
  const formatDateString = (dateString: string): string => {
    return moment(dateString).format('MMM D YYYY');
  };

  const renderTick = (hasDate: boolean, hasName: boolean) => {
    return hasDate && hasName ? <Image source={tick} style={styles.tick} /> : <></>;
  };

  const formatVaccineDate = (dose: Dose) => {
    return dose.date_taken_specific ? formatDateString(dose.date_taken_specific) : '';
  };

  const warningIconAndText = (textKey: string) => (
    <View style={styles.row}>
      <QuestionCircle colorBg={colors.feedbackBad} colorIcon={colors.white} />
      <RegularText style={{ ...styles.warningText, marginLeft: 4 }}>{i18n.t(textKey)}</RegularText>
    </View>
  );

  const dateRequired = warningIconAndText('vaccines.vaccine-card.date-missing');
  const notYetLogged = warningIconAndText('vaccines.vaccine-card.not-logged');

  const dose1: Partial<Dose> | undefined = vaccine.doses[0];
  const dose2: Partial<Dose> | undefined = vaccine.doses[1];
  const hasFirstDoseDate = !!dose1?.date_taken_specific;
  const hasSecondDoseDate = !!dose2?.date_taken_specific;
  const hasFirstDoseBrand = !!dose1?.brand;
  const hasSecondDoseBrand = !!dose2?.brand;
  const hasFirstDoseDescription = !!dose1?.description;
  const hasSecondDoseDescription = !!dose2?.description;
  const hasFirstDoseName = hasFirstDoseBrand || hasFirstDoseDescription;
  const hasSecondDoseName = hasSecondDoseBrand || hasSecondDoseDescription;

  return (
    <TouchableWithoutFeedback onPress={() => onPressEdit(1)}>
      <View style={styles.container}>
        {/* Dose 1 */}
        <View style={styles.dose}>
          <View style={styles.row}>
            {renderTick(hasFirstDoseDate, hasFirstDoseName)}
            <Header3Text>{i18n.t('vaccines.vaccine-card.dose-1')}</Header3Text>
          </View>
          <RegularText style={[!hasFirstDoseName && styles.pendingText]}>
            {hasFirstDoseName
              ? hasFirstDoseBrand
                ? vaccineBrandDisplayName[dose1.brand]
                : displayDescriptionNameMap[dose1.description]
              : warningIconAndText('vaccines.vaccine-card.name-missing')}
          </RegularText>

          {!hasFirstDoseDate && dateRequired}

          {hasFirstDoseDate && (
            <View style={{ marginTop: 8, marginBottom: 0 }}>
              <RegularText style={[!hasFirstDoseDate && styles.pendingText]}>
                {hasFirstDoseDate ? formatVaccineDate(dose1 as Dose) : null}
              </RegularText>
            </View>
          )}
        </View>

        {/* Dose 2 */}
        {dose1.brand && dose1.brand === VaccineBrands.JOHNSON ? (
          <></>
        ) : (
          <View style={styles.dose}>
            <View style={styles.row}>
              {renderTick(hasSecondDoseDate, hasSecondDoseName)}
              <Header3Text>{i18n.t('vaccines.vaccine-card.dose-2')}</Header3Text>
            </View>

            {hasSecondDoseDate && (
              <View style={{ marginTop: 0, marginBottom: 8 }}>
                <RegularText style={[!hasSecondDoseName && styles.pendingText]}>
                  {hasSecondDoseName
                    ? hasSecondDoseBrand
                      ? vaccineBrandDisplayName[dose2.brand]
                      : displayDescriptionNameMap[dose2.description]
                    : warningIconAndText('vaccines.vaccine-card.name-missing')}
                </RegularText>
              </View>
            )}

            <RegularText style={[!hasSecondDoseDate && styles.pendingText]}>
              {hasSecondDoseDate ? formatVaccineDate(dose2 as Dose) : notYetLogged}
            </RegularText>
          </View>
        )}

        {/* CTA */}
        <Text style={{ marginTop: 8, marginBottom: 8, textAlign: 'center' }}>
          <Text style={styles.clickableText}>{i18n.t('vaccines.vaccine-card.edit-vaccine')}</Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  row: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dose: {
    marginBottom: 16,
  },
  tick: {
    marginEnd: 8,
    height: 16,
    width: 16,
  },
  pendingIconAndText: {
    marginVertical: 0,
    marginLeft: 1,
  },
  pendingText: {
    color: colors.secondary,
  },
  warningText: {
    color: colors.feedbackBad,
  },
  clickableText: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: colors.purple,
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: colors.tertiary,
    margin: 16,
  },
});
