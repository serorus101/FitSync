import { WorkoutExercise, ExerciseCategory, WorkoutRecord, DailyWorkout } from '../types/workout';

export const mockExercises: WorkoutExercise[] = [
  {
    id: '1',
    name: 'ベンチプレス',
    category: ExerciseCategory.CHEST,
    targetMuscles: ['大胸筋', '三角筋前部', '上腕三頭筋'],
    description: '胸の筋肉を主に鍛える基本的な種目',
    instructionSteps: [
      'ベンチに仰向けになり、肩甲骨を寄せる',
      'バーを肩幅より少し広めに握る',
      '胸にバーを下ろす',
      '胸から真上にバーを押し上げる'
    ],
    imageUrl: 'bench_press.png'
  },
  {
    id: '2',
    name: 'スクワット',
    category: ExerciseCategory.LEGS,
    targetMuscles: ['大腿四頭筋', '大臀筋', 'ハムストリング'],
    description: '下半身全体を鍛える基本種目',
    instructionSteps: [
      '足を肩幅に開く',
      '胸を張り、背筋を伸ばす',
      '太ももが床と平行になるまで腰を下ろす',
      'かかとで床を押すように立ち上がる'
    ],
    imageUrl: 'squat.png'
  },
  {
    id: '3',
    name: 'デッドリフト',
    category: ExerciseCategory.BACK,
    targetMuscles: ['広背筋', '僧帽筋', 'ハムストリング', '大臀筋'],
    description: '背中と下半身を同時に鍛える複合種目',
    instructionSteps: [
      'バーベルの前に立つ',
      '腰幅で足を開き、バーを握る',
      '胸を張り、背筋を真っ直ぐに保つ',
      '腰と膝を同時に伸ばしてバーを持ち上げる'
    ],
    imageUrl: 'deadlift.png'
  },
  {
    id: '4',
    name: 'プランク',
    category: ExerciseCategory.CORE,
    targetMuscles: ['腹直筋', '腹横筋', '腹斜筋'],
    description: '体幹を強化する静的種目',
    instructionSteps: [
      'うつ伏せになり、肘とつま先で体を支える',
      '頭から足まで一直線を保つ',
      '腹筋に力を入れて姿勢をキープ',
      '呼吸を止めずに維持する'
    ],
    imageUrl: 'plank.png'
  },
  // 背中の種目
  {
    id: '5',
    name: 'ラットプルダウン',
    category: ExerciseCategory.BACK,
    targetMuscles: ['広背筋', '大円筋', '僧帽筋中部', '上腕二頭筋'],
    description: '背中の幅を広げる代表的な種目',
    instructionSteps: [
      'シートに座り、太ももをパッドで固定する',
      'バーを肩幅より広めに握る',
      '胸を張り、肩甲骨を寄せながらバーを胸上部まで引く',
      'ゆっくりとバーを元の位置に戻す'
    ],
    imageUrl: 'lat_pulldown.png'
  },
  {
    id: '6',
    name: 'シーテッドロー',
    category: ExerciseCategory.BACK,
    targetMuscles: ['広背筋', '菱形筋', '僧帽筋中部', '後部三角筋'],
    description: '背中の厚みを作る基本種目',
    instructionSteps: [
      'シートに座り、足をプレートに置く',
      'ケーブルハンドルを両手で握る',
      '胸を張り、肩甲骨を寄せながら肘を後ろに引く',
      'ゆっくりと元の位置に戻す'
    ],
    imageUrl: 'seated_row.png'
  },
  {
    id: '7',
    name: 'ベントオーバーローイング',
    category: ExerciseCategory.BACK,
    targetMuscles: ['広背筋', '菱形筋', '僧帽筋', '後部三角筋'],
    description: '背中全体を鍛える複合種目',
    instructionSteps: [
      'バーベルを肩幅で握り、膝を軽く曲げる',
      '背中を真っ直ぐに保ちながら腰を45度程度前に倒す',
      '肩甲骨を寄せながらバーをみぞおちに向けて引く',
      '背中の筋肉の収縮を意識して1秒停止',
      'バーが膝を通らないようにゆっくりと戻す'
    ],
    imageUrl: 'bent_over_row.png'
  },
  // 胸の種目
  {
    id: '8',
    name: 'ダンベルフライ',
    category: ExerciseCategory.CHEST,
    targetMuscles: ['大胸筋', '前部三角筋'],
    description: '胸筋のストレッチを重視した種目',
    instructionSteps: [
      'ベンチに仰向けになり、両手にダンベルを持つ',
      '軽く肘を曲げ、腕を大きく広げる',
      '胸筋のストレッチを感じながら下ろす',
      '胸筋の収縮を意識してダンベルを上げる'
    ],
    imageUrl: 'dumbbell_fly.png'
  },
  {
    id: '9',
    name: 'チェストプレス',
    category: ExerciseCategory.CHEST,
    targetMuscles: ['大胸筋', '前部三角筋', '上腕三頭筋'],
    description: 'マシンで安全に胸筋を鍛える種目',
    instructionSteps: [
      'マシンのシートに座り、背中をパッドに付ける',
      'ハンドルを胸の高さで握る',
      '胸筋を意識しながらハンドルを前方に押す',
      'ゆっくりと元の位置に戻す'
    ],
    imageUrl: 'chest_press.png'
  },
  {
    id: '10',
    name: 'ペクトラルフライ',
    category: ExerciseCategory.CHEST,
    targetMuscles: ['大胸筋', '前部三角筋'],
    description: '胸筋の内側を重点的に鍛える種目',
    instructionSteps: [
      'マシンのシートに座り、背中をパッドに付ける',
      '両腕でパッドを挟むように握る',
      '胸筋の収縮を意識して腕を内側に寄せる',
      'ゆっくりと元の位置に戻す'
    ],
    imageUrl: 'pectoral_fly.png'
  },
  // 肩の種目
  {
    id: '11',
    name: 'ラテラルレイズ',
    category: ExerciseCategory.SHOULDERS,
    targetMuscles: ['中部三角筋'],
    description: '肩幅を広げる代表的な種目',
    instructionSteps: [
      '両手に軽めのダンベルを持ち、体の横に下ろす',
      '肘を軽く曲げた状態を維持し、肩の高さまで横に上げる',
      '肩がすくまないよう注意し、中部三角筋の収縮を意識',
      '上げた位置で1秒停止し、ゆっくりと元の位置に戻す',
      '反動を使わず、コントロールした動作を心がける'
    ],
    imageUrl: 'lateral_raise.png'
  },
  {
    id: '12',
    name: 'サイドレイズ',
    category: ExerciseCategory.SHOULDERS,
    targetMuscles: ['中部三角筋', '前部三角筋'],
    description: '肩の側面を鍛える基本種目',
    instructionSteps: [
      'ダンベルを両手に持ち、親指を少し下向きにして体の横に構える',
      '肘を軽く曲げた状態で、腕全体を肩の高さまで持ち上げる',
      '小指側が親指側より少し高くなるようにダンベルを上げる',
      '三角筋の収縮を意識して1秒停止する',
      '筋肉の緊張を保ちながらゆっくりとコントロールして下ろす'
    ],
    imageUrl: 'side_raise.png'
  },
  {
    id: '13',
    name: 'ローテーターカフ',
    category: ExerciseCategory.SHOULDERS,
    targetMuscles: ['棘上筋', '棘下筋', '小円筋', '肩甲下筋'],
    description: '肩関節の安定性を向上させる種目',
    instructionSteps: [
      '軽いダンベルを片手に持ち、肘を90度に曲げて脇に固定する',
      '上腕を体にしっかりと付けたまま、前腕だけを外側に回転させる',
      '可動域の限界まで回転させ、1秒停止する',
      'ゆっくりとコントロールしながら元の位置まで内側に戻す',
      '肩関節周りの小さな筋肉の働きを意識して行う'
    ],
    imageUrl: 'rotator_cuff.png'
  },
  // 腕の種目（上腕二頭筋）
  {
    id: '14',
    name: 'インクラインダンベルカール',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕二頭筋', '腕橈骨筋'],
    description: '上腕二頭筋のストレッチを重視したカール',
    instructionSteps: [
      'インクラインベンチ（30-45度）に座り、背中をしっかりと付ける',
      'ダンベルを両手に持ち、腕を自然に垂らした状態でスタート',
      '上腕を固定したまま、肘を曲げてダンベルを肩に向けて上げる',
      '上腕二頭筋の最大収縮を意識し、1秒停止する',
      '筋肉の緊張を保ちながら、ゆっくりと元の位置まで戻す'
    ],
    imageUrl: 'incline_dumbbell_curl.png'
  },
  {
    id: '15',
    name: 'アームカール',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕二頭筋', '腕橈骨筋'],
    description: '上腕二頭筋を鍛える基本種目',
    instructionSteps: [
      'ダンベルを両手に持ち、足を肩幅に開いて立つ',
      '上腕を体の横に固定し、肘の位置を動かさないよう意識',
      '前腕だけを動かし、ダンベルを肩に向けて巻き上げる',
      '上腕二頭筋の収縮を最大限に感じて1秒停止',
      '重力に逆らいながらゆっくりと元の位置に戻す'
    ],
    imageUrl: 'arm_curl.png'
  },
  {
    id: '16',
    name: 'インクラインアームカール',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕二頭筋', '腕橈骨筋'],
    description: 'インクラインベンチを使った上腕二頭筋種目',
    instructionSteps: [
      'インクラインベンチ（30-45度）に座り、背中をしっかりとパッドに付ける',
      'ダンベルを両手に持ち、腕を自然に垂らして完全にストレッチした状態を作る',
      '肘の位置を固定したまま、上腕二頭筋の力でダンベルを肩に向けて巻き上げる',
      '最大収縮位置で上腕二頭筋を強く収縮させ、1-2秒間停止する',
      'ネガティブ動作を意識して、重力に逆らいながらゆっくりと元の位置まで戻す'
    ],
    imageUrl: 'incline_arm_curl.png'
  },
  // 腕の種目（上腕三頭筋）
  {
    id: '17',
    name: 'ロープレスダウン',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕三頭筋'],
    description: 'ケーブルマシンで上腕三頭筋を鍛える種目',
    instructionSteps: [
      'ケーブルマシンのロープを両手でしっかりと握り、肩幅に足を開いて立つ',
      '肘を体の横にしっかりと固定し、上腕が床と平行になるようにセットする',
      '前腕だけを動かし、肘を完全に伸ばしながらロープを太ももの横まで押し下げる',
      '最下点でロープの端を左右に広げ、上腕三頭筋を最大収縮させて1秒停止',
      '上腕三頭筋の緊張を保ちながら、ゆっくりとコントロールして元の位置に戻す'
    ],
    imageUrl: 'rope_press_down.png'
  },
  {
    id: '18',
    name: 'ライイングエクステンション',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕三頭筋'],
    description: '仰向けで行う上腕三頭筋種目',
    instructionSteps: [
      'ベンチに仰向けになり、バーベルを胸の上でしっかりと握る',
      '上腕を垂直に保ち、肘の位置を固定したまま前腕だけを動かす準備をする',
      '肘を曲げながらバーを額の少し上方向にゆっくりと下ろしていく',
      '上腕三頭筋のストレッチを十分に感じたら、1秒間静止する',
      '上腕三頭筋の力のみを使い、肘を伸ばしてバーを元の位置まで押し上げる'
    ],
    imageUrl: 'lying_extension.png'
  },
  {
    id: '19',
    name: 'フレンチプレス',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕三頭筋'],
    description: '座位または立位で行う上腕三頭筋種目',
    instructionSteps: [
      'ダンベルを両手でプレート部分を下から支えるように持ち、頭上に構える',
      '上腕を垂直に保ち、肘を頭の近くに固定して肩幅程度に開く',
      '前腕だけを動かし、肘を曲げてダンベルを頭の後ろに向けてゆっくり下ろす',
      '上腕三頭筋の十分なストレッチを感じた位置で1-2秒間停止する',
      '上腕三頭筋の力で肘を伸ばし、ダンベルを元の頭上の位置まで押し上げる'
    ],
    imageUrl: 'french_press.png'
  },
  {
    id: '20',
    name: 'リバースプッシュアップ',
    category: ExerciseCategory.ARMS,
    targetMuscles: ['上腕三頭筋', '前部三角筋'],
    description: '自重で上腕三頭筋を鍛える種目',
    instructionSteps: [
      'ベンチに背を向けて座り、手をベンチの端に肩幅で置いて体を支える',
      '足を前方に伸ばし、かかとで床を支えながら腰をベンチから浮かせる',
      '肘を後方に曲げながら、腰を真下に向けてゆっくりと体を下ろす',
      '上腕三頭筋のストレッチを十分に感じたら、1秒間その位置を保持する',
      '上腕三頭筋の力で肘を伸ばし、体を元の開始位置まで押し上げる'
    ],
    imageUrl: 'reverse_pushup.png'
  },
  // コア（腹筋）の種目
  {
    id: '21',
    name: 'アブドミナル',
    category: ExerciseCategory.CORE,
    targetMuscles: ['腹直筋', '腹斜筋'],
    description: 'マシンを使った腹筋トレーニング',
    instructionSteps: [
      'アブドミナルマシンのシートに座り、背中をしっかりとパッドに付ける',
      '胸パッドを適切な高さに調整し、両手でハンドルをしっかりと握る',
      '腹筋を意識しながら、上体を前方に向けてゆっくりと倒していく',
      '腹直筋の最大収縮を感じた位置で1-2秒間停止する',
      '腹筋の緊張を保ちながら、重量に逆らってコントロールしながら元の位置に戻す'
    ],
    imageUrl: 'abdominal.png'
  },
  {
    id: '22',
    name: 'トーソローテーション',
    category: ExerciseCategory.CORE,
    targetMuscles: ['腹斜筋', '腹横筋'],
    description: '体幹の回旋動作を鍛える種目',
    instructionSteps: [
      'トーソローテーションマシンに正しく座り、背中と腰をしっかりとパッドに密着させる',
      '胸パッドを適切な高さに調整し、両手でハンドルを握って上半身を固定する',
      '下半身は動かさずに、腹斜筋の力のみで上半身を一方向にゆっくりと回転させる',
      '回転動作の限界点で腹斜筋の収縮を意識して1-2秒間停止する',
      '同じ軌道を辿りながら腹斜筋の緊張を保って、コントロールしながら元の中心位置に戻す'
    ],
    imageUrl: 'torso_rotation.png'
  }
];

