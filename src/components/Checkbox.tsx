import { Item, View } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@theme/colors';
import Check from '@assets/icons/Check';

import { RegularText } from './Text';
import { ITest } from './types';

const checkboxStyles = StyleSheet.create({
  checkboxList: {
    width: '100%',
  },

  checkboxRow: {
    paddingVertical: 6,
    borderColor: 'transparent',
  },

  checkboxLabel: {
    marginLeft: 16,
    marginRight: 32,
  },

  checkBoxText: {
    borderColor: 'transparent',
  },

  checkBox: {
    borderRadius: 8,
    backgroundColor: colors.backgroundTertiary,
    borderColor: 'transparent',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

interface ICheckboxProps extends ITest {
  value: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}

interface ICheckboxListProps {
  children: React.ReactNode;
}

export function CheckboxItem(props: ICheckboxProps) {
  return (
    <Item style={checkboxStyles.checkboxRow}>
      <TouchableOpacity style={checkboxStyles.checkBox} onPress={() => props.onChange(!props.value)}>
        {props.value && <Check />}
      </TouchableOpacity>
      <Item style={checkboxStyles.checkBoxText} onPress={() => props.onChange(!props.value)}>
        <RegularText style={{ ...checkboxStyles.checkboxLabel }}>{props.children}</RegularText>
      </Item>
    </Item>
  );
}

export function CheckboxList({ children }: ICheckboxListProps) {
  return <View style={checkboxStyles.checkboxList}>{children}</View>;
}
