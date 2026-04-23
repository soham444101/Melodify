import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

import TrackPlayer, {
  AddTrack,
  Event,
  State,
  Track,
  useTrackPlayerEvents
} from 'react-native-track-player'
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';
import { Route, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen')

const Player = () => {
  const [track, setTrack] = useState<Track | null>();
  const params = useRoute<any>().params;

  async function startTrack() {
    let curState = await TrackPlayer.getPlaybackState();
    if (curState.state === State.Ready && !track) {
      const playingTrack = await TrackPlayer.getTrack(0)
      setTrack(playingTrack)
    }
  }
  async function getTrackById(id: number) {
    let curState = await TrackPlayer.getPlaybackState();
    if (track?.id !== id && (curState.state === State.Ready || curState.state === State.Paused || curState.state === State.Playing)) {
      const playingTrack = await TrackPlayer.getTrack(id - 1);
      await TrackPlayer.skip(id - 1);
      await TrackPlayer.play()
      setTrack(playingTrack);
    }
  }
  if (params?.id) {
    getTrackById(params?.id)
  }
  useEffect(() => {
    if (!params) {
      startTrack();
    }
  }, [])

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.index || 0);
        setTrack(playingTrack);
        break;

    }
  })

  const changeSongsBasedOnDirection = async (toMove: string) => {
    switch (toMove) {
      case "prev":
        await TrackPlayer.skipToPrevious();
        break;
      case "next": ;
        await TrackPlayer.skipToNext()
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{ uri: track?.artwork.toString() }}
            />
          )}
        </View>
      </View>
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter changeSongsBasedOnDirection={changeSongsBasedOnDirection} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default Player;