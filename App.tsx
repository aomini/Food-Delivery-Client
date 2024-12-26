import 'react-native-gesture-handler';
import React from 'react';
import Navigation from '@/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
