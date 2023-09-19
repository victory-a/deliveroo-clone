import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';

const DishRow = (props) => {
  const { id, name, description, price, image } = props;
  const [isPressed, setIsPressed] = React.useState(false);

  const items = useSelector(selectBasketItemsWithId(id));

  const dispatch = useDispatch();
  function addItemToBasket() {
    dispatch(addToBasket({ id, name, description, price, image }));
  }

  function removeItemFromBasket() {
    dispatch(removeFromBasket({ id }));
  }

  return (
    <>
      <TouchableOpacity className={`bg-white p-4 border-gray-200 border ${isPressed && 'border-b-0'}`} onPress={() => setIsPressed(!isPressed)}>
        <View className='flex-row'>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{description}</Text>
            <Text className='text-gray-400 mt-2'>
              <Currency quantity={price} currency='GBP' />
            </Text>
          </View>
          <View>
            <Image source={{ uri: urlFor(image).url() }} style={{ borderWidth: 1, borderColor: '#f3f3f4' }} className='h-20 w-20 p-4 bg-gray-300' />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className={`bg-white px-4 border-gray-200 ${isPressed && 'border-b-0'}`}>
          <View className='flex-row items-center space-x-2 pb-3'>
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon size={40} color={items.length > 0 ? '#00CCBB' : 'gray'} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color='#00CCBB' />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
