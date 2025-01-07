import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '@/utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@/components/ui/custom-text';
import {Fonts} from '@/utils/Constants';

type Props = {
  icon: string;
  label: string;
};

const WalletItem = ({icon, label}: Props) => {
  return (
    <View style={styles.itemContainer}>
      <Icon name={icon} color={Colors.text} size={RFValue(20)} />
      <CustomText variant="h8" fontFamily={Fonts.Medium}>
        {label}
      </CustomText>
    </View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
  },
});
