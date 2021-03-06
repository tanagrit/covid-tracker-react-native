import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { GenericTextField } from '@covid/components/GenericTextField';
import { BrandedButton } from '@covid/components';
import { ScreenParamList } from '@covid/features';

const initialFormValues = {
  name: '',
};

interface FormData {
  name: string;
}

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CreateProfile'>;
  route: RouteProp<ScreenParamList, 'CreateProfile'>;
};

export default class CreateProfileScreen extends Component<RenderProps> {
  constructor(props: RenderProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  registerSchema = Yup.object().shape({
    name: Yup.string().required().max(32, i18n.t('profile-name-too-long')),
  });

  handleClick(formData: FormData) {
    this.props.navigation.navigate('AdultOrChild', {
      profileName: formData.name,
      avatarName: this.props.route.params.avatarName,
    });
  }

  render() {
    return (
      <Screen showBackButton navigation={this.props.navigation}>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('create-profile-title')}</HeaderText>
          <SecondaryText>{i18n.t('create-profile-text')}</SecondaryText>
        </Header>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: FormData) => {
            return this.handleClick(values);
          }}>
          {(props) => {
            return (
              <Form>
                <View style={{ marginHorizontal: 16 }}>
                  <GenericTextField
                    formikProps={props}
                    name="name"
                    placeholder={i18n.t('create-profile-placeholder')}
                  />
                </View>

                <BrandedButton onPress={props.handleSubmit}>{i18n.t('create-profile-button')}</BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
