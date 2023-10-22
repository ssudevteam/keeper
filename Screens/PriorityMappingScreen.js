import React from 'react';
import { View, Text } from 'react-native';
import { useHiveContext } from '../HiveProvider'; // Import the context hook
import PriorityMap from '../PriorityMap';

function PriorityMapping() {
  const { selectedHiveIds } = useHiveContext(); // Use the context
  console.log(selectedHiveIds);

  return (
    <PriorityMap selectedHives={selectedHiveIds}/>
  );
}

export default PriorityMapping;
