import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import * as Avatars from '../helpers/avatars'

class MapViewAlt extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            timestamp: 0,
            latitude: 0.0,
            longitude: 0.0,
            altitude: 0.0,
            heading: 0.0,
            accuracy: 0.0,
            speed: 0.0,
        };

        this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    }

    onUserLocationUpdate(location) {
        this.setState({
            timestamp: location.timestamp,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            altitude: location.coords.altitude,
            heading: location.coords.heading,
            accuracy: location.coords.accuracy,
            speed: location.coords.speed,
        });
    }

    renderLocationInfo() {
        if (this.state.timestamp <= 0) {
            return null;
        }
        return (
            <View>
                <Text>Timestamp: {this.state.timestamp}</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Text>Altitude: {this.state.altitude}</Text>
                <Text>Heading: {this.state.heading}</Text>
                <Text>Accuracy: {this.state.accuracy}</Text>
                <Text>Speed: {this.state.speed}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.map}>
                <MapboxGL.MapView
                    styleURL={"mapbox://styles/tessoro-/ckux4pjtw19fy18n0w3k7xz78"}
                    logoEnabled={false}
                    compassEnabled={true}
                    scrollEnabled={false}
                    rotateEnabled={true}
                    showUserLocation={true}
                    style={{ flex: 1 }}>
                    <MapboxGL.Camera
                        zoomLevel={16}
                        followUserLocation={true}
                        followUserMode={'course'}
                        followZoomLevel={16}
                    />

                    <MapboxGL.UserLocation
                        visible={false}
                        onUpdate={this.onUserLocationUpdate}
                    />

                    <MapboxGL.MarkerView
                        id={"user_loc"}
                        coordinate={[this.state.longitude, this.state.latitude]}>
                        <View style={styles.iconWrapper}>
                            <Image
                                source={Avatars.AvatarToImage(this.props.avatar)}
                                style={styles.icon}
                            />
                        </View>
                    </MapboxGL.MarkerView>

                    {this.props.locations.map(peerLocation => {
                        return (<MapboxGL.MarkerView
                            id={peerLocation.id}
                            key={peerLocation.id}
                            coordinate={[peerLocation.location.Longitude, peerLocation.location.Latitude]}>
                            <View style={styles.iconWrapper}>
                                <Image
                                    source={Avatars.AvatarToImage(this.props.avatar)}
                                    style={styles.icon}
                                />
                            </View>
                        </MapboxGL.MarkerView>)
                    })}

                </MapboxGL.MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    icon: {
        height: 15,
        width: 15,
        opacity: 1,
        resizeMode: 'contain',
        borderRadius: 10
    },
    iconWrapper: {
        backgroundColor: 'rgb(255, 179, 0)',
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)'
    }
});


const mapStateToProps = (state) => {
    return { locations: state.peerLocations, avatar: state.currentAvatar }
};
export default connect(mapStateToProps)(MapViewAlt);