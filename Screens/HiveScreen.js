import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
// import {  } from "react-native-gesture-handler";
import VerticalSlider from "rn-vertical-slider-matyno"; // <-- Import the VerticalSlider

export default function HiveScreen() {
    const [beeHealth, setBeeHealth] = useState(50);
    const [beeMood, setBeeMood] = useState(50);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [sliderOpacity, setSliderOpacity] = useState(1);


    const toggleDropdown = () => {
    };
    const getSliderColor = (value) => {
        if (value <= 33) {
            return 'red';
        } else if (value <= 66) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    const handleCheckIn = () => {
        setIsCheckedIn(!isCheckedIn);  // Toggle the checked in state
    };
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/hive2.png")}
                style={styles.mainImage}
            />
            <TouchableOpacity
                style={[
                    styles.checkInButton,
                    isCheckedIn && styles.checkedInButton
                ]}
                onPress={handleCheckIn}
            >
                <Icon name="check" size={25} color={isCheckedIn ? "grey" : "#FFF"}/>
                <Text style={[styles.checkInText, isCheckedIn && styles.checkedInText]}>
                    {isCheckedIn ? "Checked In" : "Check In"}
                </Text>
            </TouchableOpacity>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Beewolf Portal</Text>
                <Text style={styles.cardSubtitle}>Penngrove, CA</Text>
                <View style={styles.metricsContainer}>
                    <View style={styles.metric}>
                        <Icon2 name="pot-mix-outline" size={20} color="#000"/>
                        <Text>Honey %</Text>
                        <Text>45</Text>
                    </View>
                    <View style={styles.metric}>
                        <Icon name="smile" size={20} color="#000"/>
                        <Text>Bee Happiness</Text>
                        <Text>99</Text>
                    </View>
                    <View style={styles.metric}>
                        <Text> </Text>
                        <Text>Large Farm</Text>
                    </View>
                </View>
                <Text style={styles.cardDetails}>Common species: Colletidae.</Text>
            </View>
            {/* New Card with Vertical Sliders */}
            <View style={styles.slidersContainer}>
                <View style={[styles.sliderWrapper, {opacity: sliderOpacity}]}>
                    <Text style={{marginBottom: 10}}>
                        Bee Health: {beeHealth.toFixed(0)}%
                    </Text>
                    <VerticalSlider
                        value={beeHealth}
                        onChange={(value) => setBeeHealth(value)}
                        sliderColor={getSliderColor(beeHealth)}
                        width={80}
                        height={80}
                        step={1}
                        min={0}
                        max={100}
                        borderRadius={10}
                        onStart={() => setSliderOpacity(0.5)} // Reduce opacity when sliding starts
                        onComplete={() => setSliderOpacity(1)} // Restore opacity when sliding ends
                    />
                </View>

                <View style={styles.sliderWrapper}>
                    <Text style={{marginBottom: 10}}>
                        Bee Mood: {beeMood.toFixed(0)}%
                    </Text>
                    <VerticalSlider
                        value={beeMood}
                        onChange={(value) => setBeeMood(value)}
                        sliderColor={getSliderColor(beeHealth)}
                        width={80}
                        height={80}
                        step={1}
                        borderRadius={10}
                        min={0}
                        max={100}
                    />
                </View>
            </View>

            <TextInput
                style={styles.noteInput}
                value={noteText}
                onChangeText={setNoteText}
                placeholder="Write an observation!"
            />

            {/*Field Reports*/}
            {/* New Section for Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.tagButton}>
                    <Text style={{color: "grey"}}>Maintenance</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tagButton}>
                    <Text style={{color: "grey"}}>Health</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.photoButton}>
                    <Icon2 name="camera" size={25} color="grey"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fieldReportButton} onPress={toggleDropdown}>
                    <View style={styles.fieldReportButtonText}><Text>Post</Text></View>
                </TouchableOpacity>

            </View>

            {/* ... Rest of your components */}
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    mainImage: {
        width: "100%",
        height: "20%",
        resizeMode: "cover",
    },
    checkInButton: {
        position: "absolute",
        top: "16%",
        right: "5%",
        padding: 10,
        flexDirection: "row", // to align icon and text horizontally
        alignItems: "center",
        backgroundColor: "green",
        borderRadius: 5,
        elevation: 6,
        zIndex: 3,
        shadowColor: "#000",   // Shadow color
        shadowOffset: {
            width: 0,            // Horizontal offset
            height: 2,           // Vertical offset
        },
        shadowOpacity: 0.25,   // Shadow opacity
        shadowRadius: 3.84,
    },
    checkedInButton: {
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
    },

    checkedInText: {
        color: "grey",
    },

    checkInText: {
        color: "#FFF",
        marginLeft: 5, // a bit of space between icon and text
    },
    card: {
        width: "96%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: "#f7f7f7",
        marginTop: 10,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 16,
        color: "gray",
        marginBottom: 10,
    },
    metricsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 0,
    },
    metric: {
        flexDirection: "column",
        alignItems: "center",
    },
    cardDetails: {
        marginTop: 10,
        fontSize: 14,
    },
    slidersContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%", // this can be adjusted based on your needs
        paddingHorizontal: 20, // padding to the left and right
    },
    sliderWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10, // space between the sliders
    },
    fieldReportButton: {
        width: 80,  // Adjust as needed to match the vertical slider's width
        height: 80, // Adjust height as needed
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // Choose your desired color
        borderRadius: 40,
        borderColor: "grey",
        shadowColor: "#000",   // Shadow color
        shadowOffset: {
            width: 0,            // Horizontal offset
            height: 2,           // Vertical offset
        },
        marginLeft: 20,
        shadowOpacity: 0.25,   // Shadow opacity
        shadowRadius: 3.84,
    },
    fieldReportButtonText: {
        color: "grey", // Text color
        fontSize: 16,
    },
    dropdownContainer: {
        width: 80,  // Same width as the button
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,  // To separate options
        borderBottomColor: "#ddd",  // Light grey color for separation
    },
    noteInput: {
        width: "80%",
        height: 130,
        padding: 10,
        borderColor: "#f7f7f7",
        borderWidth: 5,
        borderRadius: 5,
        marginTop: 30,  // Adjust the spacing as needed
        backgroundColor: "white",
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    tagButton: {
        padding: 10,
        backgroundColor: "white",
        marginHorizontal: 5, // Space between the buttons
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#f7f7f7",
    },
    photoButton: {
        padding: 10,
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
    },

});
