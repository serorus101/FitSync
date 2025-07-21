import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { WorkoutCalendar } from '../../components/WorkoutCalendar';
import { DailyWorkout } from '../../types/workout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalendarScreen() {
  const [workoutHistory, setWorkoutHistory] = useState<DailyWorkout[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadWorkoutHistory();
  }, []);

  const loadWorkoutHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('workoutHistory');
      if (stored) {
        setWorkoutHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load workout history:', error);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WorkoutCalendar
        workoutData={workoutHistory}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        showStatistics={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});