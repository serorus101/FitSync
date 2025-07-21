import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ExerciseInstructionModal } from '../../components/ExerciseInstructionModal';
import { mockExercises } from '../../data/mockWorkoutData';

describe('ExerciseInstructionModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('モーダルが非表示の場合、何も表示されない', () => {
    const { queryByText } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={false}
        onClose={mockOnClose}
      />
    );

    expect(queryByText('ベンチプレス')).toBeNull();
  });

  test('モーダルが表示される', () => {
    const { getByText } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByText('ベンチプレス')).toBeTruthy();
    expect(getByText('胸の筋肉を主に鍛える基本的な種目')).toBeTruthy();
  });

  test('ターゲット筋肉が表示される', () => {
    const { getByText } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByText('対象筋肉')).toBeTruthy();
    expect(getByText('大胸筋')).toBeTruthy();
    expect(getByText('三角筋前部')).toBeTruthy();
    expect(getByText('上腕三頭筋')).toBeTruthy();
  });

  test('実行手順が表示される', () => {
    const { getByText } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByText('実行手順')).toBeTruthy();
    expect(getByText('1. ベンチに仰向けになり、肩甲骨を寄せる')).toBeTruthy();
    expect(getByText('2. バーを肩幅より少し広めに握る')).toBeTruthy();
    expect(getByText('3. 胸にバーを下ろす')).toBeTruthy();
    expect(getByText('4. 胸から真上にバーを押し上げる')).toBeTruthy();
  });

  test('エクササイズ画像が表示される', () => {
    const { getByTestId } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    const image = getByTestId('exercise-image');
    expect(image.props.source.uri).toContain('bench_press.png');
  });

  test('閉じるボタンが動作する', () => {
    const { getByText } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByText('閉じる'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('モーダル背景をタップして閉じる', () => {
    const { getByTestId } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByTestId('modal-backdrop'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('動画URLがある場合、動画プレーヤーが表示される', () => {
    const exerciseWithVideo = {
      ...mockExercises[0],
      videoUrl: 'bench_press_video.mp4'
    };

    const { getByTestId } = render(
      <ExerciseInstructionModal 
        exercise={exerciseWithVideo}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByTestId('video-player')).toBeTruthy();
  });

  test('画像がない場合、プレースホルダーが表示される', () => {
    const exerciseWithoutImage = {
      ...mockExercises[0],
      imageUrl: undefined
    };

    const { getByTestId } = render(
      <ExerciseInstructionModal 
        exercise={exerciseWithoutImage}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByTestId('image-placeholder')).toBeTruthy();
  });

  test('カテゴリーが表示される', () => {
    const { getByText } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByText('カテゴリー: 胸')).toBeTruthy();
  });

  test('スクロール可能なコンテンツが表示される', () => {
    const { getByTestId } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByTestId('scrollable-content')).toBeTruthy();
  });

  test('アニメーション効果が適用される', async () => {
    const { getByTestId, rerender } = render(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={false}
        onClose={mockOnClose}
      />
    );

    rerender(
      <ExerciseInstructionModal 
        exercise={mockExercises[0]}
        visible={true}
        onClose={mockOnClose}
      />
    );

    await waitFor(() => {
      const modal = getByTestId('instruction-modal');
      expect(modal).toBeTruthy();
    });
  });

  test('注意事項が表示される', () => {
    const exerciseWithNotes = {
      ...mockExercises[0],
      notes: ['正しいフォームを保つ', '呼吸を止めない']
    };

    const { getByText } = render(
      <ExerciseInstructionModal 
        exercise={exerciseWithNotes}
        visible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByText('注意事項')).toBeTruthy();
    expect(getByText('正しいフォームを保つ')).toBeTruthy();
    expect(getByText('呼吸を止めない')).toBeTruthy();
  });
});