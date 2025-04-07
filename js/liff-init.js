// LIFF初期化用スクリプト
document.addEventListener('DOMContentLoaded', function() {
    // LIFF IDを設定（LINE Developersで取得したLIFF IDを使用）
    const liffId = "2007221255-zN1Rpa0B"; // 実際のLIFF IDに置き換えてください
    
    // LIFFの初期化
    initializeLiff(liffId);
});

/**
 * LIFFの初期化関数
 * @param {string} liffId - LIFF ID
 */
function initializeLiff(liffId) {
    console.log("LIFF初期化を開始します");
    
    liff.init({
        liffId: liffId,
        withLoginOnExternalBrowser: true,
    })
    .then(() => {
        // 初期化成功時の処理
        console.log("LIFF初期化が成功しました");
        
        // ログインチェック
        if (!liff.isLoggedIn()) {
            console.log("LINEログインが必要です");
            // スマートフォンブラウザでアクセスした場合の処理
            liff.login();
        } else {
            console.log("LINEログイン済みです");
            // ユーザー情報を取得
            fetchUserProfile();
        }
    })
    .catch((error) => {
        // 初期化失敗時の処理
        console.error("LIFF初期化に失敗しました", error);
        // エラーメッセージを表示（必要に応じて）
        showErrorMessage("LIFFの初期化に失敗しました。ページを再読み込みしてください。");
    });
}

/**
 * ユーザープロファイルを取得する関数
 */
function fetchUserProfile() {
    if (liff.isLoggedIn()) {
        liff.getProfile()
            .then(profile => {
                console.log("ユーザープロファイルを取得しました");
                
                // ユーザー情報をセッションストレージに保存
                const userData = {
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                    timestamp: new Date().toISOString()
                };
                
                sessionStorage.setItem("userData", JSON.stringify(userData));
                
                // ユーザー名を表示
                displayUserName(profile.displayName);
                
                // 各ページ固有の初期化を実行
                initializePageSpecific();
            })
            .catch(error => {
                console.error("ユーザープロファイルの取得に失敗しました", error);
                // プロファイル取得に失敗した場合はゲストとして扱う
                displayUserName("ゲスト");
                initializePageSpecific();
            });
    } else {
        console.log("ログインしていないため、ゲストとして扱います");
        displayUserName("ゲスト");
        initializePageSpecific();
    }
}

/**
 * ユーザー名を表示する関数
 * @param {string} name - ユーザー名
 */
function displayUserName(name) {
    const userNameElements = document.querySelectorAll("#userName");
    userNameElements.forEach(element => {
        element.textContent = name;
    });
}

/**
 * 各ページ固有の初期化関数
 * 現在のページに応じた処理を実行します
 */
function initializePageSpecific() {
    // 現在のファイル名を取得
    const currentPage = window.location.pathname.split("/").pop();
    
    // ページ固有の処理を実行
    if (currentPage === "index.html" || currentPage === "" || currentPage === "/") {
        console.log("スタートページの初期化を実行します");
        // スタートページの初期化は共通appモジュールで実行するため、
        // ここでは何もしない
    } else if (currentPage === "question.html") {
        console.log("質問ページの初期化を実行します");
        // 質問ページの初期化は共通appモジュールで実行するため、
        // ここでは何もしない
    } else if (currentPage === "result.html") {
        console.log("結果ページの初期化を実行します");
        // 結果データがない場合はスタートページに戻す
        const resultData = sessionStorage.getItem("diagnosisResult");
        if (!resultData) {
            console.log("診断結果が見つからないため、スタートページにリダイレクトします");
            window.location.href = "index.html";
        }
        // 結果ページの初期化は共通appモジュールで実行するため、
        // ここでは追加処理なし
    }
}

/**
 * エラーメッセージを表示する関数
 * @param {string} message - エラーメッセージ
 */
function showErrorMessage(message) {
    // 簡易的なエラー表示（必要に応じてUIを改善）
    alert(message);
}
