import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@/utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@/components/ui/custom-text';
import {User} from '@/types/user.types';

type Props = {
  details?: User<'customer'> | null;
};

const DeliveryDetails = ({details}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="bike-fast" color={Colors.disabled} />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Your Delivery Details
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Details of your order
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon name="map-marker-outline" color={Colors.disabled} />
        </View>
        <View style={{width: '80%'}}>
          <CustomText variant="h7" fontFamily={Fonts.Medium}>
            Delivery at Home
          </CustomText>
          <CustomText numberOfLines={2} variant="h9" fontFamily={Fonts.Medium}>
            {details?.address || '-------'}
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon name="phone-outline" color={Colors.disabled} />
        </View>
        <View style={{width: '80%'}}>
          <CustomText variant="h7" fontFamily={Fonts.Medium}>
            {details?.name || '----'} {details?.phone || 'XXXXXXXXXX'}
          </CustomText>
          <CustomText numberOfLines={2} variant="h9" fontFamily={Fonts.Medium}>
            Receivers contact number.
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
