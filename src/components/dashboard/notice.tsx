import {View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {noticeHeight} from '@/utils/Scaling';
import CustomText from '../ui/custom-text';
import {Fonts} from '@/utils/Constants';
import {Defs, G, Path, Svg, Use} from 'react-native-svg';
import {wavyData} from '@/utils/dummyData';

const Notice = () => {
  return (
    <View style={styles.noticeView}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}>
              It's raining near this location
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Out delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        style={styles.wave}
        width="100%"
        height={20}
        fill="#ccd5e4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none">
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeView: {
    height: noticeHeight,
    width: '100%',
  },
  container: {
    backgroundColor: '#ccd5e4',
  },
  noticeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 8,
    color: '2d3875',
    textAlign: 'center',
  },
  textCenter: {
    marginBottom: 8,
    textAlign: 'center',
  },
  wave: {
    width: '100%',
    transform: [{rotateX: '180deg'}],
  },
});

export default Notice;
