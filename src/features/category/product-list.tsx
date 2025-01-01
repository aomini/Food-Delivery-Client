import {StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Product} from '@/types/category.types';
import {Colors} from '@/utils/Constants';
import ProductItem from './product-item';

type Props = {
  data: Array<Product>;
};

const ProductList = ({data}: Props) => {
  const renderProduct = ({item, index}: {item: Product; index: number}) => {
    return <ProductItem item={item} index={index} />;
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderProduct}
      style={styles.container}
      contentContainerStyle={styles.content}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
});

export default ProductList;
