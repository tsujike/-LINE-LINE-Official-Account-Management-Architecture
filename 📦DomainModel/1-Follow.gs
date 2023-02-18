/**お友だち登録時ドメインオブジェクト
 * https://developers.line.biz/ja/reference/messaging-api/#follow-event
 */
class Follow {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.Follow.name;

    this.replyToken = event.replyToken;　//greetingToNewUser_()とgreetingToFormerUser_()で使用
    this.userId = event.source.userId; //isNewUser_() で使用
    // this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss"); //いつか使いそう・・・午前午後判定とかね
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //新規登録か出戻りか
    const flag = this.isNewUser_();

    //初回アンケートに答えているかどうか
    //TO DO

    //ファーストメッセージ送信
    flag ? this.greetingToFormerUser_() : this.greetingToNewUser_();

    //ファーストフォーム送信
    this.sendFirstForm_();

    return "Followオブジェクトは課題を解決したのでメールを送信しました"
  }


  /** ドメインオブジェクト判定メソッド
   * @return{boolean} 
   */
  isDomainObject() {
    return this.event.type === "follow" ? true : false
  }



  /** 新規お友だちかどうか判定するメソッド
 * @return{boolean} 
 */
  isNewUser_() {
    //メインDBからuserIdリストの取得と照合
    const result = new DataSheet().hasUserId(this.userId);
    return result
  }


  /** 新規ユーザーにファーストメッセージを送信するメソッド */
  greetingToNewUser_() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowFollowEvent(this.event);

    const messageObject1 = [{
      "type": "text",
      "text": "Thank you for adding me as a friend.⭐We will support your business by directly importing from Hokkaido. If you feel like you're receiving too many notifications, please turn them off 📵.",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendReplyMessage(messageObject1, this.replyToken);

    //5秒後　
    Utilities.sleep(500);

    const messageObject2 = [{
      "type": "text",
      "text": `The operation of this official LINE account is carried out by TG GLOBAL Co., Ltd., a seafood wholesaler with headquarters in Hokkaido.✈️
      
https://tg-global.asia/`,
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject2, this.userId);

  }



  /** 出戻りユーザーにファーストメッセージを送信するメソッド */
  greetingToFormerUser_() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowFollowEvent(this.event);


    const messageObject = [{
      "type": "text",
      "text": "Thank you for unblocking. We look forward to your continued support. 🐎🚜",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendReplyMessage(messageObject, this.replyToken);

    //5秒後　
    Utilities.sleep(500);

    const messageObject2 = [{
      "type": "text",
      "text": `The operation of this official LINE account is carried out by TG GLOBAL Co., Ltd., a seafood wholesaler with headquarters in Hokkaido.✈️
      
https://tg-global.asia/`,
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject2, this.userId);
  }


  /** ファーストフォームを送信するメソッド */
  sendFirstForm_() {
    //5秒後　
    Utilities.sleep(1000);

    const messageObject2 = [{
      "type": "text",
      "text": `Our CEO, President Kenzo, is a successful businessman in Hokkaido who is promoting the attractions of Hokkaido.
https://www.facebook.com/kenzo.tsuji

Podcast "From Hokkaido to the World Table"
https://open.spotify.com/show/3fsUX46qgwMYjYpqSAcWOk`,
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject2, this.userId);


    const messageObject3 = [{
      "type": "text",
      "text": `For those who respond to the initial survey, we are running a campaign of 10% off on the first transaction (up to a limit of JPY 50,000)🎉. 
      
Please cooperate with us. The survey consists of 10 questions.✍️`,
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject3, this.userId);

    //最初の質問で、自由入力テキストを受け取るためのフラグをスプレッドシートにセットしておく
    const d = new DataSheet();
    d.appendRowFollowFormStandby(this.event);


    //3秒後
    Utilities.sleep(1000);

    // const messageObject4 = ENUM_FORM["follow_Form"][0];
    const messageObject4 = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "Name？ -1/10-",
          "text": "Please tap here to send your full name.☝️",
          "actions": [
            {
              "type": "postback",
              "label": "Launch the keyboard.⌨️",
              "data": "空のPostbackです",
              "inputOption": "openKeyboard",
              "fillInText": `Company's name(or your name):`
            }
          ]
        }
      }
    ];

    new LINE().sendUniquePushMessage(messageObject4, this.userId);
    return messageObject4
  }



}



/**
 *  TEST用関数
 * */
function testFollow() {


  const e = FOLLOW_WebhookEvent_SAMPLE;
  const event = JSON.parse(e.postData.contents).events[0];

  const f = new Follow(event);
  console.log(f.name);

  console.log(f.isDomainObject());

  console.log(f.sendFirstForm_());

}