import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Main } from './screens'

import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Main />
    </SafeAreaView>
  )
}
