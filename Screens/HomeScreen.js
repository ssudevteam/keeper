import {
    Badge,
    Button,
    Colors,
    Image,
    Text,
    View,
} from "react-native-ui-lib";

import Announcements from "../Screens/Components/Announcements.js";
import React from "react";
import {ScrollView} from "react-native";

export default function HomeScreen() {
    return (
        <ScrollView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flex: 1, backgroundColor: "white"}}>
                <View style={{margin: 20}}>
                    {/* Header */}
                    <View
                        marginT-30
                        marginB-10
                        style={{flexDirection: "row", justifyContent: "flex-end"}}
                    >
                        <Image
                            source={require("../assets/images/chaticon.png")}
                            style={{width: 38, height: 38}}
                        />
                    </View>

                    <Announcements/>

                    {/* Promo Section */}
                    <View style={{alignItems: "center", marginTop: 25}}>
                        <Image
                            source={require("../assets/images/map.png")}
                            style={{
                                borderRadius: 10,
                                width: "100%",
                                height: 250,
                                resizeMode: "cover",
                            }}
                        />
                        {/* <Button
              label='Go To Location'
              backgroundColor={Colors.black}
              style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}  // position the button over the image
            /> */}
                    </View>
                    {/* Daily Goals */}
                    <View
                        br30 // Rounded corners
                        padding-20 // Internal padding
                        backgroundColor="white"
                        margin-5
                        marginT-40
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            elevation: 5,
                            shadowColor: "#000"
                        }}
                    >
                        <View flex={0.8}>
                            <Text text50 bold marginB-10>
                                Daily Goals
                            </Text>
                            <Badge
                                label={" 1/5 "}
                                size={26}
                                backgroundColor={Colors.rgba("#dab600", 1)}
                                marginV-5
                            />
                            <Text text80 marginL-10 marginV-10>
                                Your tasks are...
                            </Text>

                            <Button
                                label="All Tasks"
                                backgroundColor="#18191a"
                                labelStyle={{color: "#fff"}}
                                borderRadius={30}
                                style={{width: 120, alignSelf: "left"}}
                            />
                        </View>
                        <View flex={0.2}>

                            <Image
                                source={require("../assets/images/beekeeper.png")}
                                style={{
                                    width: 120,
                                    height: 120,
                                    alignSelf: "center",
                                    marginTop: 10,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
