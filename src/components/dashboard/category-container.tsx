import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Category} from '@/types/category.types';
import ScalePress from '../ui/scale-press';
import {navigate} from '@/utils/navigation-utils';
import CustomText from '../ui/custom-text';
import {Fonts} from '@/utils/Constants';

type Props = {
  data: Array<Category>;
};

const CategoryContainer = ({data}: Props) => {
  const renderItems = (items: Props['data']) => {
    return (
      <>
        {items.map((item, index) => {
          return (
            <ScalePress
              onPress={() => navigate('product-categories')}
              key={index}
              style={styles.item}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <CustomText
                style={styles.text}
                variant="h8"
                fontFamily={Fonts.Medium}>
                {item.name}
              </CustomText>
            </ScalePress>
          );
        })}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
  },

  imageContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#e5f3f3',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
  },
});

export default CategoryContainer;
