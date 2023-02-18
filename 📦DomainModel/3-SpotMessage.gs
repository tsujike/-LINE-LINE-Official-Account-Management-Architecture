/**スポットメッセージドメインオブジェクト */
class SpotMessage {
  /** 
     * @constructor
     * @param{object} Webhookイベントオブジェクト
     */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.SpotMessage.name;

    //こいつら、共通のものはいいけど、独自なものは、自分のメソッド内で呼び出さないとエラーなるよ
    this.mode = event.mode;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.replyToken = event.replyToken;
    this.userId = event.source.userId; //hasFlag_() で使用
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowSpotMessageEvent(this.event);

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "SpotInquryオブジェクト成功です", this.event.message.text);

    return "SpotMessageオブジェクトは課題を解決したのでメールを送信しました";

  }

  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    return this.event.type === "message" ? true : false
  }



}