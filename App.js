import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen
            name='Restaurant'
            component={RestaurantScreen}
            options={{
              title: 'Home',
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen name='Basket' component={BasketScreen} options={{ presentation: 'modal', headerShown: false }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