export const mockWorkoutRecords: WorkoutRecord[] = [
  {
    id: '1',
    exerciseId: '1',
    exerciseName: 'ベンチプレス',
    sets: [
      { id: '1-1', weight: 60, reps: 10, completed: true },
      { id: '1-2', weight: 65, reps: 8, completed: true },
      { id: '1-3', weight: 70, reps: 6, completed: true }
    ],
    date: '2025-07-20',
    duration: 15,
    notes: '調子良好'
  },
  {
    id: '2',
    exerciseId: '2',
    exerciseName: 'スクワット',
    sets: [
      { id: '2-1', weight: 80, reps: 12, completed: true },
      { id: '2-2', weight: 85, reps: 10, completed: true },
      { id: '2-3', weight: 90, reps: 8, completed: true }
    ],
    date: '2025-07-20',
    duration: 12
  }
];

export const mockDailyWorkouts: DailyWorkout[] = [
  {
    id: '1',
    date: '2025-07-20',
    records: mockWorkoutRecords,
    totalDuration: 27,
    isCompleted: true
  },
  {
    id: '2',
    date: '2025-07-19',
    records: [
      {
        id: '3',
        exerciseId: '3',
        exerciseName: 'デッドリフト',
        sets: [
          { id: '3-1', weight: 100, reps: 5, completed: true },
          { id: '3-2', weight: 110, reps: 3, completed: true }
        ],
        date: '2025-07-19',
        duration: 20
      }
    ],
    totalDuration: 20,
    isCompleted: true
  }
];