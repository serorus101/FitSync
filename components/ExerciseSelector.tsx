import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { WorkoutExercise, ExerciseCategory } from '../types/workout';
import { ExerciseInstructionModal } from './ExerciseInstructionModal';

interface ExerciseSelectorProps {
  exercises: WorkoutExercise[];
  onExerciseSelect: (exercise: WorkoutExercise) => void;
  selectedCategory?: string;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  exercises,
  onExerciseSelect,
  selectedCategory,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise | null>(null);
  const [showModal, setShowModal] = useState(false);

  const sectionsData = useMemo(() => {
    const categoryNames = {
      [ExerciseCategory.CHEST]: '胸',
      [ExerciseCategory.BACK]: '背中',
      [ExerciseCategory.SHOULDERS]: '肩',
      [ExerciseCategory.ARMS]: '腕',
      [ExerciseCategory.LEGS]: '脚',
      [ExerciseCategory.CORE]: 'コア',
      [ExerciseCategory.CARDIO]: '有酸素',
    };
    // フィルタリング処理
    const filteredExercises = exercises.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = !selectedCategory || exercise.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 部位ごとにグループ化
    const groupedByCategory: { [key: string]: WorkoutExercise[] } = {};
    filteredExercises.forEach((exercise) => {
      if (!groupedByCategory[exercise.category]) {
        groupedByCategory[exercise.category] = [];
      }
      groupedByCategory[exercise.category].push(exercise);
    });

    // SectionList用のデータ形式に変換
    return Object.keys(groupedByCategory)
      .map((category) => ({
        title: categoryNames[category as ExerciseCategory] || category,
        data: groupedByCategory[category],
      }))
      .filter((section) => section.data.length > 0);
  }, [exercises, searchText, selectedCategory]);

  const handleLongPress = (exercise: WorkoutExercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  const renderExerciseItem = ({ item }: { item: WorkoutExercise }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => onExerciseSelect(item)}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.targetMuscles}>
        {item.targetMuscles.join(', ')}
      </Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  if (sectionsData.length === 0) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="エクササイズを検索"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Text style={styles.emptyMessage}>エクササイズが見つかりません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="エクササイズを検索"
        value={searchText}
        onChangeText={setSearchText}
      />
      <SectionList
        sections={sectionsData}
        renderItem={renderExerciseItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        style={styles.list}
        stickySectionHeadersEnabled={true}
      />
      <ExerciseInstructionModal
        exercise={selectedExercise}
        visible={showModal}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  exerciseItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  targetMuscles: {
    fontSize: 14,
    color: '#6c757d',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 50,
  },
  sectionHeader: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 8,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});