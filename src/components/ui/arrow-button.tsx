import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@/utils/Constants';
import CustomText from './custom-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  title: string;
  price: number;
  onPress?: () => void;
  loading?: boolean;
};

const ArrowButton = ({title, price, onPress, loading}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.btn, {justifyContent: price ? 'space-between' : 'center'}]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}>
      {price ? (
        <View>
          <CustomText
            variant="h7"
            style={{color: 'white'}}
            fontFamily={Fonts.Medium}>
            ₹{price.toFixed(2)}
          </CustomText>
          <CustomText
            variant="h9"
            style={{color: 'white'}}
            fontFamily={Fonts.Medium}>
            TOTAL
          </CustomText>
        </View>
      ) : null}
      <View style={styles.flexRow}>
        <CustomText
          variant="h6"
          style={{color: '#fff'}}
          fontFamily={Fonts.Medium}>
          {title}
        </CustomText>
        {loading ? (
          <ActivityIndicator
            color="white"
            style={{marginHorizontal: 5}}
            size="small"
          />
        ) : (
          <Icon name="arrow-right" color="#fff" size={RFValue(25)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
