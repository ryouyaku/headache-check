// Google Apps Script Webアプリ - 頭痛タイプチェックAPI

/**
 * POST リクエスト処理
 * フロントエンドからの診断結果データを受け取り、スプレッドシートに保存します
 */
function doPost(e) {
  try {
    // リクエストデータの解析
    const data = JSON.parse(e.postData.contents);
    
    // 各フィールドの存在確認（バリデーション）
    if (!data.userName || !data.resultType || !data.answers) {
      return createErrorResponse("必須フィールドが不足しています");
    }
    
    // スプレッドシートを開く
    const spreadsheetId = "1BW5Mo7aKafh2V-h2Js9v59LePw6v3iCOuwEeB5WXvmw"; // あなたのスプレッドシートIDに置き換えてください
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    // 診断結果シートの取得または作成
    saveToResultSheet(spreadsheet, data);
    
    // 詳細回答シートに保存
    saveToDetailSheet(spreadsheet, data);
    
    // 成功レスポンスを返す
    return createSuccessResponse("データが正常に保存されました");
    
  } catch (error) {
    // エラーログ
    console.error("エラーが発生しました: " + error);
    
    // エラーレスポンスを返す
    return createErrorResponse("処理中にエラーが発生しました: " + error.toString());
  }
}

/**
 * GET リクエスト処理
 * APIの稼働確認用
 */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "active",
      message: "頭痛タイプチェックAPI v1.0 は正常に動作しています",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 診断結果シートにデータを保存する関数
 * @param {SpreadsheetApp.Spreadsheet} spreadsheet - スプレッドシート
 * @param {Object} data - 保存するデータ
 */
function saveToResultSheet(spreadsheet, data) {
  // 診断結果シートの取得または作成
  let resultSheet = spreadsheet.getSheetByName("診断結果");
  if (!resultSheet) {
    resultSheet = spreadsheet.insertSheet("診断結果");
    // ヘッダー行の設定
    resultSheet.appendRow([
      "タイムスタンプ", 
      "ユーザー名", 
      "ユーザーID", 
      "頭痛タイプ", 
      "質問1回答", 
      "質問2回答"
    ]);
    
    // 列幅の調整
    resultSheet.setColumnWidth(1, 180); // タイムスタンプ
    resultSheet.setColumnWidth(2, 150); // ユーザー名
    resultSheet.setColumnWidth(3, 250); // ユーザーID
    resultSheet.setColumnWidth(4, 200); // 頭痛タイプ
  }
  
  // データの追加
  resultSheet.appendRow([
    new Date(), // タイムスタンプ（サーバー時間に変換）
    data.userName,
    data.userId || "未ログイン",
    data.resultType,
    data.answers[0], // 質問1の回答
    data.answers[1]  // 質問2の回答
  ]);
}

/**
 * 詳細回答シートにデータを保存する関数
 * @param {SpreadsheetApp.Spreadsheet} spreadsheet - スプレッドシート
 * @param {Object} data - 保存するデータ
 */
function saveToDetailSheet(spreadsheet, data) {
  // 詳細回答シートの取得または作成
  let detailSheet = spreadsheet.getSheetByName("回答詳細");
  if (!detailSheet) {
    detailSheet = spreadsheet.insertSheet("回答詳細");
    
    // ヘッダー行の作成
    const headers = ["タイムスタンプ", "ユーザー名", "ユーザーID"];
    
    // 質問数分のヘッダーを追加
    for (let i = 0; i < data.answers.length; i++) {
      headers.push(`質問${i+1}回答`);
    }
    
    detailSheet.appendRow(headers);
    
    // 列幅の調整
    detailSheet.setColumnWidth(1, 180); // タイムスタンプ
    detailSheet.setColumnWidth(2, 150); // ユーザー名
    detailSheet.setColumnWidth(3, 250); // ユーザーID
  }
  
  // 行データの準備
  const rowData = [
    new Date(),
    data.userName,
    data.userId || "未ログイン"
  ];
  
  // 回答データを追加
  rowData.push(...data.answers);
  
  // データの追加
  detailSheet.appendRow(rowData);
}

/**
 * 成功レスポンスを作成する関数
 * @param {string} message - 成功メッセージ
 * @returns {ContentService.TextOutput} JSONレスポンス
 */
function createSuccessResponse(message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "success",
      message: message,
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * エラーレスポンスを作成する関数
 * @param {string} message - エラーメッセージ
 * @returns {ContentService.TextOutput} JSONレスポンス
 */
function createErrorResponse(message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "error",
      message: message,
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
