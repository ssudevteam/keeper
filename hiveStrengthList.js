import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import { useHiveContext } from './HiveProvider'; // Import the context hook

function HiveStrengthList() {
  const [allHives, setAllHives] = useState([]);
  const { setSelectedHiveIds, selectedHiveIds } = useHiveContext(); // Destructure selectedHiveIds from context
  const navigation = useNavigation();



  useEffect(() => {
    async function fetchHives() {
      try {
        const response = await axios.get(`http://${API_URL}:8000/hives`);
        const sortedHives = response.data.sort(
          (a, b) =>
            a.distanceFromOrigin / a.strength -
            b.distanceFromOrigin / b.strength
        );

        const hivesWithTasks = await Promise.all(
          sortedHives.map(async (hive) => {
            try {
              const taskResponse = await axios.get(
                `http://${API_URL}:8000/tasks/${hive.tasks_id}`
              );
              return { ...hive, task: taskResponse.data };
            } catch (error) {
              console.error(
                `Error fetching task data for hive ${hive.name}:`,
                error
              );
              return hive; // Return hive without task data
            }
          })
        );

        setAllHives(hivesWithTasks);
      } catch (error) {
        console.error("Error fetching hives data:", error);
      }
    }

    fetchHives();
  }, []);

  const handleSelectHive = (hiveId) => {
    setSelectedHiveIds((prevHiveIds) => {
      const newSelectedHiveIds = prevHiveIds.includes(hiveId)
        ? prevHiveIds.filter((id) => id !== hiveId)
        : [...prevHiveIds, hiveId];
      return newSelectedHiveIds;
    });
  };

  const renderItem = ({ item }) => {
    const priorityEstimate = item.distanceFromOrigin / item.strength;
    const isSelected = selectedHiveIds.includes(item._id);

    return (
      <TouchableOpacity onPress={() => handleSelectHive(item._id)}>
        <View style={[styles.listItem, isSelected && styles.selectedItem]}>
          {isSelected && (
            <View style={styles.arrowWrapper}>
              <Text style={styles.arrow}>▲</Text>
            </View>
          )}
          <Text style={styles.hiveName}>{item.name}</Text>
          <Text>Strength: {item.strength}</Text>
          <Text>Priority Estimate: {priorityEstimate.toFixed(2)}</Text>
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={allHives} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </View>
  );
}

const styles = StyleSheet.create({
  selectedItem: {
    borderColor: "green",
    borderWidth: 2,
  },
  arrowWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "green",
    padding: 2,
    borderRadius: 10,
  },
  arrow: {
    color: "white",
    fontSize: 16,
  },
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
  redirectButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  redirectButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default HiveStrengthList;
