// メインアプリケーションロジック
document.addEventListener('DOMContentLoaded', function() {
    console.log("アプリケーションを初期化します");
    
    // 現在のページを判定
    const currentPage = window.location.pathname.split("/").pop();
    
    // ページに応じた初期化処理
    if (currentPage === "index.html" || currentPage === "" || currentPage === "/") {
        initializeStartPage();
    } else if (currentPage === "question.html") {
        initializeQuestionPage();
    } else if (currentPage === "result.html") {
        initializeResultPage();
    }
});

/**
 * スタート画面の初期化
 */
function initializeStartPage() {
    console.log("スタート画面を初期化します");
    
    // 診断開始ボタンの設定
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.addEventListener("click", function() {
            console.log("診断を開始します");
            
            // 以前の回答をクリア（新しい診断を始める）
            sessionStorage.removeItem("userAnswers");
            sessionStorage.removeItem("diagnosisResult");
            
            // 質問画面に遷移
            window.location.href = "question.html";
        });
    }
}

/**
 * 質問画面の初期化
 */
function initializeQuestionPage() {
    console.log("質問画面を初期化します");
    
    // 前回の回答データがあれば読み込み
    let userAnswers = [];
    const savedAnswers = sessionStorage.getItem("userAnswers");
    
    if (savedAnswers) {
        console.log("前回の回答を読み込みます");
        userAnswers = JSON.parse(savedAnswers);
    } else {
        // 新規に回答配列を初期化
        console.log("新しい回答配列を初期化します");
        userAnswers = Array(questions.length).fill(null);
    }
    
    // 現在の質問インデックス
    let currentQuestionIndex = 0;
    
    // 最後に回答していた質問があればその位置から開始
    if (userAnswers.some(answer => answer !== null)) {
        // 最後に回答した質問の次の質問から再開
        for (let i = userAnswers.length - 1; i >= 0; i--) {
            if (userAnswers[i] !== null) {
                currentQuestionIndex = Math.min(i + 1, questions.length - 1);
                break;
            }
        }
    }
    
    // 要素の取得
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("options");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const progressBar = document.getElementById("progressBar");
    const questionCounter = document.getElementById("questionCounter");
    
    // 質問を表示する関数
    function displayQuestion(index) {
        const question = questions[index];
        
        // 質問文の設定
        questionText.textContent = question.text;
        
        // 選択肢をクリア
        optionsContainer.innerHTML = "";
        
        // 選択肢を生成
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option-item";
            
            // 選択済みの選択肢にはselectedクラスを追加
            if (userAnswers[index] === option.value) {
                optionElement.classList.add("selected");
            }
            
            optionElement.innerHTML = `
                <input type="radio" id="option${optionIndex}" name="question${index}" value="${option.value}"
                    ${userAnswers[index] === option.value ? "checked" : ""}>
                <label for="option${optionIndex}">${option.text}</label>
            `;
            
            // クリックイベント
            optionElement.addEventListener("click", function() {
                // 全選択肢のselectedクラスを削除
                document.querySelectorAll(".option-item").forEach(item => {
                    item.classList.remove("selected");
                });
                
                // クリックされた選択肢をチェック状態にする
                const radioInput = this.querySelector("input[type='radio']");
                radioInput.checked = true;
                
                // 選択されたオプションを記録
                userAnswers[index] = option.value;
                
                // selectedクラスを追加
                this.classList.add("selected");
                
                // セッションストレージに保存
                sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
                
                // 次へボタンを有効化
                nextButton.disabled = false;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // 前へボタンの表示制御
        prevButton.style.visibility = index === 0 ? "hidden" : "visible";
        
        // 次へボタンのテキスト変更
        if (index === questions.length - 1) {
            nextButton.innerHTML = '診断結果を見る<i class="fas fa-check ms-2"></i>';
        } else {
            nextButton.innerHTML = '次の質問<i class="fas fa-arrow-right ms-2"></i>';
        }
        
        // 次へボタンの有効/無効設定
        nextButton.disabled = userAnswers[index] === null;
        
        // プログレスバーの更新
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", progress);
        
        // 質問カウンターの更新
        questionCounter.textContent = `質問 ${index + 1}/${questions.length}`;
    }
    
    // 前へボタンのイベント
    prevButton.addEventListener("click", function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    });
    
    // 次へボタンのイベント
    nextButton.addEventListener("click", function() {
        // 回答が選択されているか確認
        if (userAnswers[currentQuestionIndex] === null) {
            alert("選択肢を選んでください");
            return;
        }
        
        if (currentQuestionIndex < questions.length - 1) {
            // 次の質問へ
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            // 全質問に回答した場合は診断結果を計算して結果ページへ
            calculateResults(userAnswers);
        }
    });
    
    // 最初の質問を表示
    displayQuestion(currentQuestionIndex);
}

/**
 * 診断結果を計算する関数
 * @param {Array} answers - ユーザーの回答配列
 */
function calculateResults(answers) {
    console.log("診断結果を計算します");
    
    // 質問1と2の組み合わせから頭痛タイプを決定 (16通りのパターン)
    const resultType = `${answers[0]}-${answers[1]}`;
    
    // ユーザー情報を取得
    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
    
    // 診断結果を保存
    const diagnosisResult = {
        resultType: resultType,
        headacheType: headacheTypes[resultType],
        timestamp: new Date().toISOString(),
        userName: userData.displayName || "ゲスト",
        userId: userData.userId || null
    };
    
    // セッションストレージに保存
    sessionStorage.setItem("diagnosisResult", JSON.stringify(diagnosisResult));
    
    // 結果をバックエンドに送信
    sendResultsToBackend(diagnosisResult, answers);
    
    // 結果ページへ遷移
    window.location.href = "result.html";
}

/**
 * 診断結果をバックエンドに送信する関数
 * @param {Object} result - 診断結果
 * @param {Array} answers - ユーザーの回答配列
 */
function sendResultsToBackend(result, answers) {
    // Google Apps Script WebアプリのURL
    const gasUrl = "https://script.google.com/macros/s/AKfycbyb3IP0QJ1_BPLCaiBYwyJo_z8tFKdg7mqCJwJcZWXu0OLMgrdmjAROp51y6yXG4is/exec"; // 実際のGAS WebアプリURLに置き換えてください
    
    // 送信データの準備
    const data = {
        timestamp: result.timestamp,
        userName: result.userName,
        userId: result.userId,
        resultType: result.headacheType.name,
        answers: answers
    };
    
    // バックエンドにデータを送信
    fetch(gasUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log("診断結果をバックエンドに送信しました", responseData);
    })
    .catch(error => {
        console.error("診断結果の送信に失敗しました", error);
        // エラーが発生しても結果表示には影響させない
    });
}

/**
 * 結果画面の初期化
 * このプロジェクトでは結果表示の詳細はresult.jsで実装
 */
function initializeResultPage() {
    console.log("結果画面を初期化します");
    // result.jsで詳細実装
}
