import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import { ExerciseSelector } from '../../components/ExerciseSelector';
import { WorkoutRecorder } from '../../components/WorkoutRecorder';
import { WorkoutExercise, WorkoutRecord, DailyWorkout } from '../../types/workout';
import { mockExercises } from '../../data/mockWorkoutData';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum AppState {
  SELECT_EXERCISE,
  RECORD_WORKOUT,
}

export default function WorkoutScreen() {
  const [appState, setAppState] = useState<AppState>(AppState.SELECT_EXERCISE);
  const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<DailyWorkout[]>([]);

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

  const saveWorkoutHistory = async (history: DailyWorkout[]) => {
    try {
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save workout history:', error);
    }
  };

  const handleExerciseSelect = (exercise: WorkoutExercise) => {
    setSelectedExercise(exercise);
    setAppState(AppState.RECORD_WORKOUT);
  };

  const handleWorkoutSave = (record: Omit<WorkoutRecord, 'id' | 'duration'>) => {
    const today = new Date().toISOString().split('T')[0];
    const recordWithId: WorkoutRecord = {
      ...record,
      id: `${Date.now()}`,
      duration: 10, // デフォルト値
    };

    const newHistory = [...workoutHistory];
    const existingWorkoutIndex = newHistory.findIndex(w => w.date === today);

    if (existingWorkoutIndex >= 0) {
      newHistory[existingWorkoutIndex].records.push(recordWithId);
      newHistory[existingWorkoutIndex].totalDuration += recordWithId.duration || 0;
    } else {
      const newDailyWorkout: DailyWorkout = {
        id: `daily-${Date.now()}`,
        date: today,
        records: [recordWithId],
        totalDuration: recordWithId.duration || 0,
        isCompleted: false,
      };
      newHistory.push(newDailyWorkout);
    }

    setWorkoutHistory(newHistory);
    saveWorkoutHistory(newHistory);
    setAppState(AppState.SELECT_EXERCISE);
    setSelectedExercise(null);
  };

  const handleWorkoutCancel = () => {
    setAppState(AppState.SELECT_EXERCISE);
    setSelectedExercise(null);
  };

  const getPreviousRecord = (exerciseId: string): WorkoutRecord | undefined => {
    const sortedHistory = [...workoutHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const dailyWorkout of sortedHistory) {
      const record = dailyWorkout.records.find(r => r.exerciseId === exerciseId);
      if (record) return record;
    }
    return undefined;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FitSync</Text>
        <Text style={styles.subtitle}>ワークアウト記録</Text>
      </View>

      {appState === AppState.SELECT_EXERCISE && (
        <ExerciseSelector
          exercises={mockExercises}
          onExerciseSelect={handleExerciseSelect}
        />
      )}

      <Modal visible={appState === AppState.RECORD_WORKOUT} animationType="slide">
        {selectedExercise && (
          <SafeAreaView style={styles.modalContainer}>
            <WorkoutRecorder
              exercise={selectedExercise}
              onSave={handleWorkoutSave}
              onCancel={handleWorkoutCancel}
              previousRecord={getPreviousRecord(selectedExercise.id)}
            />
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});