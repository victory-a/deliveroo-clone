import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from './components/Categories';
import FeaturedRow from './components/FeaturedRow';

const HomeScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className='bg-white pt-5'>
      {/* Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image source={{ uri: 'https://links.papareact.com/wru' }} className='h-7 w-7 bg-gray-300 p-4 rounded-full px-4' />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-x5'>Deliver Now!</Text>
          <Text className='font-bold text-xl'>
            Current Location
            <ChevronDownIcon size={20} color='#00ccbb' />
          </Text>
        </View>

        <UserIcon size={35} color='#00ccbb' />
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
          <MagnifyingGlassIcon color='grey' size={20} />
          <TextInput placeholder='Restaurants and Cousins' keyboardType='default' />
        </View>
        <AdjustmentsVerticalIcon color='#00ccbb' />
      </View>

      {/* body */}
      <ScrollView>
        {/* categories */}
        <Categories />

        {/* featured */}
        <FeaturedRow id='123' title='Featured' description='Paid placements from out partners' />
        {/* Tasty Discounts */}
        <FeaturedRow id='1234' title='Featured' description='Paid placements from out partners' />
        {/* Offers near you */}
        <FeaturedRow id='12345' title='Featured' description='Paid placements from out partners' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
