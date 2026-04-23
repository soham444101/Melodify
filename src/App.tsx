
import { useEffect, useState } from 'react';

import { ActivityIndicator, StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { addTrack, setupPlayer } from '../musicPlayerServices';
import MusicPlayer from './screens/Player.Screen';
import MyTabs from './navigation/TabNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPlayerReady, setIsPaylerReady] = useState(false)

  async function setup() {
    let isSetup = await setupPlayer()

    if (isSetup) {
      await addTrack()
    }

    setIsPaylerReady(isSetup)
  }

  useEffect(() => {
    setup()
  }, [])

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MyTabs/>
    </SafeAreaProvider>
  );
}

export default App;
