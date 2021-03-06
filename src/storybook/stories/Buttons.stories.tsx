import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { HandlerFunction, action } from '@storybook/addon-actions';

import { ClearButton } from '@covid/components/buttons/ClearButton';
import { BrandedButton } from '@covid/components';

const Handler = (): HandlerFunction => action('on-pressed');

const Story = 'buttons';

storiesOf(Story, module)
  .add('Clear', () => <ClearButton text="Hello" onPress={Handler()} />)
  .add('Branded', () => <BrandedButton onPress={Handler()}>Hello</BrandedButton>);
