import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Product} from '@/types/category.types';
import {useCartStore} from '@/state/cart-store';
import {Colors, Fonts} from '@/utils/Constants';
import CustomText from './custom-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  item: Product;
};

const UniversalAdd = ({item}: Props) => {
  const count = useCartStore(state => state.size(item._id));
  const {insert: addItem, erase: removeItem} = useCartStore();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: !count ? '#fff' : Colors.secondary},
      ]}>
      {!count ? (
        <Pressable style={styles.add} onPress={() => addItem(item)}>
          <CustomText
            variant="h9"
            fontFamily={Fonts.SemiBold}
            style={styles.addText}>
            ADD
          </CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={() => removeItem(item._id)}>
            <Icon name="minus" color="#fff" size={RFValue(13)} />
          </Pressable>
          <CustomText
            variant="h8"
            fontFamily={Fonts.SemiBold}
            style={styles.text}>
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)}>
            <Icon name="plus" color="#fff" size={RFValue(13)} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: 65,
    borderRadius: 8,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  addText: {
    color: Colors.secondary,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
});
