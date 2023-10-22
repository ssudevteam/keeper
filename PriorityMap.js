import { useEffect, useRef, useState } from "react";
import MapView, {
  Callout,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Button, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Styles } from "./styles";
import { decode } from "@googlemaps/polyline-codec";
import axios from "axios";

// For testing on mobile device must provide your own IP Address
import { API_URL } from "@env";
import { HiveMarker } from "./HiveMarker";
import { hives } from "./database/hives.json";

const GOOGLE_API_KEY = "AIzaSyCF_yE-eEdmZ8a4Ndjw1QEKxC5TGBRD4eQ";

const sortMapAscending = (map) => {
  return new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
};

let originLocation = [
  {
    name: "SSU Campus",
    location: {
      latitude: 38.34008053681795,
      longitude: -122.6755222789825,
    },
    description: "Charles Darwin Building",
  },
];

const Treeify = (map) => {
  const nodes = [];
  const edges = [];

  map.forEach((value, key) => {
    nodes.push({ key, visited: false });
    edges.push({ key, distance: false });
  });
};

export default function PriorityMap({selectedHives}) {
  const [distances, setDistances] = useState(new Map()); // New state to store distances
  const [allHives, setAllHives] = useState(selectedHives);
  const [locations, setLocations] = useState(originLocation);
  const [optimalRoutes, setOptimalRoutes] = useState(null);
  const [polyLines, setPolyLines] = useState([]);
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
      coordinates.push({ id: id, coordinates: hive.location });
    });
    return coordinates;
  };

  const fetchDistances = async () => {
    const hiveCoords = getAllHiveCoordinates();
    const polyMap = new Map();
    let distanceMap = new Map();
    const origin = `${originLocation[0].location.latitude},${originLocation[0].location.longitude}`;

    const promises = hiveCoords.map(async (hive) => {
      const dest = `${hive.coordinates.latitude},${hive.coordinates.longitude}`;
      try {
        const resp = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${GOOGLE_API_KEY}`
        );
        const respJson = await resp.json();
        const defaultRoute = respJson.routes[0];
        const polyLine = defaultRoute.overview_polyline;
        const encodedLine = polyLine["points"];
        const decodedLine = decode(encodedLine);
        polyMap.set(hive.id, []);
        decodedLine.forEach((pair) => {
          const coords = {
            latitude: pair[0],
            longitude: pair[1],
          };
          polyMap.get(hive.id).push(coords);
        });

        const legs = defaultRoute.legs;
        let distance = 0;
        legs.forEach((leg) => {
          distance += leg.distance.value; // Value is in meters
        });
        distanceMap.set(hive.id, distance);
      } catch (error) {
        console.log("Error: ", error);
      }
    });

    await Promise.all(promises);
    setPolyLines(polyMap);
    distanceMap = sortMapAscending(distanceMap);
    return distanceMap;
  };

  const createRoutes = () => {};

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
    console.log("renderHives called");
    return allHives.map((hive, index) => {
      const id = hive.hasOwnProperty("$oid") ? hive._id.$oid : hive._id;
      const distance = distances.get(id) || "Calculating...";
      return HiveMarker(index, hive, distance);
    });
  };

  const renderPolyLines = () => {
    const allLines = [];
    let key = 0;
    polyLines.forEach((allPoints, id) => {
      allLines.push(
        <Polyline
          key={key}
          coordinates={allPoints}
          strokeWidth={3}
          strokeColor={"rgba(0,122,255,0.7)"}
        />
      );
      key += 1;
    });
    return allLines;
  };

  useEffect(() => {
    fetchDistances().then((distanceMap) => {
      setOptimalRoutes(distanceMap);
      setDistances(distanceMap); // Update the distances state
    });
  }, [allHives]);

  const onRegionChange = (region) => {
    console.log(region);
  };

  const showLocationsOfInterest = () => {
    return locations.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.name}
          description={item.description}
        >
          <Callout>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{`Lat: ${item.location.latitude}\nLong: ${item.location.longitude})`}</Text>
            <Button title="Edit" onPress={() => null} />
          </Callout>
        </Marker>
      );
    });
  };

  const getHiveFromLocation = (coordinates) => {
    if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
      console.error("Coordinates must have a longitude and latitude");
    }
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    for (const hive of allHives) {
      if (
        hive.location.latitude === latitude &&
        hive.location.longitude === longitude
      ) {
        return hive;
      }
    }
    return null;
  };

  const handleOnPress = async (state) => {
    const event = state.nativeEvent;
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
      console.error("Coordinates must have a longitude and latitude");
    }
    console.log(coordinates);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const newHive = {
      _id: count + 1,
      name: `Hive #${count + 1}`,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      description: "",
      strength: "",
      brood: "",
      images: null,
    };
    setAllHives((prevHives) => [...prevHives, newHive]);
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
        onPress={handleOnPress}
      >
        {showLocationsOfInterest()}
        {renderHives()}
        {renderPolyLines()}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}
