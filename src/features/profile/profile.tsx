import {StyleSheet, FlatList, View, ListRenderItem} from 'react-native';
import React from 'react';
import {useAuthStore} from '@/state/auth-store';
import {useCartStore} from '@/state/cart-store';
import {fetchCustomerOrders} from '@/services/auth-service';
import {Order} from '@/types/order.types';
import CustomHeader from '@/components/ui/custom-header';
import CustomText from '@/components/ui/custom-text';
import {Fonts} from '@/utils/Constants';
import WalletSection from './wallet-section';
import ActionButton from './action-button';
import {storage, tokenStorage} from '@/state/storage';
import {resetAndNavigate} from '@/utils/navigation-utils';
import OrderItem from './order-item';

const Profile = () => {
  const [orders, setOrders] = React.useState<Array<Order>>([]);
  const {logout, user} = useAuthStore();
  const {clearCart} = useCartStore();

  const fetchOrder = React.useCallback(async () => {
    if (user?._id) {
      const data = (await fetchCustomerOrders(user._id)) || [];
      setOrders(data);
    }
  }, [user?._id]);

  React.useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleLogout = React.useCallback(() => {
    clearCart();
    logout();
    tokenStorage.clearAll();
    storage.clearAll();
    resetAndNavigate('/customer-login');
  }, [clearCart, logout]);

  const renderHeader = React.useCallback(() => {
    return (
      <View>
        <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
          Your account
        </CustomText>
        <CustomText variant="h7" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomText>
        <WalletSection />
        <CustomText variant="h8" style={styles.informativeText}>
          YOUR INFORMATION
        </CustomText>
        <ActionButton icon="book-outline" label="Address book" />
        <ActionButton icon="information-circle-outline" label="About us" />
        <ActionButton
          icon="log-out-outline"
          label="Logout"
          onPress={handleLogout}
        />
        <CustomText variant="h8" style={styles.pastText}>
          PAST ORDERS
        </CustomText>
      </View>
    );
  }, [handleLogout, user?.phone]);

  const renderOrderItem: ListRenderItem<Order> = ({item, index}) => {
    return <OrderItem item={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />
      <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrderItem}
        keyExtractor={item => item.orderId}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
});
