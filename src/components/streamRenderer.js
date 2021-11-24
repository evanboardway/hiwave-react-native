import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import Video from 'react-native-video';


const StreamRenderer = (props) => {
    // volume={props.volumes.get(stream.id)}
    let rend = []
    if (props.streams.length == 0) {
        rend = (<Text></Text>)
    } else {
        props.streams.forEach(stream => {
            rend.push(
                // <RTCView key={stream.id} streamURL={stream.toURL()} />
                <Video key={stream.id} mixWithOthers={"mix"} volume={0.0} source={{ uri: `https://${stream.toURL()}` }} audioOnly={true}/>
            )
        })
    }
    return rend
}


const mapStateToProps = (state) => {
    return {
        volumes: state.streamVolumes,
        streams: state.incomingStreams
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(StreamRenderer);