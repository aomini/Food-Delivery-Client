import CustomText from '@/components/ui/custom-text';
import {getCurrentOrderById} from '@/services/create-order';
import {useAuthStore} from '@/state/auth-store';
import {hocStyles} from '@/styles/global-styles';
import {Colors, Fonts} from '@/utils/Constants';
import {navigate} from '@/utils/navigation-utils';
import {screenWidth} from '@/utils/Scaling';
import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {io} from 'socket.io-client';

const SOCKET_URL = 'ws://localhost:3000';

const WithLiveStatus = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithStatusComponent = (props: P) => {
    const {currentOrder, setCurrentOrder} = useAuthStore();
    const routeName = useNavigationState(
      state => state.routes[state.index]?.name,
    );
    const fetchOrderDetails = React.useCallback(async () => {
      const data = await getCurrentOrderById(currentOrder?._id);
      if (data) setCurrentOrder(data);
    }, [currentOrder?._id, setCurrentOrder]);

    React.useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: false,
          reconnectionAttempts: 3,
        });

        socketInstance.on('connect_error', err => {
          console.error('Socket was unable to connect', err.message);
        });
        socketInstance.emit('joinRoom', currentOrder._id);
        socketInstance.on('liveTrackingUpdates', () => {
          fetchOrderDetails();
          console.log('receiving live updates');
        });
        socketInstance.on('orderConfirmed', () => {
          fetchOrderDetails();
          console.log('Order confirmation live updates');
        });

        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder, fetchOrderDetails]);

    return (
      <View style={styles.container}>
        <Component {...props} />
        {Boolean(currentOrder) && routeName === 'product-dashboard' && (
          <View
            style={[
              hocStyles.CategoryContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={styles.flexRow}>
              <View style={styles.image}>
                <Image
                  source={require('@/assets/icons/bucket.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              <View style={{width: '60%'}}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is {currentOrder?.status}
                </CustomText>
                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                  {(currentOrder?.items[0].item.name || '').concat(
                    currentOrder?.items.length || 0 - 1 > 0
                      ? ` and ${currentOrder?.items.length || 0 - 1}+ items`
                      : ``,
                  )}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate('live-tracking')}
              style={styles.btn}>
              <CustomText
                variant="h7"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.Medium}>
                View
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return WithStatusComponent;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
  },
  image: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
    marginLeft: 'auto',
    right: screenWidth * 0.04,
  },
});
export default WithLiveStatus;
