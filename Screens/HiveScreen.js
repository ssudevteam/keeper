import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import VerticalSlider from "rn-vertical-slider-matyno"; // <-- Import the VerticalSlider

export default function HiveScreen() {
  const [beeHealth, setBeeHealth] = useState(50);
  const [beeMood, setBeeMood] = useState(50);

  const handleCheckIn = () => {
    // Add your check-in functionality here
    console.log("Checked in!");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/hive2.png")}
        style={styles.mainImage}
      />
      <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
        <Icon name="check" size={25} color="#FFF" />
        <Text style={styles.checkInText}>Check In</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Beewolf Portal</Text>
        <Text style={styles.cardSubtitle}>Penngrove, CA</Text>
        <View style={styles.metricsContainer}>
          <View style={styles.metric}>
            <Icon2 name="pot-mix-outline" size={20} color="#000" />
            <Text>Honey %</Text>
            <Text>45</Text>
          </View>
          <View style={styles.metric}>
            <Icon name="smile" size={20} color="#000" />
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
        <View style={styles.sliderWrapper}>
          <Text style={{ marginBottom: 10 }}>
            Bee Health: {beeHealth.toFixed(0)}%
          </Text>
          <VerticalSlider
            value={beeHealth}
            onChange={(value) => setBeeHealth(value)}
            width={80}
            height={80}
            step={1}
            min={0}
            max={100}
            borderRadius={10}
          />
        </View>

        <View style={styles.sliderWrapper}>
          <Text style={{ marginBottom: 10 }}>
            Bee Mood: {beeMood.toFixed(0)}%
          </Text>
          <VerticalSlider
            value={beeMood}
            onChange={(value) => setBeeMood(value)}
            width={80}
            height={80}
            step={1}
            borderRadius={10}
            min={0}
            max={100}
          />
        </View>
      </View>
      
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
  checkInText: {
    color: "#FFF",
    marginLeft: 5, // a bit of space between icon and text
  },
  card: {
    width: "96%",
    padding: 20,
    backgroundColor: "#f7f7f7",
    marginTop: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  metric: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardDetails: {
    fontSize: 14,
  },
  slidersContainer: {
    marginTop: 20,
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
});
