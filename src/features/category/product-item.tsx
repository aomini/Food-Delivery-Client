import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Product} from '@/types/category.types';
import {screenHeight} from '@/utils/Scaling';
import CustomText from '@/components/ui/custom-text';
import {Colors, Fonts} from '@/utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import UniversalAdd from '@/components/ui/universal-add';

type Props = {
  item: Product;
  index: number;
};

const ProductItem = ({item, index}: Props) => {
  const isSecondColumn = index % 2 === 1;

  return (
    <View style={[styles.container, {marginRight: isSecondColumn ? 10 : 0}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require('@/assets/icons/clock.png')}
            style={styles.icon}
          />
          <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
            8 Mins
          </CustomText>
        </View>
        <CustomText
          style={{marginVertical: 4}}
          variant="h8"
          numberOfLines={2}
          fontFamily={Fonts.Medium}>
          {item.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              ₹{item.price.toFixed(2)}
            </CustomText>

            {item.discount ? (
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{opacity: 0.8, textDecorationLine: 'line-through'}}>
                ₹{item.discount.toFixed(2)}
              </CustomText>
            ) : null}
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: screenHeight * 0.12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    gap: 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'flex-start',
  },
  icon: {
    width: 15,
    height: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 'auto',
  },
});

export default ProductItem;
