import { useRef, useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Styles } from "./styles";
import axios from "axios";


// For testing on mobile device must provide your own IP Address
import { API_URL } from "@env";

// Using state to manage the locationsOfInterest state and update it according to the concat method that is
// currently returning a new array that is the result of merging the two arrays once a new destination is clicked in the onPress event
let originLocation = [
  {
    title: "SSU Campus",
    location: {
      latitude: 38.34008053681795,
      longitude: -122.6755222789825,
    },
    description: "Charles Darwin Building",
  },
];

export default function KeeperMapView() {
  const [allHives, setAllHives] = useState([]);
  const [locationsOfInterest, setLocationsOfInterest] =
    useState(originLocation);
  const [count, setCount] = useState(0);
  // const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
  //     latitude: 38.34008053681795,
  //     longitude: -122.6755222789825
  // });
  const mapRef = useRef();

  useEffect(() => {
    // Fetching the hives data from the API endpoint using axios
    axios
    // Must be update with your own IP Address since running on mobile device
    // To remain secure using dotenv file for your own IP address
    .get(`http://${API_URL}:8000/hives`)
    .then((response) => {
        setAllHives(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the hives data", error);
      });
  }, []);

  // Map over allHives to render the Marker components
  // for each hive using the object's location coordinates along with other data to display.
  const renderHives = () => {
    return allHives.map((hive, index) => {
      return (
        <Marker
          key={index}
          coordinate={hive.location}
          title={hive.name}
          description={`Strength: ${hive.strength}`}
        />
      );
    });
  };

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
      );
    });
  };

  const takeSnapshotAndShare = async () => {
    const snapshot = await mapRef.current.takeSnapshot({
      width: 300,
      height: 300,
      result: "base64",
    });
    const uri = FileSystem.documentDirectory + "snapshot.png";
    await FileSystem.writeAsStringAsync(uri, snapshot, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await shareAsync(uri);
  };

  const addLocationOfInterest = (location) => {
    console.log(location.coordinate);
    // Geocoder.geocodePosition(position).then(res => {
    //     console.log(res);
    // }).catch(err => console.log(err))
    const newLocation = {
      title: `Hive #${count}`,
      location: {
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
      },
      description: "",
    };

    setLocationsOfInterest((prevLocations) => [...prevLocations, newLocation]);
    setCount(count + 1);
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
          latitudeDelta: 0.5,
          longitudeDelta: 0.3,
        }}
        onPress={(state) => addLocationOfInterest(state["nativeEvent"])}
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
        {/*    <Callout>*/}
        {/*        <Text>Count: {count}</Text>*/}
        {/*        <Button title='Increment Count' onPress={() => setCount(count + 1)}/>*/}
        {/*        <Button title='Take Snapshot and Share' onPress={takeSnapshotAndShare}/>*/}
        {/*    </Callout>*/}
        {/*</Marker>*/}
        {/*<Text style={styles.mapOverlay}>Longitude: {draggableMarkerCoord.longitude},*/}
        {/*    latitude: {draggableMarkerCoord.latitude}</Text>*/}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}
