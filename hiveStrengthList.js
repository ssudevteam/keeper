import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { API_URL } from "@env";

function HiveStrengthList() {
  const [allHives, setAllHives] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${API_URL}:8000/hives`)
      .then((response) => {
        const sortedHives = response.data.sort(
          (b, a) => b.strength - a.strength
        );
        Promise.all(sortedHives.map(hive => 
          axios.get(`http://${API_URL}:8000/tasks/${hive.tasks_id}`)
        )).then(taskResponses => {
          const hivesWithTasks = sortedHives.map((hive, index) => {
            return {
              ...hive,
              task: taskResponses[index].data
            }
          });
          setAllHives(hivesWithTasks);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the hives data", error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.hiveName}>{item.name}</Text>
        <Text>Strength: {item.strength}</Text>
        <Text>Sugar Syrup: {item.sugarSyrup ? "Yes" : "No"}</Text>

        {item.images && item.images.length > 0 && (
          <View style={styles.imageContainer}>
            {item.images.map((imgSrc, index) => (
              <Image
                key={index}
                source={{ uri: imgSrc }}
                style={styles.hiveImage}
                resizeMode="cover"
              />
            ))}
          </View>
        )}

        {item.task && (
          <View>
            <Text>Task Category: {item.task.category}</Text>
            <Text>Expected Work Hours: {item.task.expected_work_hours}</Text>
            <Text>Priority: {item.task.priority}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allHives}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.$oid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  hiveName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row", 
    marginTop: 10,
  },
  hiveImage: {
    width: 70, 
    height: 70, 
    marginRight: 10, 
    borderRadius: 5, 
  },
});

export default HiveStrengthList;
