import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { WorkoutExercise, WorkoutRecord, ExerciseSet } from '../types/workout';

interface WorkoutRecorderProps {
  exercise: WorkoutExercise;
  onSave: (record: Omit<WorkoutRecord, 'id' | 'duration'>) => void;
  onCancel: () => void;
  previousRecord?: WorkoutRecord;
}

export const WorkoutRecorder: React.FC<WorkoutRecorderProps> = ({
  exercise,
  onSave,
  onCancel,
  previousRecord,
}) => {
  const [sets, setSets] = useState<Omit<ExerciseSet, 'id'>[]>([
    { weight: 0, reps: 0, completed: false },
  ]);
  const [notes, setNotes] = useState('');

  const isValidRecord = useMemo(() => {
    return sets.some(set => set.weight > 0 && set.reps > 0 && set.completed);
  }, [sets]);

  const addSet = () => {
    setSets([...sets, { weight: 0, reps: 0, completed: false }]);
  };

  const removeSet = (index: number) => {
    if (sets.length > 1) {
      setSets(sets.filter((_, i) => i !== index));
    }
  };

  const updateSet = (index: number, field: keyof Omit<ExerciseSet, 'id'>, value: any) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleSave = () => {
    if (!isValidRecord) {
      Alert.alert('エラー', '少なくとも1セットは重量・回数を入力し、完了状態にしてください。');
      return;
    }

    const completedSets = sets.filter(set => set.completed);
    const record: Omit<WorkoutRecord, 'id' | 'duration'> = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: completedSets.map((set, index) => ({
        ...set,
        id: `${exercise.id}-${index + 1}`,
      })),
      date: new Date().toISOString().split('T')[0],
      notes: notes.trim() || undefined,
    };

    onSave(record);
  };

  const formatPreviousRecord = () => {
    if (!previousRecord) return null;
    
    const setsText = previousRecord.sets
      .map(set => `${set.weight}kg × ${set.reps}回`)
      .join(', ');
    
    return `前回: ${setsText}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      
      {previousRecord && (
        <Text style={styles.previousRecord}>{formatPreviousRecord()}</Text>
      )}

      <View style={styles.setsContainer}>
        {sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <Text style={styles.setNumber}>セット {index + 1}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>重量 (kg)</Text>
              <TextInput
                style={styles.input}
                value={set.weight.toString()}
                onChangeText={(text) => updateSet(index, 'weight', parseFloat(text) || 0)}
                keyboardType="numeric"
                testID={`weight-input-${index}`}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>回数</Text>
              <TextInput
                style={styles.input}
                value={set.reps.toString()}
                onChangeText={(text) => updateSet(index, 'reps', parseInt(text) || 0)}
                keyboardType="numeric"
                testID={`reps-input-${index}`}
              />
            </View>

            <TouchableOpacity
              style={[styles.checkbox, set.completed && styles.checkboxChecked]}
              onPress={() => updateSet(index, 'completed', !set.completed)}
              testID={`checkbox-${index}`}
              accessibilityState={{ checked: set.completed }}
            >
              <Text style={[styles.checkboxText, set.completed && styles.checkboxTextChecked]}>
                ✓
              </Text>
            </TouchableOpacity>

            {sets.length > 1 && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeSet(index)}
              >
                <Text style={styles.deleteButtonText}>削除</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addSetButton} onPress={addSet}>
        <Text style={styles.addSetButtonText}>セット追加</Text>
      </TouchableOpacity>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>メモ</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="メモ（任意）"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>キャンセル</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.saveButton, !isValidRecord && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isValidRecord}
          accessibilityState={{ disabled: !isValidRecord }}
        >
          <Text style={[styles.saveButtonText, !isValidRecord && styles.saveButtonTextDisabled]}>
            保存
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  previousRecord: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  setsContainer: {
    marginBottom: 16,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  setNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 60,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  checkbox: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkboxChecked: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  checkboxText: {
    color: 'transparent',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxTextChecked: {
    color: 'white',
  },
  deleteButton: {
    marginLeft: 8,
    padding: 8,
  },
  deleteButtonText: {
    color: '#dc3545',
    fontSize: 12,
  },
  addSetButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addSetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesContainer: {
    marginBottom: 24,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonTextDisabled: {
    color: '#6c757d',
  },
});