import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import React from 'react';
import {Category, Product} from '@/types/category.types';
import CustomHeader from '@/components/ui/custom-header';
import {getCategories} from '@/services/product-service';
import Sidebar from './sidebar';

const ProductCategories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  const [products, setProducts] = React.useState<Array<Product>>([]);
  const [categoriesLoading, setCategoriesLoading] = React.useState(true);
  const [productsLoading, setProductsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categories = await getCategories();
        setCategories(categories);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]);
        }
      } catch (err: unknown) {
        console.log(err);
        Alert.alert(
          'message' in (err as Error)
            ? (err as Error).message
            : 'Something went wrong while fetching categories',
        );
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size="small" color={'red'} />
        ) : (
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: Category) =>
              setSelectedCategory(category)
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCategories;
