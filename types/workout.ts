export interface WorkoutExercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  targetMuscles: string[];
  description: string;
  instructionSteps: string[];
  imageUrl?: string;
  videoUrl?: string;
  notes?: string[];
}

export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface WorkoutRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: ExerciseSet[];
  date: string;
  duration?: number;
  notes?: string;
}

export interface DailyWorkout {
  id: string;
  date: string;
  records: WorkoutRecord[];
  totalDuration: number;
  isCompleted: boolean;
}

export enum ExerciseCategory {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  ARMS = 'arms',
  LEGS = 'legs',
  CORE = 'core',
  CARDIO = 'cardio',
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number;
}