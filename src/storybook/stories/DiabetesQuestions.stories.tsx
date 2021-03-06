import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { FormikProps, Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'native-base';
import { Text } from 'react-native';

import { IDiabetesData, DiabetesQuestions } from '@covid/features/patient/fields/DiabetesQuestions';
import i18n from '@covid/locale/i18n';
import { BrandedButton } from '@covid/components';

storiesOf('DiabetesQuestions', module).add('default view', () => {
  return (
    <ScrollView>
      <Formik
        initialValues={{
          ...DiabetesQuestions.initialFormValues(),
        }}
        validationSchema={DiabetesQuestions.schema()}
        onSubmit={(values: any) => {
          console.log(values);
        }}>
        {(props) => (
          <View style={{ marginHorizontal: 16 }}>
            <DiabetesQuestions formikProps={props as FormikProps<IDiabetesData>} />
            <BrandedButton onPress={props.handleSubmit}>
              <Text>{i18n.t('update-profile')}</Text>
            </BrandedButton>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
});
