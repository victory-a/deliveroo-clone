import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = (props) => {
  const { imgUrl, title, rating, genre, address } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Restaurant', { ...props })} className='bg-white mr-3 shadow-sm'>
      <Image source={{ uri: urlFor(imgUrl).url() }} className='h-36 w-64 rounded-sm' />
      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>

        <View className='flex-row items-center space-x-1'>
          <StarIcon color='green' opacity={0.5} size={22} />
          <Text className='text-xs text-gray-500'>
            <Text className='text-green-500'>{rating}</Text>. {genre}
          </Text>
        </View>

        <View className='flex-row items-center'>
          <MapPinIcon color='grey' opacity={0.4} size={22} />
          <Text className='text-xs text-gray-500'>Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
