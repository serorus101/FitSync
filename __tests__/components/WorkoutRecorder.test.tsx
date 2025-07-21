import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { WorkoutRecorder } from '../../components/WorkoutRecorder';
import { mockExercises } from '../../data/mockWorkoutData';

describe('WorkoutRecorder', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('選択されたエクササイズ名が表示される', () => {
    const { getByText } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(getByText('ベンチプレス')).toBeTruthy();
  });

  test('初期状態で1セットが表示される', () => {
    const { getByDisplayValue } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(getByDisplayValue('0')).toBeTruthy(); // 重量
    expect(getByDisplayValue('0')).toBeTruthy(); // 回数
  });

  test('重量と回数を入力できる', () => {
    const { getByTestId } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const weightInput = getByTestId('weight-input-0');
    const repsInput = getByTestId('reps-input-0');

    fireEvent.changeText(weightInput, '60');
    fireEvent.changeText(repsInput, '10');

    expect(weightInput.props.value).toBe('60');
    expect(repsInput.props.value).toBe('10');
  });

  test('セットを追加できる', () => {
    const { getByText, getByTestId } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('セット追加'));

    expect(getByTestId('weight-input-1')).toBeTruthy();
    expect(getByTestId('reps-input-1')).toBeTruthy();
  });

  test('セットを削除できる', () => {
    const { getByText, queryByTestId } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('セット追加'));
    expect(queryByTestId('weight-input-1')).toBeTruthy();

    fireEvent.press(getByText('削除'));
    expect(queryByTestId('weight-input-1')).toBeNull();
  });

  test('セットを完了状態にできる', () => {
    const { getByTestId } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const checkbox = getByTestId('checkbox-0');
    fireEvent.press(checkbox);

    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  test('有効な記録を保存できる', async () => {
    const { getByText, getByTestId } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.changeText(getByTestId('weight-input-0'), '60');
    fireEvent.changeText(getByTestId('reps-input-0'), '10');
    fireEvent.press(getByTestId('checkbox-0'));

    fireEvent.press(getByText('保存'));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        exerciseId: '1',
        exerciseName: 'ベンチプレス',
        sets: [
          {
            weight: 60,
            reps: 10,
            completed: true
          }
        ],
        date: expect.any(String),
        notes: ''
      });
    });
  });

  test('無効な記録では保存ボタンが無効化される', () => {
    const { getByText } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const saveButton = getByText('保存');
    expect(saveButton.props.accessibilityState.disabled).toBe(true);
  });

  test('メモを入力できる', () => {
    const { getByPlaceholderText } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const notesInput = getByPlaceholderText('メモ（任意）');
    fireEvent.changeText(notesInput, 'フォームに注意');

    expect(notesInput.props.value).toBe('フォームに注意');
  });

  test('キャンセルボタンが動作する', () => {
    const { getByText } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('キャンセル'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('前回の記録が表示される', () => {
    const previousRecord = {
      id: '1',
      exerciseId: '1',
      exerciseName: 'ベンチプレス',
      sets: [
        { id: '1-1', weight: 60, reps: 10, completed: true },
        { id: '1-2', weight: 65, reps: 8, completed: true }
      ],
      date: '2025-07-19'
    };

    const { getByText } = render(
      <WorkoutRecorder 
        exercise={mockExercises[0]}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        previousRecord={previousRecord}
      />
    );

    expect(getByText('前回: 60kg × 10回, 65kg × 8回')).toBeTruthy();
  });
});