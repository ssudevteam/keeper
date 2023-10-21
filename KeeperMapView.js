import {useRef, useState} from "react";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {Button, View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Styles} from "./styles";

let originLocation = [{
    title: "SSU Campus", location: {
        latitude: 38.34008053681795, longitude: -122.6755222789825,
    }, description: "Charles Darwin Building"
},]

export default function KeeperMapView() {
    const [locationsOfInterest, setLocationsOfInterest] = useState(originLocation)
    const [count, setCount] = useState(0);
    // const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    //     latitude: 38.34008053681795,
    //     longitude: -122.6755222789825
    // });
    const mapRef = useRef();

    const onRegionChange = (region) => {
        console.log(region);
    };

    const showLocationsOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            console.log(item.title);
            return (<Marker
                key={index}
                coordinate={item.location}
                title={item.title}
                description={item.description}
            >
                <Callout>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{`Lat: ${item.location.latitude}\nLong: ${item.location.longitude})`}</Text>
                    <Button title='Edit' onPress={() => null }/>
                </Callout>
            </Marker>)
        });
    };

    const getLocationOfInterest = (coordinates) => {
        if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
            console.error('Coordinates must have a longitude and latitude');
        }
        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;
        for (const point of locationsOfInterest) {
            if (point.location.latitude === latitude && point.location.longitude === longitude) {
                return point;
            }
        }
        return null;
    }

    const handleOnPress = (state) => {
        const event = state['nativeEvent'];
        const location = getLocationOfInterest(event.coordinate);
        if (location) {
            // Show annotation and/or edit menu, etc.
            console.log(location);
        } else {
            addLocationOfInterest(event.coordinate);
        }
    };

    const addLocationOfInterest = (coordinates) => {
        if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
            console.error('Coordinates must have a longitude and latitude');
        }
        console.log(coordinates);
        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;
        const newLocation = {
            title: `Hive #${count + 1}`, location: {
                latitude: latitude, longitude: longitude
            }, description: ""
        };
        setLocationsOfInterest(prevLocations => [...prevLocations, newLocation]);
        setCount(count + 1);
    }

    return (<View style={Styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={Styles.map}
            onRegionChange={onRegionChange}
            initialRegion={{
                latitude: 38.34008053681795, longitude: -122.6755222789825, latitudeDelta: 0.5, longitudeDelta: 0.3,
            }}
            onPress={handleOnPress}
            // customMapStyle={mapJson}
        >
            {showLocationsOfInterest()}
            {/*<Marker*/}
            {/*    draggable*/}
            {/*    pinColor='#0000ff'*/}
            {/*    coordinate={draggableMarkerCoord}*/}
            {/*    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}*/}
            {/*/>*/}
            {/*<Marker*/}
            {/*    pinColor='#00ff00'*/}
            {/*    coordinate={{latitude: -35, longitude: 147}}*/}
            {/*>*/}
            <Callout>
                <Text>Count: {count}</Text>
                <Button title='Increment Count' onPress={() => setCount(count + 1)}/>
            </Callout>
            {/*</Marker>*/}
            {/*<Text style={styles.mapOverlay}>Longitude: {draggableMarkerCoord.longitude},*/}
            {/*    latitude: {draggableMarkerCoord.latitude}</Text>*/}
        </MapView>
        <StatusBar style="auto"/>
    </View>);
}