import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { WorkoutExercise, ExerciseCategory } from '../types/workout';

interface ExerciseInstructionModalProps {
  exercise: WorkoutExercise | null;
  visible: boolean;
  onClose: () => void;
}

const getCategoryName = (category: ExerciseCategory): string => {
  const categoryMap = {
    [ExerciseCategory.CHEST]: '胸',
    [ExerciseCategory.BACK]: '背中',
    [ExerciseCategory.SHOULDERS]: '肩',
    [ExerciseCategory.ARMS]: '腕',
    [ExerciseCategory.LEGS]: '脚',
    [ExerciseCategory.CORE]: 'コア',
    [ExerciseCategory.CARDIO]: '有酸素',
  };
  return categoryMap[category] || category;
};

export const ExerciseInstructionModal: React.FC<ExerciseInstructionModalProps> = ({
  exercise,
  visible,
  onClose,
}) => {
  if (!exercise) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} testID="modal-backdrop">
        <View style={styles.modalContainer}>
          <Pressable onPress={() => {}} style={styles.modal}>
            <View testID="instruction-modal">
              <View style={styles.header}>
                <Text style={styles.title}>{exercise.name}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>閉じる</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content} testID="scrollable-content">
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>
                    カテゴリー: {getCategoryName(exercise.category)}
                  </Text>
                </View>

                <View style={styles.imageContainer}>
                  {exercise.imageUrl ? (
                    <Image
                      source={{ uri: exercise.imageUrl }}
                      style={styles.exerciseImage}
                      testID="exercise-image"
                    />
                  ) : (
                    <View style={styles.imagePlaceholder} testID="image-placeholder">
                      <Text style={styles.placeholderText}>画像なし</Text>
                    </View>
                  )}
                </View>

                {exercise.videoUrl && (
                  <View style={styles.videoContainer} testID="video-player">
                    <Text style={styles.videoText}>動画: {exercise.videoUrl}</Text>
                  </View>
                )}

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>説明</Text>
                  <Text style={styles.description}>{exercise.description}</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>対象筋肉</Text>
                  {exercise.targetMuscles.map((muscle, index) => (
                    <Text key={index} style={styles.muscleItem}>
                      • {muscle}
                    </Text>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>実行手順</Text>
                  {exercise.instructionSteps.map((step, index) => (
                    <Text key={index} style={styles.stepItem}>
                      {index + 1}. {step}
                    </Text>
                  ))}
                </View>

                {exercise.notes && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>注意事項</Text>
                    {exercise.notes.map((note, index) => (
                      <Text key={index} style={styles.noteItem}>
                        • {note}
                      </Text>
                    ))}
                  </View>
                )}
              </ScrollView>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  placeholderText: {
    color: '#6c757d',
  },
  videoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  videoText: {
    fontSize: 14,
    color: '#495057',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  muscleItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  stepItem: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  noteItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#dc3545',
  },
});