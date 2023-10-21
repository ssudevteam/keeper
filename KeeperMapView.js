import { useRef, useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Styles } from "./styles";
import axios from "axios";

// For testing on mobile device must provide your own IP Address
import {API_URL} from "@env";
import {HiveMarker} from "./HiveMarker";


const sortMapAscending = (map) => {
    return new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
}

const printMap = (map) => {
    map.forEach((value, key) => {
        console.log(`${key}: ${value}`)
    })
}

let originLocation = [{
    name: "SSU Campus", location: {
        latitude: 38.34008053681795, longitude: -122.6755222789825,
    }, description: "Charles Darwin Building"
}];

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

import {hives} from './database/hives.json'

export default function KeeperMapView() {
    const [allHives, setAllHives] = useState(hives);
    const [locations, setLocations] = useState(originLocation);
    const [optimalRoutes, setOptimalRoutes] = useState(null);
    const [count, setCount] = useState(0);
    const mapRef = useRef();

    const getAllHiveCoordinates = () => {
        const coordinates = [];
        allHives.forEach((hive) => {
            let id = null;
            if (hive.hasOwnProperty("$oid")) {
                id = hive._id.$oid;
            } else {
                id = hive._id;
            }
            coordinates.push({id: id, coordinates: hive.location});
        });
        return coordinates;
    }

    const fetchHiveDistances = async () => {
        const hiveCoords = getAllHiveCoordinates();
        let distanceMap = new Map();
        const origin = `${originLocation[0].location.latitude},${originLocation[0].location.longitude}`;

        const promises = hiveCoords.map(async (hive) => {
            const dest = `${hive.coordinates.latitude},${hive.coordinates.longitude}`;
            try {
                const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${GOOGLE_API_KEY}`);
                const respJson = await resp.json();
                const legs = respJson.routes[0].legs;
                let distance = 0;
                legs.forEach((leg) => {
                    distance += leg.distance.value; // Value is in meters
                });
                console.log(`hive ${hive.id}, with distance ${distance} has been added`);
                distanceMap.set(hive.id, distance);
            } catch (error) {
                console.log('Error: ', error);
            }
        });

        await Promise.all(promises);

        distanceMap = sortMapAscending(distanceMap);

        printMap(distanceMap);
        return distanceMap;
    }

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

    const renderHives = () => {
        console.log('renderHives called');
        return allHives.map((hive, index) => {
            return HiveMarker(index, hive);
        });
    };

    const onRegionChange = (region) => {
        console.log(region);
    };

    const showLocationsOfInterest = () => {
        return locations.map((item, index) => {
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

    const handleOnPress = async (state) => {
        const event = state['nativeEvent'];
        const hive = getHiveFromLocation(event.coordinate);
        if (hive) {
            // Show annotation and/or edit menu, etc.
            console.log(hive);
        } else {
            addHive(event.coordinate);
        }
        fetchHiveDistances()
            .then(distanceMap => {
                setOptimalRoutes(distanceMap);
            });
    };

    const addHive = (coordinates) => {
        if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
            console.error('Coordinates must have a longitude and latitude');
        }
        console.log(coordinates);
        const latitude = coordinates.latitude;
        const longitude = coordinates.longitude;
        const newHive = {
            _id: count + 1, name: `Hive #${count + 1}`, location: {
                latitude: latitude, longitude: longitude
            }, description: "", strength: '', brood: '', images: null
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
            {showLocationsOfInterest()}
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