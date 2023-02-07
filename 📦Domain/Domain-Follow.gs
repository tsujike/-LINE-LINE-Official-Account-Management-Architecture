/**お友だち登録時ドメインオブジェクト */
class Follow {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {
    this.event = event;

    this.messageType = event.type;
    this.userMessage = "ブロック解除";
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.userId = event.source.userId;
    this.replyToken = event.replyToken;
    this.mode = event.mode;

    //フォロー時はメッセージ来ないだろ
    this.userMessage = event.message.text;

  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {
    //ここの処理すごく長くなる気がするけどいいのかな？

    //このように依存度が高い場合は
    // const b = new B();
    // b.something(/** 内部でnew A()している */)

    //こうやって依存関係を解消する
    // const a = new A();
    // const b = new B(a);
    // b.doSomething();
  }


  /** サブメソッド */
  gaibuSyori_() {
    return this.property;
  }
}