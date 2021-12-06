import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import * as Avatars from '../helpers/avatars'
import { CONTROLS_BUTTON, CONTROLS_THEME, RED_ACCENT } from '../assets/themes';

class MapViewAlt extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            latitude: 0.0,
            longitude: 0.0,
            speed: 0.0,
        };

        this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    }

    onUserLocationUpdate(location) {
        this.setState({
            timestamp: location.timestamp,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            speed: location.coords.speed,
        });
    }

    renderSpeedInfo() {
        if (this.state.timestamp <= 0) {
            return null;
        }
        return (
            <View style={styles.speed}>
                <Text style={styles.speedText}>{this.state.speed} km/h</Text>
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

                    {this.renderSpeedInfo()}

                    <MapboxGL.MarkerView
                        id={"user_loc"}
                        coordinate={[this.state.longitude, this.state.latitude]}>
                        <View style={styles.userIconWrapper}>
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
    speed: {
        top: 60,
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    speedText: {
        color: 'white',
        alignContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(235, 64, 52, 0.9)',
        backgroundColor: CONTROLS_THEME,
        // borderRadius: 20,
        padding: 10
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
    },
    userIconWrapper: {
        backgroundColor: RED_ACCENT,
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