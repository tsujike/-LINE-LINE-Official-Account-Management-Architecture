/** LINEをトリガーとするイベントハンドラー
 * @param{object} Webhookイベントオブジェクト(中身はJSON) 
 */
function doPost(e) {

  try {
    //アプリケーション層に単体のイベントを渡して、ドメインオブジェクト（どの業務を行うのか）を決定する
    const event = JSON.parse(e.postData.contents).events[0];
    const app = new Application(event);

    //テスト用に戻り値を変数に格納しておく
    const result = app.getSolutions();
    return result

  } catch (error) {
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "【Delicious SS Hokkaido】でError", error.message);
  }

}

