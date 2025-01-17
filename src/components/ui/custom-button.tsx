import {Colors, Fonts} from '@/utils/Constants';
import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './custom-text';

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
};

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <CustomText
          variant="h6"
          fontFamily={Fonts.SemiBold}
          style={styles.text}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
});

export default CustomButton;
