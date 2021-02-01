import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/components/HomeScreen'
import { useSelector } from 'react-redux'
import styles from './src/styles/styles'
import PostForm from './src/components/PostForm'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Fontisto } from '@expo/vector-icons'
import LoginScreen from './src/components/LoginScreen'
import FlashMessage from 'react-native-flash-message'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  const { appTitle } = useSelector(state => state)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={props => ({
          headerRight: () => (
            <Fontisto
              name='spotify'
              testID='login-icon'
              onPress={() => props.navigation.navigate('PostForm')}
              style={styles.loginButton}
              size={44}
            />
          ),
          title: appTitle,
          headerStyle: styles.mainHeader,
          headerTitleStyle: styles.appTitle,
        })}
      />
      <FlashMessage testID='flash-message' position='center' />
    </Stack.Navigator>
  )
}

const App = () => {
  const { authenticated } = useSelector(state => state)
  if (authenticated) {
    return (
      <NavigationContainer style={{ height: 10 }}>
        <Tab.Navigator>
          <Tab.Screen name='Feed' component={HomeStack} />
          <Tab.Screen name='Post' component={PostForm} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            testID='login-screen'
            options={{
              title: 'Log In To TuneShare',
              headerStyle: styles.mainHeader,
              headerTitleStyle: styles.appTitle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
