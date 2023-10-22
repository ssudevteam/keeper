import {Callout, Marker} from "react-native-maps";
import {Button, Text} from "react-native";

export const HiveMarker = (key, hiveProps, distance) => {
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
        >
            <Callout>
                {name && <Text>{`Name: ${name}`}</Text>}
                {description && <Text>{`Description: ${description}`}</Text>}
                {brood && <Text>{`Brood: ${brood}`}</Text>}
                {strength && <Text>{`Strength: ${strength}`}</Text>}
                {images && images.length > 0 && <Text>{`Images: ${images.length}`}</Text>}
                <Text>Distance: {distance}</Text>
                <Button title='Edit' onPress={() => null}/>
            </Callout>
        </Marker>
    );
}
