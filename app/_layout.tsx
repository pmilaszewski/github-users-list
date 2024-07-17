import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Main } from './screens'
import { Layout } from './components'

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Layout>
        <Main />
      </Layout>
    </SafeAreaView>
  )
}
