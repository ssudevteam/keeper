import {useRef, useState} from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import * as FileSystem from "expo-file-system";
import {shareAsync} from "expo-sharing";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Styles} from "./styles";

let locationsOfInterest = [
    {
        title: "First",
        location: {
            latitude: -27.2,
            longitude: 145
        },
        description: "My First Marker"
    },
    {
        title: "Second",
        location: {
            latitude: -30.2,
            longitude: 150
        },
        description: "My Second Marker"
    }
]

export default function KeeperMapView() {
    const [count, setCount] = useState(0);
    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        latitude: 38.34008053681795,
        longitude: -122.6755222789825
    });
    const mapRef = useRef();

    const onRegionChange = (region) => {
        console.log(region);
    };

    const showLocationsOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                />
            )
        });
    };

    const takeSnapshotAndShare = async () => {
        const snapshot = await mapRef.current.takeSnapshot({width: 300, height: 300, result: 'base64'});
        const uri = FileSystem.documentDirectory + "snapshot.png";
        await FileSystem.writeAsStringAsync(uri, snapshot, {encoding: FileSystem.EncodingType.Base64});
        await shareAsync(uri);
    };

    return (
        <View style={Styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={Styles.map}
                onRegionChange={onRegionChange}
                initialRegion={{
                    latitude: 38.34008053681795,
                    longitude: -122.6755222789825,
                    latitudeDelta: 27.499085419977938,
                    longitudeDelta: 15.952148000000022,
                }}
                // customMapStyle={mapJson}
            >
                {showLocationsOfInterest()}
                <Marker
                    draggable
                    pinColor='#0000ff'
                    coordinate={draggableMarkerCoord}
                    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                />
                {/*<Marker*/}
                {/*    pinColor='#00ff00'*/}
                {/*    coordinate={{latitude: -35, longitude: 147}}*/}
                {/*>*/}
                {/*    <Callout>*/}
                {/*        <Text>Count: {count}</Text>*/}
                {/*        <Button title='Increment Count' onPress={() => setCount(count + 1)}/>*/}
                {/*        <Button title='Take Snapshot and Share' onPress={takeSnapshotAndShare}/>*/}
                {/*    </Callout>*/}
                {/*</Marker>*/}
                {/*<Text style={styles.mapOverlay}>Longitude: {draggableMarkerCoord.longitude},*/}
                {/*    latitude: {draggableMarkerCoord.latitude}</Text>*/}
            </MapView>
            <StatusBar style="auto"/>
        </View>
    );
}