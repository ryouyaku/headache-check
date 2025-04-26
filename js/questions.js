// 質問データと頭痛タイプの定義

// 質問リスト - 2問のみの簡潔な質問設計
const questions = [
    {
        id: 1,
        text: "頭痛が特に起こりやすい時間帯を教えてください。",
        options: [
            { text: "朝", value: "1" },
            { text: "日中", value: "2" },
            { text: "夕方", value: "3" },
            { text: "夜間", value: "4" }
        ]
    },
    {
        id: 2,
        text: "頭痛で特に痛くなりやすい部位を教えてください。",
        options: [
            { text: "こめかみ", value: "1" },
            { text: "頭頂部", value: "2" },
            { text: "後頭部", value: "3" },
            { text: "前頭部", value: "4" }
        ]
    }
];

// 頭痛タイプの定義
const headacheTypes = {
    "1-1": {
        name: "歯ぎしり・副鼻腔炎型頭痛",
        description: "朝にこめかみの周辺の痛みを感じやすいタイプです。歯ぎしりをしていたり、副鼻腔炎などの炎症が潜んでいるかも。",
        immediateAdvice: [
            "頭皮をマッサージするように流す",
            "迎香、攅竹を指圧する"
        ],
        longTermAdvice: [
            "歯科にて歯ぎしりのチェックをしてもらう",
            "耳鼻科で副鼻腔炎の診察を受ける",
            "歯ぎしりの原因になるストレスを解放"
        ],
        recommendedLink: "https://youtu.be/Pt24GCU1Ilc",
        recommendTitle: "副鼻腔炎頭痛",
        typeImage: "type1.png"
    },
    "1-2": {
        name: "月経・気圧変動型頭痛",
        description: "朝に頭頂部の痛みを感じやすいタイプです。月経周期や気圧の変化が影響しているかも。",
        immediateAdvice: [
            "頭頂部のマッサージ",
            "梅商番茶などお腹を温める飲み物を摂る",
            "月経を軽くするためのツボ"
        ],
        longTermAdvice: [
            "月経周期に合わせたケア",
            "胃腸を調えるケア"
        ],
        recommendedLink: "https://youtu.be/R288b0vOKvg",
        recommendTitle: "胃のあたため",
        typeImage: "type2.png"
    },
    "1-3": {
        name: "夜間の姿勢の緊張、睡眠の質低下型頭痛",
        description: "朝に後頭部の痛みを感じやすいタイプです。夜間、寝ている間の緊張が取れていなかったり、睡眠自体の質が低下しているかも。",
        immediateAdvice: [
            "寝る前に背中を温める",
            "枕に頭を押し付けるストレッチ"
        ],
        longTermAdvice: [
            "背中をほぐせる青竹踏みを継続する",
            "睡眠がとれていなければ受診でチェックを"
        ],
        recommendedLink: "https://youtu.be/HIuFSUnCY24",
        recommendTitle: "睡眠の質",
        typeImage: "type3.png"
    },
    "1-4": {
        name: "不安・緊張、鼻の症状による頭痛",
        description: "朝に前頭部の痛みを感じやすいタイプです。緊張が強く、不安があったり気が高ぶっているかも。",
        immediateAdvice: [
            "頭皮マッサージ",
            "片足立ち深呼吸",
            "迎香、攅竹の指圧"
        ],
        longTermAdvice: [
            "緊張するシーンでの思考の転換",
            "日々、脱力する週間をつける",
            "耳鼻科で鼻水の症状をチェック"
        ],
        recommendedLink: "https://youtu.be/65UaEcK4zdk",
        recommendTitle: "簡単に氣を下げる",
        typeImage: "type1.png"
    },
    "2-1": {
        name: "お出かけ、会議などの緊張型頭痛",
        description: "日中、こめかみの周辺の痛みを感じやすいタイプです。お出かけや会議などで緊張が強くなってるかも。",
        immediateAdvice: [
            "お出かけ前にアイゾーンを指でほぐす",
            "休憩時間に目を閉じてリセット"
        ],
        longTermAdvice: [
            "お出かけは計画的に、事前にアイゾーンをほぐす",
            "もぐさアイマスク使用して睡眠をとる"
        ],
        recommendedLink: "https://youtu.be/yglo92A2BA8",
        recommendTitle: "もぐさアイマスク",
        typeImage: "type2.png"
    },
    "2-2": {
        name: "気圧・気温変動型頭痛",
        description: "日中、頭頂部の痛みを感じやすいタイプです。気圧の変動や気温が上がったなどの影響かも。",
        immediateAdvice: [
            "頭頂部をマッサージ",
            "熱の出入りがある首をマッサージ"
        ],
        longTermAdvice: [
            "梅商番茶などで胃を調える",
            "日々首筋をマッサージでほぐしておく"
        ],
        recommendedLink: "https://youtu.be/G5PB5ebXcYg",
        recommendTitle: "たわしマッサージ",
        typeImage: "type3.png"
    },
    "2-3": {
        name: "同じ姿勢からの背中の凝り型頭痛",
        description: "日中、後頭部の痛みを感じやすいタイプです。同じ姿勢などが原因で背中に負担がかかり、凝りが生じているかも。",
        immediateAdvice: [
            "脇の下ほぐし",
            "硬い床の上で数分間脱力"
        ],
        longTermAdvice: [
            "姿勢の矯正",
            "日々青竹踏みを継続"
        ],
        recommendedLink: "https://youtu.be/2ZVgdjD0SQI",
        recommendTitle: "脇の下ほぐし",
        typeImage: "type1.png"
    },
    "2-4": {
        name: "お出かけ、人との関わりの緊張型頭痛",
        description: "日中、前頭部に痛みがでやすいタイプです。お出かけの疲れや、人との関わりの緊張による血流不全がおきているかも。",
        immediateAdvice: [
            "胃を指圧してほぐす",
            "深呼吸をする"
        ],
        longTermAdvice: [
            "日頃から片足立ち深呼吸を取り入れる",
            "人との関わりでの思考転換"
        ],
        recommendedLink: "https://youtu.be/qpot1YmJQRc",
        recommendTitle: "胃の指圧",
        typeImage: "type2.png"
    },
    "3-1": {
        name: "長時間の目の酷使型頭痛",
        description: "夕方、こめかみに痛みがでやすいタイプです。お仕事などによる精神的ストレスや、目を酷使したことでの緊張がおこってるかも。",
        immediateAdvice: [
            "短時間でも目を瞑って休息を",
            "もぐさアイマスクで緊張緩和",
            "目の周りや首をマッサージ"
        ],
        longTermAdvice: [
            "日々の頭皮マッサージ",
            "寝る前に肝臓を温める"
        ],
        recommendedLink: "https://youtu.be/yglo92A2BA8",
        recommendTitle: "もぐさアイマスク",
        typeImage: "type3.png"
    },
    "3-2": {
        name: "疲労、むくみ型頭痛",
        description: "夕方、頭頂部に痛みがでやすいタイプです。疲労が溜まっていたり、水分の滞りがあるかも。",
        immediateAdvice: [
            "頭頂部マッサージ",
            "胃のあたため",
            "梅商番茶をのむ"
        ],
        longTermAdvice: [
            "胃腸の強化",
            "むくみやすい食べ物の摂り方を調整"
        ],
        recommendedLink: "https://youtu.be/xbR80HaCJFU",
        recommendTitle: "食べ物の性質",
        typeImage: "type1.png"
    },
    "3-3": {
        name: "首と背中の緊張型頭痛",
        description: "夕方、後頭部に痛みがでやすいタイプです。お仕事や長時間の姿勢などで首に負担がかかったり、背中、腰の緊張が強くなってるかも。",
        immediateAdvice: [
            "帰宅後、硬い床で脱力",
            "背中を温める",
            "身体の前を伸ばすストレッチ"
        ],
        longTermAdvice: [
            "青竹踏みの継続",
            "姿勢の大きな歪みがないかチェックも必要"
        ],
        recommendedLink: "https://youtu.be/HLjjFXBKfd0",
        recommendTitle: "短時間リセット",
        typeImage: "type2.png"
    },
    "3-4": {
        name: "眼精疲労型頭痛（前頭部）",
        description: "夕方に前頭部の痛みを感じやすいタイプです。目の疲れが額部分の痛みとして現れやすくなります。",
        immediateAdvice: [
            "目を閉じて休める",
            "額の軽いマッサージ",
            "冷たいタオルで目を覆う"
        ],
        longTermAdvice: [
            "画面との適切な距離の維持",
            "目の体操の習慣化",
            "照明環境の改善"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example12",
        recommendTitle: "目の疲れ解消法",
        typeImage: "type3.png"
    },
    "4-1": {
        name: "冷え・副鼻腔炎型頭痛",
        description: "夜間にこめかみの痛みを感じやすいタイプです。頭部の冷えや副鼻腔炎が関連していることが多いです。",
        immediateAdvice: [
            "こめかみを温める",
            "鼻を温かい蒸気で温める",
            "温かい飲み物を飲む"
        ],
        longTermAdvice: [
            "就寝時の保温対策",
            "耳鼻科での副鼻腔チェック",
            "入浴習慣の見直し"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example13",
        recommendTitle: "鼻腔ケアグッズ",
        typeImage: "type1.png"
    },
    "4-2": {
        name: "イベント疲れ型頭痛",
        description: "夜間に頭頂部の痛みを感じやすいタイプです。日中のイベントや活動による疲れが蓄積し、夜に症状として現れます。",
        immediateAdvice: [
            "頭皮マッサージ",
            "アロマテラピー（ラベンダーなど）",
            "リラックスした入浴"
        ],
        longTermAdvice: [
            "活動と休息のバランス管理",
            "睡眠の質向上",
            "ストレス管理テクニック"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example14",
        recommendTitle: "質の良い睡眠のための音楽",
        typeImage: "type2.png"
    },
    "4-3": {
        name: "凝り蓄積型頭痛",
        description: "夜間に後頭部の痛みを感じやすいタイプです。日中の凝りが蓄積し、夜に痛みとして感じられることが多いです。",
        immediateAdvice: [
            "後頭部と首のマッサージ",
            "温めるシート貼付",
            "入浴でのリラックス"
        ],
        longTermAdvice: [
            "定期的なストレッチ",
            "寝具の見直し",
            "マッサージや整体の利用検討"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example15",
        recommendTitle: "首こり解消グッズ",
        typeImage: "type3.png"
    },
    "4-4": {
        name: "ストレス蓄積型頭痛",
        description: "夜間に前頭部の痛みを感じやすいタイプです。日中のストレスが蓄積して夜に前頭部の痛みとして表れることが多いです。",
        immediateAdvice: [
            "額と眉間のマッサージ",
            "リラックス呼吸法",
            "温かいハーブティー"
        ],
        longTermAdvice: [
            "瞑想習慣の取り入れ",
            "就寝前のデジタルデトックス",
            "ストレス発散方法の確立"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example16",
        recommendTitle: "ストレス解消瞑想ガイド",
        typeImage: "type1.png"
    }
};
