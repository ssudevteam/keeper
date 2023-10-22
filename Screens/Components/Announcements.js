import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Carousel from 'react-native-snap-carousel';

export default function MyComponent() {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselItems = [
        { type: 'announcement', name: "Bob Supervisor", title: "First order of beezknees", timestamp: "30 minutes ago" },
        { type: 'progress', projectName: "Upgrade Bee Homes at Family Farms", daysLeft: 4 },
        { type: 'progress', projectName: "Apply Medicine at Honey Ranch", daysLeft: 1 }
    ];

    const renderItem = ({item, index}) => {
        if (item.type === 'announcement') {
            return (
                <View style={styles.card}>
                    <Image source={require('../../assets/images/profilepic.png')} style={styles.profilePic} />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.card}>
                    <Image 
                      source={item.projectName === "Apply Medicine at Honey Ranch" 
                        ? require('../../assets/images/2.png') 
                        : require('../../assets/images/project1.png')} 
                      style={styles.projectIcon} 
                    />
                    <View style={styles.progressContainer}>
                        <Text style={styles.projectName}>{item.projectName}</Text>
                        <View style={styles.progressBar}>
                            <View style={{
                                ...styles.progress, 
                                width: `${(7 - item.daysLeft) / 7 * 100}%`,
                                backgroundColor: item.projectName === "Apply Medicine at Honey Ranch" ? '#94C973' : '#4a90e2' // Condition to change color
                            }} />
                        </View>
                        <Text style={styles.daysLeft}>{item.daysLeft}d</Text>
                    </View>
                </View>
            );
        }
    };

    return (
        <View>
            <Carousel
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={330}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 5,
        height: 100,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginRight: 30,
        marginLeft: -20
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#d0d0d0',
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: '#a0a0a0',
    },
    projectIcon: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    progressContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    projectName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 5,
        backgroundColor: '#d0d0d0',
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 5,
    },
    progress: {
        backgroundColor: '#4a90e2',
        borderRadius: 3,
        height: 5,
    },
    daysLeft: {
        fontSize: 12,
        color: '#a0a0a0',
    }
});
