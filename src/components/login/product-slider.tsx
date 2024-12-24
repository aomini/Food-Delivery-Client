import {View, StyleSheet, Image} from 'react-native';
import React, {useMemo} from 'react';
import {imageData} from '@/utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {screenWidth} from '@/utils/Scaling';

const ProductSlider = () => {
  const rows = useMemo(() => {
    let results = [];
    for (let i = 0; i < imageData.length; i += 4) {
      results.push(imageData.slice(i, i + 4));
    }
    return results as Array<typeof imageData>;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0}
        duration={10000}>
        <View style={styles.gridContainer}>
          {rows.map((row, index) => {
            return <MemoizedRow key={index} row={row} rowIndex={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row = ({row, rowIndex}: {row: typeof imageData; rowIndex: number}) => {
  const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
  return (
    <View style={styles.row}>
      {row.map((image, imageIndex) => (
        <View
          key={imageIndex}
          style={[
            styles.itemContainer,
            {transform: [{translateX: horizontalShift}]},
          ]}>
          <Image source={image} style={styles.image} />
        </View>
      ))}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  autoScroll: {
    position: 'absolute',
    top: 0,
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
  },
});

export default ProductSlider;
