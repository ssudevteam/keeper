import {useEffect, useRef, useState} from "react";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {Button, View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Styles} from "./styles";
import axios from "react-native/Libraries/Utilities/Dimensions";

// For testing on mobile device must provide your own IP Address
import {API_URL} from "@env";
import {HiveMarker} from "./HiveMarker";

let originLocation = [{
    name: "SSU Campus", location: {
        latitude: 38.34008053681795, longitude: -122.6755222789825,
    }, description: "Charles Darwin Building"
},]

export default function KeeperMapView() {
    const [allHives, setAllHives] = useState(originLocation);
    const [locationsOfInterest, setLocationsOfInterest] = useState(originLocation);
    const [count, setCount] = useState(0);
    // const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    //     latitude: 38.34008053681795,
    //     longitude: -122.6755222789825
    // });
    const mapRef = useRef();

    // useEffect(() => {
    //     // Fetching the hives data from the API endpoint using axios
    //     axios
    //         // Must be update with your own IP Address since running on mobile device
    //         // To remain secure using dotenv file for your own IP address
    //         .get(`http://${API_URL}/hives`)
    //         .then((response) => {
    //             setAllHives(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("There was an error fetching the hives data", error);
    //         });
    // }, []);

    // Map over allHives to render the Marker components
    // for each hive using the object's location coordinates along with other data to display.
    const renderHives = () => {
        console.log('renderHives called');
        return allHives.map((hive, index) => {
            console.log(hive);
            return HiveMarker(index, hive);
        });
    };

    const onRegionChange = (region) => {
        console.log(region);
    };

    const showLocationsOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            console.log(item.name);
            return (<Marker
                key={index}
                coordinate={item.location}
                title={item.name}
                description={item.description}
            >
                <Callout>
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{`Lat: ${item.location.latitude}\nLong: ${item.location.longitude})`}</Text>
                    <Button title='Edit' onPress={() => null}/>
                </Callout>
            </Marker>)
        });
    };

    const getHiveFromLocation = (coordinates) => {
        if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
            console.error('Coordinates must have a longitude and latitude');
        }
        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;
        for (const hive of allHives) {
            if (hive.location.latitude === latitude && hive.location.longitude === longitude) {
                return hive;
            }
        }
        return null;
    }

    const handleOnPress = (state) => {
        const event = state['nativeEvent'];
        const hive = getHiveFromLocation(event.coordinate);
        if (hive) {
            // Show annotation and/or edit menu, etc.
            console.log(hive);
        } else {
            addHive(event.coordinate);
        }
    };

    const addHive = (coordinates) => {
        if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
            console.error('Coordinates must have a longitude and latitude');
        }
        console.log(coordinates);
        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;
        const newHive = {
            name: `Hive #${count + 1}`,
            location: {
                latitude: latitude,
                longitude: longitude
            },
            description: "",
            strength: '',
            brood: '',
            images: null
        };
        setAllHives(prevHives => [...prevHives, newHive]);
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
            {/*{showLocationsOfInterest()}*/}
            {renderHives()}
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
            {/*<Callout>*/}
            {/*    <Text>Count: {count}</Text>*/}
            {/*    <Button title='Increment Count' onPress={() => setCount(count + 1)}/>*/}
            {/*</Callout>*/}
            {/*</Marker>*/}
            {/*<Text style={styles.mapOverlay}>Longitude: {draggableMarkerCoord.longitude},*/}
            {/*    latitude: {draggableMarkerCoord.latitude}</Text>*/}
        </MapView>
        <StatusBar style="auto"/>
    </View>);
}