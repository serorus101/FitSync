import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { WorkoutCalendar } from '../../components/WorkoutCalendar';
import { mockDailyWorkouts } from '../../data/mockWorkoutData';

describe('WorkoutCalendar', () => {
  const mockOnDateSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('カレンダーが表示される', () => {
    const { getByTestId } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
      />
    );

    expect(getByTestId('workout-calendar')).toBeTruthy();
  });

  test('ワークアウトが記録された日にマーカーが表示される', () => {
    const { getByTestId } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
      />
    );

    const calendar = getByTestId('workout-calendar');
    expect(calendar.props.markedDates).toEqual({
      '2025-07-20': { marked: true, dotColor: 'green', selectedColor: 'green' },
      '2025-07-19': { marked: true, dotColor: 'green', selectedColor: 'green' }
    });
  });

  test('日付をタップすると選択される', () => {
    const { getByTestId } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
      />
    );

    const calendar = getByTestId('workout-calendar');
    fireEvent(calendar, 'onDayPress', { dateString: '2025-07-20' });

    expect(mockOnDateSelect).toHaveBeenCalledWith('2025-07-20');
  });

  test('選択された日の詳細が表示される', () => {
    const { getByText } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
        selectedDate="2025-07-20"
      />
    );

    expect(getByText('2025年7月20日のワークアウト')).toBeTruthy();
    expect(getByText('ベンチプレス')).toBeTruthy();
    expect(getByText('スクワット')).toBeTruthy();
    expect(getByText('総時間: 27分')).toBeTruthy();
  });

  test('ワークアウトの記録がない日の詳細表示', () => {
    const { getByText } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
        selectedDate="2025-07-18"
      />
    );

    expect(getByText('2025年7月18日のワークアウト')).toBeTruthy();
    expect(getByText('この日はワークアウトの記録がありません')).toBeTruthy();
  });

  test('エクササイズの詳細が表示される', () => {
    const { getByText } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
        selectedDate="2025-07-20"
      />
    );

    expect(getByText('60kg × 10回')).toBeTruthy();
    expect(getByText('65kg × 8回')).toBeTruthy();
    expect(getByText('70kg × 6回')).toBeTruthy();
  });

  test('月の変更が反映される', () => {
    const { getByTestId } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
      />
    );

    const calendar = getByTestId('workout-calendar');
    fireEvent(calendar, 'onMonthChange', { month: 8, year: 2025 });

    expect(getByTestId('workout-calendar')).toBeTruthy();
  });

  test('未来の日付は選択できない', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];

    const { getByTestId } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
      />
    );

    const calendar = getByTestId('workout-calendar');
    expect(calendar.props.maxDate).toBeTruthy();
  });

  test('ワークアウト統計が表示される', () => {
    const { getByText } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
        showStatistics={true}
      />
    );

    expect(getByText('今月のワークアウト: 2回')).toBeTruthy();
    expect(getByText('総時間: 47分')).toBeTruthy();
  });

  test('カレンダーのテーマが適用される', () => {
    const { getByTestId } = render(
      <WorkoutCalendar 
        workoutData={mockDailyWorkouts}
        onDateSelect={mockOnDateSelect}
        theme="dark"
      />
    );

    const calendar = getByTestId('workout-calendar');
    expect(calendar.props.theme).toEqual({
      backgroundColor: '#000000',
      calendarBackground: '#1a1a1a',
      textSectionTitleColor: '#ffffff',
      selectedDayBackgroundColor: '#0066cc',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#0066cc',
      dayTextColor: '#ffffff',
      textDisabledColor: '#666666',
      arrowColor: '#ffffff',
      monthTextColor: '#ffffff'
    });
  });
});