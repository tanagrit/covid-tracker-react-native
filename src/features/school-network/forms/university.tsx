import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { Button } from '@covid/components/buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import { ISubscribedSchoolGroupStats, ISchoolModel } from '@covid/core/schools/Schools.dto';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

interface IProps {
  currentJoinedGroup: ISubscribedSchoolGroupStats | undefined;
  schools: ISchoolModel[];
}

function UniversityForm({ currentJoinedGroup, schools }: IProps) {
  const initialValues = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ schoolId }, FormikProps) => {
        try {
          const selectedSchool = schools.find((school) => school.id === schoolId)!;
          await schoolNetworkCoordinator.setSelectedSchool(selectedSchool);
          NavigatorService.goBack();
        } catch (error) {
          FormikProps.setFieldError('schoolId', 'Update error');
        }
      }}>
      {(formikProps) => (
        <Form style={styles.formContainer}>
          <DropdownField
            selectedValue={formikProps.values.schoolId}
            onValueChange={formikProps.handleChange('schoolId')}
            label={i18n.t('school-networks.join-school.dropdown.label-higher-education')}
            items={schools.map((item) => ({ label: item.name, value: item.id }))}
            error={formikProps.touched.schoolId && formikProps.errors.schoolId}
          />
          <Button onPress={formikProps.handleSubmit} branded>
            {i18n.t('school-networks.join-school.cta')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
});

export default UniversityForm;
