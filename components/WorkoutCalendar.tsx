import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DailyWorkout, WorkoutRecord } from '../types/workout';

interface WorkoutCalendarProps {
  workoutData: DailyWorkout[];
  onDateSelect: (date: string) => void;
  selectedDate?: string;
  showStatistics?: boolean;
  theme?: 'light' | 'dark';
}

export const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({
  workoutData,
  onDateSelect,
  selectedDate,
  showStatistics = false,
  theme = 'light',
}) => {
  const markedDates = useMemo(() => {
    const marked: { [key: string]: any } = {};
    
    workoutData.forEach(workout => {
      marked[workout.date] = {
        marked: true,
        dotColor: 'green',
        selectedColor: 'green',
      };
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: '#007AFF',
      };
    }

    return marked;
  }, [workoutData, selectedDate]);

  const selectedWorkout = useMemo(() => {
    if (!selectedDate) return null;
    return workoutData.find(workout => workout.date === selectedDate);
  }, [workoutData, selectedDate]);

  const monthlyStats = useMemo(() => {
    if (!showStatistics) return null;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyWorkouts = workoutData.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate.getMonth() === currentMonth && 
             workoutDate.getFullYear() === currentYear;
    });

    const totalWorkouts = monthlyWorkouts.length;
    const totalTime = monthlyWorkouts.reduce((sum, workout) => sum + workout.totalDuration, 0);

    return { totalWorkouts, totalTime };
  }, [workoutData, showStatistics]);

  const calendarTheme = theme === 'dark' ? {
    backgroundColor: '#000000',
    calendarBackground: '#1a1a1a',
    textSectionTitleColor: '#ffffff',
    selectedDayBackgroundColor: '#0066cc',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#0066cc',
    dayTextColor: '#ffffff',
    textDisabledColor: '#666666',
    arrowColor: '#ffffff',
    monthTextColor: '#ffffff',
  } : {};

  const maxDate = new Date().toISOString().split('T')[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const formatSetInfo = (record: WorkoutRecord) => {
    return record.sets
      .map(set => `${set.weight}kg × ${set.reps}回`)
      .join(', ');
  };

  return (
    <View style={styles.container}>
      <Calendar
        testID="workout-calendar"
        onDayPress={(day) => onDateSelect(day.dateString)}
        markedDates={markedDates}
        maxDate={maxDate}
        theme={calendarTheme}
        enableSwipeMonths={true}
      />

      {showStatistics && monthlyStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>今月の統計</Text>
          <Text style={styles.statsText}>今月のワークアウト: {monthlyStats.totalWorkouts}回</Text>
          <Text style={styles.statsText}>総時間: {monthlyStats.totalTime}分</Text>
        </View>
      )}

      {selectedDate && (
        <ScrollView style={styles.detailContainer}>
          <Text style={styles.detailTitle}>
            {formatDate(selectedDate)}のワークアウト
          </Text>
          
          {selectedWorkout ? (
            <View>
              <Text style={styles.summaryText}>
                総時間: {selectedWorkout.totalDuration}分
              </Text>
              
              {selectedWorkout.records.map((record, index) => (
                <View key={record.id} style={styles.recordItem}>
                  <Text style={styles.exerciseName}>{record.exerciseName}</Text>
                  <Text style={styles.setInfo}>{formatSetInfo(record)}</Text>
                  {record.notes && (
                    <Text style={styles.notes}>メモ: {record.notes}</Text>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>
              この日はワークアウトの記録がありません
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  detailContainer: {
    flex: 1,
    padding: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 16,
  },
  recordItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  setInfo: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  notes: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  noDataText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 32,
  },
});