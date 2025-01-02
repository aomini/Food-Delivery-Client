import {Text, TextStyle, LayoutChangeEvent, TextProps} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@/utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body';
  readonly fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | Array<TextStyle>;
  numberOfLines?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
};
const CustomText = ({
  variant = 'body',
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  onLayout,
  ...props
}: Props & TextProps) => {
  const computedFontSize = getComputedFontSize({variant, fontSize});
  const fontFamilyStyle = {fontFamily};

  return (
    <Text
      onLayout={onLayout}
      style={[
        {color: Colors.text, fontSize: computedFontSize},
        fontFamilyStyle,
        style,
      ]}
      {...props}>
      {props.children}
    </Text>
  );
};

const getComputedFontSize = ({
  variant,
  fontSize,
}: Pick<Props, 'fontSize' | 'variant'>) => {
  switch (variant) {
    case 'h1':
      return RFValue(fontSize || 22);
    case 'h2':
      return RFValue(fontSize || 20);
    case 'h3':
      return RFValue(fontSize || 18);
    case 'h4':
      return RFValue(fontSize || 16);
    case 'h5':
      return RFValue(fontSize || 14);
    case 'h6':
      return RFValue(fontSize || 12);
    case 'h7':
      return RFValue(fontSize || 10);
    case 'h8':
      return RFValue(fontSize || 8);
    case 'h9':
      return RFValue(fontSize || 6);
    case 'body':
    default:
      return RFValue(fontSize || 14);
  }
};

export default CustomText;
