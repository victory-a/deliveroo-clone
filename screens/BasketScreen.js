import { View, SafeAreaView, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import {} from 'react-native-web';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);

  const basketTotal = useSelector(selectBasketTotal);

  const dispatch = useDispatch();

  const groupedItems = React.useMemo(() => {
    return items.reduce((acc, item) => {
      const objectExists = acc[item.id];
      if (!objectExists) {
        acc[item.id] = [];
      }
      acc[item.id].push(item);

      return acc;
    }, {});
  }, [items]);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} className='rounded-full bg-gray-100 absolute top-3 right-5'>
            <XCircleIcon color='#00ccbb' height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />

          <Text className='flex-1'> Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00ccbb]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItems).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-[#00ccbb]'>{items.length} x</Text>
              <Image source={{ uri: urlFor(items[0]?.image).url() }} className='h-12 w-12 rounded-full' />
              <Text className='flex-1'>{items[0]?.name}</Text>

              <Text className='text-gray-600'>
                <Currency quantity={items[0]?.price} currecy='GBP' />
              </Text>

              <TouchableOpacity>
                <Text className='text-[#00ccbb] text-xs' onPress={() => dispatch(removeFromBasket({ id: key }))}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              <Currency quantity={basketTotal} currecy='GBP' />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              <Currency quantity={5.99} currecy='GBP' />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>
              <Currency quantity={basketTotal + 5.99} currecy='GBP' />
            </Text>
          </View>

          <TouchableOpacity className='rounded-lg bg-[#00ccbb] p-4'>
            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
