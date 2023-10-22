import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView, PanGestureHandler} from 'react-native-gesture-handler';
import React, {useState} from 'react';

import {Animated} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from "react-native-vector-icons/FontAwesome5";

const DATA = [
        {
            "id": 1,
            "hive": "Deer Park",
            "Task": "Feeding",
            "Expected Work Hours": 1,
            "Priority": 3,
            "recurring": true
        },
        {
            "id": 2,
            "hive": "Bloomfield",
            "Task": "Swarm Control",
            "Expected Work Hours": 2,
            "Priority": 4,
            "recurring": false
        },
        {
            "id": 3,
            "hive": "Green Valley",
            "Task": "Routine Check",
            "Expected Work Hours": 2,
            "Priority": 2,
            "recurring": true

        },
        {
            "id": 4,
            "hive": "Liberty Farms",
            "Task": "Pest and Disease Control",
            "Expected Work Hours": 3,
            "Priority": 5,
            "recurring": false
        },
        {
            "id": 5,
            "hive": "Boyers Landing",
            "Task": "Maintenance",
            "Expected Work Hours": 3,
            "Priority": 4,
            "recurring": false
        }
    ]
;

export default function TasksScreen() {
    const [data, setData] = useState(DATA);
    const [expandedTask, setExpandedTask] = useState(null);
    const dropdownAnim = useState(new Animated.Value(0))[0];


    const toggleTask = (taskId) => {
        if (expandedTask === taskId) {
            Animated.timing(dropdownAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
            setExpandedTask(null);
        } else {
            Animated.timing(dropdownAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start();
            setExpandedTask(taskId);
        }
    }

    const dropdownHeight = dropdownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // assuming each dropdown item is 100 in height
    });

    return (
        <ScrollView>
            <GestureHandlerRootView style={styles.container}>
                <Text style={styles.header}>----- Today's Tasks -----</Text>

                <DraggableFlatList
                    data={data}
                    renderItem={({item, drag, isActive}) => (
                        <PanGestureHandler onGestureEvent={drag}>
                            <View
                                onLongPress={drag}  // Use long press for dragging
                                style={[
                                    styles.item,
                                    {
                                        height: item["Expected Work Hours"] * 50,
                                        marginBottom: expandedTask === item.id ? 120 : 0
                                    }
                                ]} // Adjust the height and margin-bottom for dropdown
                            >
                                {item.recurring && (
                                    <Icon name="undo" size={20} color="grey" style={styles.badge}/>
                                )}
                                <View
                                    style={[styles.prioritySquare, {backgroundColor: getColorByPriority(item.Priority)}]}/>
                                <Text style={styles.title}>
                                    {item.Task}, </Text>
                                <Text style={styles.titlehive}>{item.hive}</Text>

                                <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.expandButton}>
                                </TouchableOpacity>

                                {expandedTask === item.id && (
                                    <Animated.View style={[styles.dropdown, {height: dropdownHeight}]}>
                                        {/* Sample dropdown tasks. Replace with your actual tasks. */}
                                        {["Task 1", "Task 2", "Task 3"].map((taskName, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    // Handle task selection logic
                                                    const newItem = {
                                                        id: data.length + 1,
                                                        hive: item.hive,
                                                        Task: taskName,
                                                        "Expected Work Hours": 2, // Default values
                                                        Priority: 3,             // Default values
                                                    };
                                                    const newData = [...data];
                                                    newData.splice(item.id, 0, newItem); // Add task below the current one
                                                    setData(newData);
                                                    toggleTask(null);  // Close dropdown
                                                }}
                                            >
                                                <Text style={styles.dropdownItem}>{taskName}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </Animated.View>
                                )}
                            </View>
                        </PanGestureHandler>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    onDragEnd={({data}) => setData(data)}
                />
                <Text style={styles.divider}>------------------------</Text>

            </GestureHandlerRootView>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingRight: 40,
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
    },
    // item: {
    //     backgroundColor: '#f9f9f9',
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ddd',
    // },
    titlehive: {
        fontSize: 16,
    },
    divider: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    active: {
        color: 'blue', // just an example, you can style the active draggable item as you wish
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        margin: 2,
        borderRadius: 5
    },
    title: {
        fontSize: 16,
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 0,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    dropdown: {
        position: 'absolute', // Positioning the dropdown absolutely
        bottom: -105, // Adjust this value to position dropdown below the item
        left: 0,
        right: 0,
        zIndex: 1, // This will ensure the dropdown appears above other items
        // backgroundColor: '#EEE',
        // shadowOffset: { width: 0, height: 5 }, // Giving shadow to the drawer effect
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
    },
    expandButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 400,
        height: 20,
        backgroundColor: "f9f9f9",
    }
    ,
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});

const getColorByPriority = (priority) => {
    // Implement the logic to return color based on priority
    if (priority === 1) return 'red';
    if (priority === 2) return 'orange';
    if (priority === 3) return 'yellow';
    return 'f9f9f9';
};