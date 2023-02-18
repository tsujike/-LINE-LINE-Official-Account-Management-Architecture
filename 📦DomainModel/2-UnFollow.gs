/**ブロック時ドメインオブジェクト */
class UnFollow {
  /** 
     * @constructor
     * @param{object} Webhookイベントオブジェクト
     */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.UnFollow.name;

    this.userMessage = "ブロック😨";

    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.sourceUserId = event.source.userId;
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowUnfollowEvent(this.event);

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "【[LINE]LINE公式アカウント『Delicious Seafood Supplier in Hokkaido』】がブロックされました", "気にしないでいきましょう");

    return "UnFollowオブジェクトは課題を解決したのでメールを送信しました"

  }

  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    return this.event.type === "unfollow" ? true : false
  }


}