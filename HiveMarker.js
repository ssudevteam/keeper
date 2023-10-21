import {Callout, Marker} from "react-native-maps";
import {Button, Text} from "react-native";

export const HiveMarker = (key, hiveProps) => {
    const {
        id,
        name,
        location,
        description,
        strength,
        brood,
        images,
    } = hiveProps

    return (
        <Marker
            key={key}
            id={id}
            coordinate={location}
            // title={name}
            // description={description}
        >
            <Callout>
                {name && <Text>{`Name: ${name}`}</Text>}
                {description && <Text>{`Description: ${description}`}</Text>}
                {brood && <Text>{`Brood: ${brood}`}</Text>}
                {strength && <Text>{`Strength: ${strength}`}</Text>}
                {images && <Text>{`Images: ${images}`}</Text>}
                {location &&
                    <Text>{`Lat: ${location.latitude}\nLong: ${location.longitude}`}</Text>}
                <Button title='Edit' onPress={() => null}/>
            </Callout>
        </Marker>
    );
};
