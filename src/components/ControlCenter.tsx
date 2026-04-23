import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import TrackPlayer, { State, usePlaybackState, } from 'react-native-track-player'

const ControlCenter = ({ changeSongsBasedOnDirection }: { changeSongsBasedOnDirection: Function }) => {
    const playBackState = usePlaybackState();

    const togglePlayback = async (playback: State | undefined) => {
        const currentTrack = await TrackPlayer.getActiveTrack()

        if (currentTrack !== null) {
            if (playback === State.Paused || playback === State.Ready) {
                await TrackPlayer.play()
            } else {
                await TrackPlayer.pause()
            }
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => changeSongsBasedOnDirection("prev")}>
                <Text style={styles.text}>Previous</Text>
            </Pressable>
            <Pressable onPress={() => togglePlayback(playBackState.state)}>
                {<Text style={styles.text}>{playBackState.state == State.Playing ? "Playing" : "Play"}</Text>}
            </Pressable>
            <Pressable onPress={() => changeSongsBasedOnDirection('next')}>
                <Text style={styles.text}>Next</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        marginTop: 50, 
        alignItems: "flex-start",
        justifyContent: "space-evenly"
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
    text: {
        fontWeight: '500',
        color: "#fff",
        fontSize: 14
    }
});

export default ControlCenter