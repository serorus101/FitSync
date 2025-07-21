# FitSync - 筋トレ管理アプリ

## 🎯 概要
FitSyncは、筋トレの記録と管理を行うReact Nativeアプリです。iPhone上で動作し、ワークアウトの記録、カレンダー表示、エクササイズの詳細説明などの機能を提供します。

## ✨ 主要機能

### 📱 ワークアウト記録
- **エクササイズ選択**: 事前定義されたメニューから選択
- **記録入力**: 重量、回数、セット数を入力
- **進捗管理**: セットごとの完了状況を管理
- **メモ機能**: ワークアウトにメモを追加

### 📅 カレンダー機能
- **過去記録確認**: カレンダー形式で過去のワークアウトを表示
- **日別詳細**: 特定の日のワークアウト詳細を確認
- **月間統計**: 月間のワークアウト回数と総時間を表示
- **記録マーカー**: ワークアウトした日にマーカー表示

### ℹ️ エクササイズ詳細
- **長押し機能**: エクササイズを長押しで詳細表示
- **動作説明**: エクササイズの実行手順を表示
- **対象筋肉**: ターゲットとなる筋肉を表示
- **カテゴリー分類**: 胸、背中、脚などのカテゴリー別表示

## 🚀 アプリの起動方法

### Web版での確認
```bash
cd /Users/araken101/workspace/FitSync/FitSync
npm run web
```
ブラウザで `http://localhost:8081` にアクセス

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

## 📋 使用方法

### 1. ワークアウト記録
1. **ワークアウト**タブを選択
2. エクササイズリストから種目を選択
3. 重量と回数を入力
4. セット完了後にチェックマークをタップ
5. 「セット追加」で追加セット
6. 「保存」でワークアウトを記録

### 2. 過去記録確認
1. **カレンダー**タブを選択
2. カレンダーで日付をタップ
3. その日のワークアウト詳細を確認
4. 月間統計も自動表示

### 3. エクササイズ詳細確認
1. エクササイズ選択画面でアイテムを**長押し**
2. 動作説明、対象筋肉、実行手順を確認
3. 「閉じる」でモーダルを閉じる

## 🔧 技術仕様

### フロントエンド
- **React Native**: クロスプラットフォーム開発
- **Expo**: 開発・ビルドツール
- **TypeScript**: 型安全性確保
- **React Navigation**: タブナビゲーション

### ライブラリ
- **react-native-calendars**: カレンダー表示
- **@react-native-async-storage/async-storage**: データ永続化
- **react-native-vector-icons**: アイコン表示

### テスト
- **Jest**: テストフレームワーク
- **@testing-library/react-native**: コンポーネントテスト
- **TDD**: テスト駆動開発で実装

## 📊 データ構造

### エクササイズ
```typescript
interface WorkoutExercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  targetMuscles: string[];
  description: string;
  instructionSteps: string[];
}
```

### ワークアウト記録
```typescript
interface WorkoutRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: ExerciseSet[];
  date: string;
  notes?: string;
}
```

## 🧪 テスト実行
```bash
npm test
```

## 🛠 開発者向け情報

### プロジェクト構造
```
FitSync/
├── app/(tabs)/          # タブ画面
│   ├── workout.tsx      # ワークアウト記録画面
│   └── calendar.tsx     # カレンダー画面
├── components/          # 再利用可能コンポーネント
│   ├── ExerciseSelector.tsx
│   ├── WorkoutRecorder.tsx
│   ├── WorkoutCalendar.tsx
│   └── ExerciseInstructionModal.tsx
├── types/              # TypeScript型定義
├── data/               # モックデータ
└── __tests__/          # テストファイル
```

### 新機能追加手順
1. 型定義を`types/workout.ts`に追加
2. テストケースを`__tests__/`に作成
3. コンポーネントを`components/`に実装
4. 必要に応じてタブ画面を更新

## 🎉 実装完了
✅ 全ての要件を満たしたアプリが完成  
✅ TDD開発手法で品質確保  
✅ ビルドテスト成功  
✅ iPhone対応React Nativeアプリ