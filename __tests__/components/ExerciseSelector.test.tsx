import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ExerciseSelector } from '../../components/ExerciseSelector';
import { mockExercises } from '../../data/mockWorkoutData';

describe('ExerciseSelector', () => {
  const mockOnExerciseSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('エクササイズリストが正しく表示される', () => {
    const { getByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    expect(getByText('ベンチプレス')).toBeTruthy();
    expect(getByText('スクワット')).toBeTruthy();
    expect(getByText('デッドリフト')).toBeTruthy();
    expect(getByText('プランク')).toBeTruthy();
  });

  test('エクササイズをタップすると選択される', () => {
    const { getByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    fireEvent.press(getByText('ベンチプレス'));
    expect(mockOnExerciseSelect).toHaveBeenCalledWith(mockExercises[0]);
  });

  test('カテゴリーごとにエクササイズがフィルタリングされる', () => {
    const { getByText, queryByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect}
        selectedCategory="chest"
      />
    );

    expect(getByText('ベンチプレス')).toBeTruthy();
    expect(queryByText('スクワット')).toBeNull();
  });

  test('検索機能が正しく動作する', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    const searchInput = getByPlaceholderText('エクササイズを検索');
    fireEvent.changeText(searchInput, 'ベンチ');

    expect(getByText('ベンチプレス')).toBeTruthy();
    expect(queryByText('スクワット')).toBeNull();
  });

  test('長押しでエクササイズの詳細が表示される', async () => {
    const { getByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    fireEvent(getByText('ベンチプレス'), 'longPress');

    await waitFor(() => {
      expect(getByText('胸の筋肉を主に鍛える基本的な種目')).toBeTruthy();
      expect(getByText('ベンチに仰向けになり、肩甲骨を寄せる')).toBeTruthy();
    });
  });

  test('詳細モーダルが閉じられる', async () => {
    const { getByText, queryByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    fireEvent(getByText('ベンチプレス'), 'longPress');

    await waitFor(() => {
      expect(getByText('閉じる')).toBeTruthy();
    });

    fireEvent.press(getByText('閉じる'));

    await waitFor(() => {
      expect(queryByText('胸の筋肉を主に鍛える基本的な種目')).toBeNull();
    });
  });

  test('エクササイズのターゲット筋肉が表示される', () => {
    const { getByText } = render(
      <ExerciseSelector 
        exercises={mockExercises} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    expect(getByText('大胸筋, 三角筋前部, 上腕三頭筋')).toBeTruthy();
  });

  test('空のエクササイズリストの場合、適切なメッセージが表示される', () => {
    const { getByText } = render(
      <ExerciseSelector 
        exercises={[]} 
        onExerciseSelect={mockOnExerciseSelect} 
      />
    );

    expect(getByText('エクササイズが見つかりません')).toBeTruthy();
  });
});