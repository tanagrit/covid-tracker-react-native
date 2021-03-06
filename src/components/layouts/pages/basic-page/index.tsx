import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { BasicPageFooter } from '../../footers';
import { BasicNavHeader } from '../../headers';
import SafeLayout from '../../safe-layout';

interface IProps {
  active?: boolean;
  children: ReactNode;
  footerTitle?: string;
  hasStickyHeader?: boolean;
  headerBackgroundColor?: string;
  navChildren?: ReactNode;
  onPress?: () => void;
  style?: object;
  withGutter?: boolean;
  withFooter?: boolean;
}

function BasicPage({
  active = true,
  children,
  footerTitle = '',
  hasStickyHeader = false,
  headerBackgroundColor = 'transparent',
  navChildren = null,
  onPress = () => null,
  withGutter = false,
  withFooter = true,
  style = {},
}: IProps) {
  return (
    <SafeLayout withGutter={withGutter} style={style}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={hasStickyHeader ? [0] : undefined}>
        <BasicNavHeader backgroundColor={headerBackgroundColor}>{navChildren}</BasicNavHeader>
        {children}
        {withFooter && <BasicPageFooter active={active} onPress={onPress} title={footerTitle} />}
      </ScrollView>
    </SafeLayout>
  );
}

export default BasicPage;
