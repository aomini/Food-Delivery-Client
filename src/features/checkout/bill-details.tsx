import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useCartStore} from '@/state/cart-store';
import CustomText from '@/components/ui/custom-text';
import {Colors, Fonts} from '@/utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const ReportItem = ({
  icon,
  underline,
  title,
  price,
}: {
  icon: string;
  underline?: boolean;
  title: string;
  price: number;
}) => {
  return (
    <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
      <View style={styles.flexRow}>
        <Icon
          color={Colors.text}
          name={icon}
          style={{opacity: 0.8}}
          size={RFValue(12)}
        />
        <CustomText
          variant="h8"
          style={{
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationStyle: 'dashed',
          }}>
          {title}
        </CustomText>
      </View>
      <CustomText variant="h8">₹{price.toFixed(2)}</CustomText>
    </View>
  );
};

const BillDetails = () => {
  const getTotal = useCartStore(state => state.total);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>
        <ReportItem icon="house" title="Items Total" price={getTotal()} />
        <ReportItem icon="pedal-bike" title="Delivery Charge" price={29} />
        <ReportItem icon="shopping-bag" title="Handling Charge" price={2} />
        <ReportItem icon="pedal-bike" title="Surge Charge" price={3} />
      </View>
      <View style={[styles.flexRowBetween, {marginBottom: 15}]}>
        <CustomText
          variant="h7"
          style={styles.title}
          fontFamily={Fonts.SemiBold}>
          Grand Total
        </CustomText>
        <CustomText style={styles.title} fontFamily={Fonts.SemiBold}>
          ₹{getTotal().toFixed(2)}
        </CustomText>
      </View>
    </View>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
