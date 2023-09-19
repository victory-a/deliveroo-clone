import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

import sanityClient from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"]{
      ...,
      restaurants[]-> {
        ...,
        dishes[]->,
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}>
        {/* categories */}
        <Categories />

        {featuredCategories?.map((category) => {
          return <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
