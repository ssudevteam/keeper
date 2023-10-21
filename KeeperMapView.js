import React, {useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FlipView from 'react-native-flip-view';
import MapViewNavigation, {
    NavigationModes,
    TravelModeBox,
    TravelModes,
    DirectionsListView,
    ManeuverView,
} from 'react-native-maps-navigation';
import OptionGroup from 'react-native-optiongroup';
// import axios from "react-native/Libraries/Utilities/Dimensions";

// For testing on mobile device must provide your own IP Address
// import {API_URL} from "@env";
// import {HiveMarker} from "./HiveMarker";
// import {EventListener} from "./EventListener";
import {Styles} from "./styles";

const GOOGLE_API_KEY = "AIzaSyCF_yE-eEdmZ8a4Ndjw1QEKxC5TGBRD4eQ";

/**
 * Set to true to use the controls methods instead of props
 * @type {boolean}
 */
const USE_METHODS = false;

let originLocation = [{
    id: 0, name: "SSU Campus", location: {
        latitude: 38.34008053681795, longitude: -122.6755222789825,
    }, description: "Charles Darwin Building"
},]

const initialRegion = {
    latitude: 38.34008053681795, longitude: -122.6755222789825, latitudeDelta: 0.5, longitudeDelta: 0.3,
}

export default function KeeperMapView() {
//     const
//     [allHives
// ,
//     setAllHives
// ] =
//
//     useState(originLocation);
//
//     const
//     [locationsOfInterest
// ,
//     setLocationsOfInterest
// ] =
//
//     useState(originLocation);
//
//     const
//     [count
// ,
//     setCount
// ] =
//
//     useState(
//
//     0
// )
//     ;
    // const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    //     latitude: 38.34008053681795,
    //     longitude: -122.6755222789825
    // });

    const [allHives, setAllHives] = useState(originLocation);
    const [count, setCount] = useState(0);
    const [origin, setOrigin] = useState(initialRegion);
    const [destination, setDestination] = useState('132 Wilmot St, San Francisco, CA 94115');
    const [navigationMode, setNavigationMode] = useState(NavigationModes.IDLE);
    const [travelMode, setTravelMode] = useState(TravelModes.DRIVING);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isNavigation, setIsNavigation] = useState(false);
    const [route, setRoute] = useState(false);
    const [step, setStep] = useState(false);
    const mapRef = useRef();
    const navigationRef = useRef();

    const goDisplayRoute = () => {
        if (!validateRoute()) return;

        // There are two ways to display a route - either through the method
        // displayRoute or by setting the props.
        // The difference is that you get instant feedback when using methods vs props.

        if (USE_METHODS) {
            navigationRef.current?.displayRoute(origin, destination, {
                mode: travelMode
            }).then(route => {
                console.log(route);
            });
        } else {
            setNavigationMode(NavigationModes.ROUTE);
        }
    }

    const goNavigateRoute = () => {
        if (!validateRoute()) return;

        // There are two ways to navigate a route - either through the method
        // navigateRoute or by setting the props.
        // The difference is that you get instant feedback when using methods vs props.

        if (USE_METHODS) {
            mapRef.current?.navigateRoute(origin, destination, {
                mode: travelMode
            }).then(route => {
                setIsNavigation(true);
            });

        } else {
            setNavigationMode(NavigationModes.NAVIGATION);
        }
    }

    const validateRoute = () => {
        if (destination.length >= 3) return true;
        Alert.alert('Address required', 'You need to enter an address first');
        return false;
    }

    //
    // const
    // mapRef = useRef();
    //
    // // useEffect(() => {
    // //     // Fetching the hives data from the API endpoint using axios
    // //     axios
    // //         // Must be update with your own IP Address since running on mobile device
    // //         // To remain secure using dotenv file for your own IP address
    // //         .get(`http://192.168.86.181:8000/hives`)
    // //         .then((response) => {
    // //             setAllHives(response.data);
    // //         })
    // //         .catch((error) => {
    // //             console.error("There was an error fetching the hives data", error);
    // //         });
    // // }, []);
    //
    // // Map over allHives to render the Marker components
    // // for each hive using the object's location coordinates along with other data to display.
    // const
    // renderHives = () => {
    //     console.log('renderHives called');
    //     return allHives.map((hive, index) => {
    //         console.log(hive);
    //         return HiveMarker(index, hive);
    //     });
    // };
    //
    // const
    // onRegionChange = (region) => {
    //     console.log(region);
    // };

    // showLocationsOfInterest = () => {
    //     return locationsOfInterest.map((item, index) => {
    //         console.log(item.name);
    //         return (<Marker
    //             key={index}
    //             coordinate={item.location}
    //             title={item.name}
    //             description={item.description}
    //         >
    //             <Callout>
    //                 <Text>{item.name}</Text>
    //                 <Text>{item.description}</Text>
    //                 <Text>{`Lat: ${item.location.latitude}\nLong: ${item.location.longitude})`}</Text>
    //                 <Button title='Edit' onPress={() => null}/>
    //             </Callout>
    //         </Marker>)
    //     });
    // };
    //
    // const
    // getHiveFromLocation = (coordinates) => {
    //     if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
    //         console.error('Coordinates must have a longitude and latitude');
    //     }
    //     const latitude = coordinates.latitude;
    //     const longitude = coordinates.longitude;
    //     for (const hive of allHives) {
    //         if (hive.location.latitude === latitude && hive.location.longitude === longitude) {
    //             return hive;
    //         }
    //     }
    //     return null;
    // }

    // handleOnPress = (state) => {
    //     const event = state['nativeEvent'];
    //     if (!event) {
    //         return;
    //     }
    //     const hive = getHiveFromLocation(event.coordinate);
    //     if (hive) {
    //         // Show annotation and/or edit menu, etc.
    //         console.log(hive);
    //     } else {
    //         addHive(event.coordinate);
    //     }
    // };

    // removeHive = useCallback((id) => {
    //     console.log(`removeHive called for hive ${id}`)
    //     console.log(allHives);
    //     const index = allHives.findIndex((hive) => {
    //         console.log(hive);
    //         return hive.id === id
    //     });
    //     console.log(`${index}`)
    //     if (index !== -1) {
    //         console.log(`Removing hive ${id}`)
    //         allHives.splice(index, 1);
    //         setAllHives(allHives);
    //     }
    // }, [allHives, setAllHives]);
    //
    // addHive(coordinates) {
    //     if (!coordinates || !coordinates.longitude || !coordinates.latitude) {
    //         console.error('Coordinates must have a longitude and latitude');
    //     }
    //     console.log(coordinates);
    //     const latitude = coordinates.latitude;
    //     const longitude = coordinates.longitude;
    //     const newHive = {
    //         id: count + 1,
    //         name: `Hive #${count + 1}`,
    //         location: {
    //             latitude: latitude,
    //             longitude: longitude
    //         },
    //         description: "",
    //         strength: '',
    //         brood: '',
    //         images: null,
    //         callbacks: new EventListener(),
    //     };
    //     newHive.callbacks.add('remove', removeHive(newHive.id), [allHives, setAllHives]);
    //     setAllHives(prevHives => [...prevHives, newHive]);
    //     setCount(count + 1);
    // }

    return (
        <View style={Styles.container}>
            {isNavigation ? null : (<View>
                <Text>Where do you want to go?</Text>
                <View>
                    <TextInput onChangeText={destination =>
                        setDestination(destination)}
                               value={destination}/>
                    <TouchableOpacity onPress={() => goDisplayRoute()}>
                        <Text>{'\ue961'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goNavigateRoute()}>
                        <Text>{'\ue975'}</Text>
                    </TouchableOpacity>
                </View>
                <TravelModeBox
                    onChange={travelMode => setTravelMode(travelMode)}
                    // inverseTextColor={AppColors.background}
                />
            </View>)}
            <FlipView
                style={{flex: 1}}
                isFlipped={isFlipped}
                front={<View style={{flex: 1}}>
                    <ManeuverView
                        step={step}
                        // fontFamily={AppFonts.light}
                        // fontFamilyBold={AppFonts.bold}
                    />
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        style={Styles.map}
                        // customMapStyle={MapStyles}
                        initialRegion={initialRegion}
                    >
                        <MapViewNavigation
                            origin={origin}
                            destination={destination}
                            navigationMode={navigationMode}
                            travelMode={travelMode}
                            ref={navigationRef}
                            map={mapRef}
                            apiKey={GOOGLE_API_KEY}
                            simulate={true}
                            onRouteChange={route => setRoute(route)}
                            onStepChange={(step, nextStep) => setStep(step, nextStep)}
                            displayDebugMarkers={true}
                            onNavigationStarted={route => console.log("Navigation Started")}
                            onNavigationCompleted={route => setIsNavigation(false)}
                        />
                    </MapView>
                </View>}
                back={<View>
                    <DirectionsListView
                        // fontFamily={AppFonts.light}
                        // fontFamilyBold={AppFonts.bold}
                        route={route}
                        displayTravelMode={true}
                    />
                </View>}
            />

            <View>
                <OptionGroup
                    options={['Map', 'Directions']}
                    onChange={v => setIsFlipped(v === 1)}
                    defaultValue={0}
                    // borderColor={AppColors.foreground}
                    // inverseTextColor={AppColors.background}
                />
            </View>
        </View>)
}