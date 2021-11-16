import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';

const StreamRenderer = (props) => {
    let rend = props.streams == null ? <Text></Text> : <RTCView streamURL={props.streams[0].toURL()} />
    // let rend = []
    // props.streams.forEach(stream => {   
    //     console.log("STREAM RENDERER STREAMS", stream[0].toURL())
    //     rend.push(<RTCView streamURL={stream[0].toURL()} />)
    // })
    return rend
}


const mapStateToProps = (state) => {
    return {
        streams: state.incomingStreams
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(StreamRenderer);