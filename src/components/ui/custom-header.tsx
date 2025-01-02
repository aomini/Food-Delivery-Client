import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Fonts} from '@/utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './custom-text';
import {back} from '@/utils/navigation-utils';

type Props = {
  title: string;
  search?: boolean;
};

const CustomHeader = ({title, search = false}: Props) => {
  return (
    <SafeAreaView
      edges={{
        bottom: 'off',
        top: 'additive',
        left: 'additive',
        right: 'additive',
      }}>
      <View style={styles.flexRow}>
        <Pressable onPress={() => back()}>
          <Icon name="chevron-back" color={Colors.text} size={RFValue(16)} />
        </Pressable>
        <CustomText
          style={styles.text}
          variant="h5"
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
        <View>
          {search && (
            <Icon name="search" color={Colors.text} size={RFValue(16)} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  text: {
    textAlign: 'center',
  },
});

export default CustomHeader;
