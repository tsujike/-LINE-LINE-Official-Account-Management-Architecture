

/**お友だち登録時フォーム（いわゆる2問目以降）ドメインオブジェクト
 * https://developers.line.biz/ja/reference/messaging-api/#follow-event
 */
class FollowForm {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.FollowForm.name;

    this.replyToken = event.replyToken;　//greetingToNewUser_()とgreetingToFormerUser_()で使用
    this.userId = event.source.userId; //isNewUser_() で使用
    // this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss"); //いつか使いそう・・・

  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    try {

      let formZone = "";

      //1通目はテキストメッセージが入ってくる
      if (this.event.type === "message") {
        const d = new DataSheet();
        d.appendRowSpotMessageEvent(this.event);
        formZone = "Form1";
      }

      //2通目以降はPostbackだけど
      if (this.event.type === "postback") {
        const d = new DataSheet();
        d.appendRowPostBackEvent(this.event);

        //今何問目？
        formZone = this.event.postback.data.match(/Form\d+|終了/)[0]; //Form2など
      }

 
      switch (formZone) {
        case "Form1":
          //2rdフォーム送信
          this.sendForm2_();
          break;
        case "Form2":
          //3rdフォーム送信
          this.sendForm3_();
          break;
        case "Form3":
          //4thフォーム送信
          this.sendForm4_();
          break;
        case "Form4":
          //5thフォーム送信
          this.sendForm5_();
          break;
        case "Form5":
          //6thフォーム送信
          this.sendForm6_();
          break;
        case "Form6":
          //7thフォーム送信
          this.sendForm7_();
          break;
        case "Form7":
          //8thフォーム送信
          this.sendForm8_();
          break;
        case "Form8":
          //9thフォーム送信
          this.sendForm9_();
          break;
        case "Form9":
          //10thフォーム送信
          this.sendForm10_();
          break;
        case "Form10":
          //11thフォーム送信
          this.sendForm11_();
          break;
        case "Form12": //終了
          //Endフォーム送信
          this.sendFormEnd_();
          break;
        case "Form13": //再送
          //フォーム1から送信させる
          this.sendForm1_();
          break;
        default:
        //処理
      }

    } catch (e) {
      GmailApp.sendEmail("kenzo@jugani-japan.com", "FollowFormでerrorです", e.message);
    }

    return "FollowFormオブジェクトは課題を解決したのでメールを送信しました"
  }





  /** ドメインオブジェクト判定メソッド
   * @return{boolean} 
   */
  isDomainObject() {

    //タイプがPostbackで、dataが"空のPostbackです"なら、FollowFormドメインオブジェクトではありません。
    if (this.event.type === "postback" && this.event.postback.data === "空のPostbackです") return false;

    //タイプがPostbackで、dataにfollow_Formが入ってたら、それは、FollowFormドメインオブジェクトです。
    if (this.event.type === "postback" && this.event.postback.data.match(/follow_Form/)[0] === "follow_Form") return true;

    //タイプがmessageで、スプレッドシートのユーザーの直近フィールドがfollowFormStandbyなら、それは、FollowFormドメインオブジェクトです。

    //idでフィルターを掛けて、直近のレコードを確認する
    const d = new DataSheet();
    const records = d.getDataSheetRecords();
    const userFilter = records.filter(record => { return record["userId"] === this.userId });

    //最新行だけ取得
    const lastRow = userFilter.pop();

    //Type（A列） messageText（B列）
    const messageType = lastRow["type"];
    const messageText = lastRow["messageText"];

    if (this.event.type === "message" && messageType === "flag" && messageText === "followFormStandby") return true;

    //それ以外はfalseにするの？
    return false

  }

  /** 2ndフォームを送信するメソッド */
  sendForm2_() {
    Utilities.sleep(1000);    //1秒後
    const messageObject = ENUM_FORM["follow_Form"][1];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }


  /** 3rdフォームを送信するメソッド */
  sendForm3_() {
    Utilities.sleep(1000);    //1秒後
    const messageObject = ENUM_FORM["follow_Form"][2];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 4thフォームを送信するメソッド */
  sendForm4_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][3];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 5thフォームを送信するメソッド */
  sendForm5_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][4];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 6thフォームを送信するメソッド */
  sendForm6_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][5];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 7thフォームを送信するメソッド */
  sendForm7_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][6];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 8thフォームを送信するメソッド */
  sendForm8_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][7];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 9thフォームを送信するメソッド */
  sendForm9_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][8];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }
    /** 10thフォームを送信するメソッド */
  sendForm10_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][9];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 11thフォームを送信するメソッド */
  sendForm11_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = ENUM_FORM["follow_Form"][10];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 終了フォームを送信するメソッド */
  sendFormEnd_() {
    Utilities.sleep(1000);    //1秒後

    const messageObject = [{
      "type": "text",
      "text": `Thank you for your response.⭐The campaign coupon will be applied to your first transaction.🎊

List of JETRO Cooperative Companies for Export of Fishery and Food Products
https://www.jetro.go.jp/industry/foods/trading_company_list.html

TG GLOBAL CO.LTD.
https://tg-global.asia/`,
    }
    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 1stフォームを送信するメソッド */
  sendForm1_() {

    //最初の質問で、自由入力テキストを受け取るためのフラグをスプレッドシートにセットしておく
    const d = new DataSheet();
    d.appendRowFollowFormStandby(this.event);

    //1秒後
    Utilities.sleep(1000);
    const messageObject = ENUM_FORM["follow_Form"][0];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }


}




/**
 *  TEST用関数
 * */
function testFollowForm() {


  const e = SpotMessage_WebhookEvent_SAMPLE;
  const event = JSON.parse(e.postData.contents).events[0];

  const f = new FollowForm(event);
  console.log(f.name);

  console.log(f.isDomainObject());

}