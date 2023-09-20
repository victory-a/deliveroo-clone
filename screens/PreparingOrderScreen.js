import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className='bg-[#00ccbb] flex-1 justify-center items-center'>
      <Animatable.Image source={require('../assets/orderLoading.gif')} animation='slideInUp' iterationCount={1} className='h-96 w-96' />
      <Animatable.Text animation='slideInUp' iterationCount={1} className='text-lg my-10 text-white font-bold text-center'>
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
