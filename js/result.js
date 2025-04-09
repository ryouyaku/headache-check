// 結果画面の処理を管理するスクリプト
document.addEventListener('DOMContentLoaded', function() {
    console.log("結果画面を読み込みました");
    
    // 診断結果を取得
    const resultDataString = sessionStorage.getItem("diagnosisResult");
    
    if (!resultDataString) {
        console.error("診断結果が見つかりません");
        // 結果がない場合はスタート画面にリダイレクト
        window.location.href = "index.html";
        return;
    }
    
    try {
        // 診断結果を解析
        const resultData = JSON.parse(resultDataString);
        displayResult(resultData);
        setupButtons(resultData);
        
        // 結果と同時にメッセージを送信（新機能）
        sendResultMessage(resultData);
    } catch (error) {
        console.error("診断結果の解析に失敗しました", error);
        alert("エラーが発生しました。再度診断を行ってください。");
        window.location.href = "index.html";
    }
});

/**
 * 診断結果を画面に表示する関数
 * @param {Object} resultData - 診断結果データ
 */
function displayResult(resultData) {
    console.log("結果を表示します:", resultData);
    
    // 頭痛タイプ情報
    const headacheType = resultData.headacheType;
    
    if (!headacheType) {
        console.error("頭痛タイプが見つかりません");
        return;
    }
    
    // 要素を取得
    const resultTitle = document.getElementById("resultTitle");
    const headacheTypeName = document.getElementById("headacheTypeName");
    const resultDescription = document.getElementById("resultDescription");
    const immediateAdvice = document.getElementById("immediateAdvice");
    const longTermAdvice = document.getElementById("longTermAdvice");
    const videoLink = document.getElementById("videoLink");
    
    // タイトルの設定（分割して表示）
    headacheTypeName.textContent = headacheType.name;
    
    // 説明文の設定
    resultDescription.textContent = headacheType.description;
    
    // 即時アドバイスの設定
    let immediateAdviceHtml = "<ul class='advice-list'>";
    headacheType.immediateAdvice.forEach(advice => {
        immediateAdviceHtml += `<li><i class="fas fa-check-circle text-primary me-2"></i>${advice}</li>`;
    });
    immediateAdviceHtml += "</ul>";
    immediateAdvice.innerHTML = immediateAdviceHtml;
    
    // 中長期アドバイスの設定
    let longTermAdviceHtml = "<ul class='advice-list'>";
    headacheType.longTermAdvice.forEach(advice => {
        longTermAdviceHtml += `<li><i class="fas fa-check-circle text-info me-2"></i>${advice}</li>`;
    });
    longTermAdviceHtml += "</ul>";
    longTermAdvice.innerHTML = longTermAdviceHtml;
    
    // 動画リンクの設定
    videoLink.innerHTML = `
        <div class="video-thumbnail p-3">
            <i class="fas fa-play-circle text-success fa-3x mb-2"></i>
            <p>${headacheType.recommendTitle}</p>
            <a href="${headacheType.recommendedLink}" target="_blank" class="btn btn-outline-success">
                <i class="fas fa-external-link-alt me-2"></i>動画を見る
            </a>
        </div>
    `;
}

/**
 * 診断結果と同時にメッセージを送信する関数（新機能）
 * @param {Object} resultData - 診断結果データ
 */
function sendResultMessage(resultData) {
    console.log("診断結果のメッセージを送信します");
    
    // LIFFが利用可能な環境かチェック
    if (liff.isInClient()) {
        const headacheType = resultData.headacheType;
        
        // メッセージテキストを作成
        const messageText = `【頭痛タイプ診断結果】\n\nあなたの頭痛タイプ：${headacheType.name}\n\n${headacheType.description}\n\n＜すぐにできる対策＞\n・${headacheType.immediateAdvice.join('\n・')}`;
        
        // メッセージを送信
        liff.sendMessages([
            {
                type: "text",
                text: messageText
            }
        ])
        .then(() => {
            console.log("診断結果メッセージを送信しました");
        })
        .catch((error) => {
            console.error("診断結果メッセージの送信に失敗しました", error);
        });
    } else {
        console.log("LINEアプリ内ではないため、メッセージ送信をスキップします");
    }
}

/**
 * ボタンの機能を設定する関数
 * @param {Object} resultData - 診断結果データ
 */
function setupButtons(resultData) {
    // 相談ボタンの設定
    const consultButton = document.getElementById("consultButton");
    if (consultButton) {
        consultButton.addEventListener("click", function() {
            consultExpert(resultData);
        });
    }
    
    // 再診断ボタンの設定
    const retakeButton = document.getElementById("retakeButton");
    if (retakeButton) {
        retakeButton.addEventListener("click", function() {
            retakeDiagnosis();
        });
    }
}

/**
 * 専門家に相談する機能
 * @param {Object} resultData - 診断結果データ
 */
function consultExpert(resultData) {
    console.log("専門家に相談します");
    
    const headacheType = resultData.headacheType;
    
    // 相談メッセージを作成
    const consultMessage = `【頭痛タイプ診断結果】\n頭痛タイプ：${headacheType.name}\n\n詳しい相談をしたいです。`;
    
    // LINE APIを使用してメッセージ送信
    if (liff.isInClient()) {
        liff.sendMessages([
            {
                type: "text",
                text: consultMessage
            }
        ])
        .then(() => {
            console.log("相談メッセージを送信しました");
            // 送信後にLIFFウィンドウを閉じる
            liff.closeWindow();
        })
        .catch((error) => {
            console.error("メッセージの送信に失敗しました", error);
            alert("メッセージの送信に失敗しました。再度お試しください。");
        });
    } else {
        // ブラウザでの実行時はアラートを表示
        alert("LINEアプリから使用してください。\n\n" + consultMessage);
    }
}

/**
 * 診断をやり直す機能
 */
function retakeDiagnosis() {
    console.log("診断をやり直します");
    
    // 回答データをクリア
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("diagnosisResult");
    
    // 質問画面に戻る
    window.location.href = "question.html";
}
