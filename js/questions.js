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
        description: "朝にこめかみ周辺の痛みを感じやすいタイプです。歯ぎしりや副鼻腔炎が原因となっていることが多く見られます。",
        immediateAdvice: [
            "温かいタオルでこめかみを温める",
            "鼻を温めるマスクを使用する",
            "ゆっくりとした深呼吸を行う"
        ],
        longTermAdvice: [
            "歯科医に歯ぎしりのチェックを依頼する",
            "耳鼻科で副鼻腔炎の診察を受ける",
            "マウスピースの使用を検討する"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example1",
        recommendTitle: "歯ぎしり防止マウスピース",
        typeImage: "type1.png"
    },
    "1-2": {
        name: "月経・気圧変動型頭痛",
        description: "朝に頭頂部の痛みを感じやすいタイプです。月経周期や気圧の変化が影響していることが多いです。",
        immediateAdvice: [
            "頭頂部のやさしいマッサージ",
            "温かい飲み物を摂取する",
            "リラックスできる音楽を聴く"
        ],
        longTermAdvice: [
            "月経周期と頭痛の関係を記録する",
            "婦人科での相談を検討する",
            "気圧変化に備えて水分をしっかり摂る"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example2",
        recommendTitle: "ホルモンバランスを整えるストレッチ",
        typeImage: "type2.png"
    },
    "1-3": {
        name: "睡眠姿勢・睡眠質低下型頭痛",
        description: "朝に後頭部の痛みを感じやすいタイプです。寝ている間の姿勢の緊張や睡眠の質低下が原因となることが多いです。",
        immediateAdvice: [
            "後頭部のストレッチを行う",
            "首のマッサージをゆっくり行う",
            "温かいシャワーを後頭部に当てる"
        ],
        longTermAdvice: [
            "枕の高さや硬さを見直す",
            "就寝前のリラックス習慣を作る",
            "睡眠環境（温度・湿度・光）の改善"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example3",
        recommendTitle: "快眠サポート枕",
        typeImage: "type3.png"
    },
    "1-4": {
        name: "不安・緊張・鼻症状型頭痛",
        description: "朝に前頭部の痛みを感じやすいタイプです。不安や緊張、鼻の症状が関連していることが多いです。",
        immediateAdvice: [
            "額の軽いマッサージ",
            "蒸しタオルで顔を温める",
            "鼻通りを良くする深呼吸"
        ],
        longTermAdvice: [
            "ストレス管理テクニックを学ぶ",
            "アロマセラピーの活用",
            "耳鼻科での鼻症状チェック"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example4",
        recommendTitle: "不安軽減リラクゼーション",
        typeImage: "type1.png"
    },
    "2-1": {
        name: "緊張性頭痛（外出・会議型）",
        description: "日中にこめかみの痛みを感じやすいタイプです。外出や会議などでの緊張が原因となることが多いです。",
        immediateAdvice: [
            "こめかみをやさしく円を描くようにマッサージ",
            "5分間の休憩と水分補給",
            "目を閉じて深呼吸"
        ],
        longTermAdvice: [
            "定期的な小休憩の習慣化",
            "リラクゼーション技術の習得",
            "十分な水分摂取"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example5",
        recommendTitle: "オフィスでできるリラクゼーション",
        typeImage: "type2.png"
    },
    "2-2": {
        name: "気圧・気温変動型頭痛",
        description: "日中に頭頂部の痛みを感じやすいタイプです。気圧や気温の変化が影響していることが多いです。",
        immediateAdvice: [
            "頭皮マッサージで血行促進",
            "水分をしっかり摂る",
            "必要に応じて室温調整"
        ],
        longTermAdvice: [
            "気象変化と頭痛の関係を記録する",
            "天気予報をチェックして備える",
            "帽子や保温グッズの活用"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example6",
        recommendTitle: "気象病対策グッズ",
        typeImage: "type3.png"
    },
    "2-3": {
        name: "姿勢起因型頭痛",
        description: "日中に後頭部の痛みを感じやすいタイプです。同じ姿勢での作業による背中への負担が原因となることが多いです。",
        immediateAdvice: [
            "背筋を伸ばす軽いストレッチ",
            "肩甲骨周りのマッサージ",
            "姿勢を変えて休憩"
        ],
        longTermAdvice: [
            "エルゴノミクスチェアの検討",
            "定期的な姿勢チェックの習慣化",
            "背中の筋肉強化エクササイズ"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example7",
        recommendTitle: "デスクワーク姿勢改善グッズ",
        typeImage: "type1.png"
    },
    "2-4": {
        name: "社交不安型頭痛",
        description: "日中に前頭部の痛みを感じやすいタイプです。人との関わりやお出かけでの緊張が影響していることが多いです。",
        immediateAdvice: [
            "前頭部の軽いタッピング",
            "一時的に静かな場所で休憩",
            "水分補給と深呼吸"
        ],
        longTermAdvice: [
            "マインドフルネス瞑想の習慣化",
            "適度な社交のペース配分",
            "認知行動療法の検討"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example8",
        recommendTitle: "社交不安軽減テクニック",
        typeImage: "type2.png"
    },
    "3-1": {
        name: "眼精疲労型頭痛（こめかみ）",
        description: "夕方にこめかみの痛みを感じやすいタイプです。長時間の目の酷使が原因となることが多いです。",
        immediateAdvice: [
            "目を温める（蒸しタオルなど）",
            "20-20-20ルール（20分ごとに20フィート先を20秒見る）",
            "こめかみのツボ押し"
        ],
        longTermAdvice: [
            "ブルーライトカットメガネの使用",
            "定期的な眼科検診",
            "PCやスマホの画面設定の見直し"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example9",
        recommendTitle: "目の疲れ軽減アイマスク",
        typeImage: "type3.png"
    },
    "3-2": {
        name: "疲労・むくみ型頭痛",
        description: "夕方に頭頂部の痛みを感じやすいタイプです。日中の疲労蓄積やむくみが関連していることが多いです。",
        immediateAdvice: [
            "足を高くして休む",
            "水分と軽い塩分補給",
            "頭皮マッサージ"
        ],
        longTermAdvice: [
            "むくみ対策（適度な運動、塩分調整）",
            "ストレッチの習慣化",
            "十分な休息時間の確保"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example10",
        recommendTitle: "むくみ解消ストレッチ",
        typeImage: "type1.png"
    },
    "3-3": {
        name: "首・背中緊張型頭痛",
        description: "夕方に後頭部の痛みを感じやすいタイプです。首と背中の緊張が蓄積することで痛みが生じやすくなります。",
        immediateAdvice: [
            "首のストレッチ（前後左右にゆっくり動かす）",
            "肩を回す運動",
            "温めるケア"
        ],
        longTermAdvice: [
            "姿勢改善エクササイズ",
            "ヨガやピラティスの検討",
            "マッサージの定期利用"
        ],
        recommendedLink: "https://www.youtube.com/watch?v=example11",
        recommendTitle: "首肩ストレッチ動画",
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
