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
      case "Form11": //再送
        //Endフォーム送信
        this.sendFormEnd_();
        break;
      case "Form12": //再送
        //フォーム1から送信させる
        this.sendForm1_();
        break;
      default:
      //処理
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
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "What is your gender? -2/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Male",
              "data": "[follow_Form2_A1]Male",
              "displayText": "Male"
            },
            {
              "type": "postback",
              "label": "Female",
              "data": "[follow_Form2_A2]Female",
              "displayText": "Female"
            },
            {
              "type": "postback",
              "label": "Non-binary",
              "data": "[follow_Form2_A3]Non-binary",
              "displayText": "Non-binary"
            },
            {
              "type": "postback",
              "label": "Prefer not to say",
              "data": "[follow_Form2_A4]Prefer not to say",
              "displayText": "Prefer not to say"
            }
          ]
        }
      }
    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }


  /** 3rdフォームを送信するメソッド */
  sendForm3_() {
    Utilities.sleep(1000);    //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "What is your age? -3/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "25-35",
              "data": "[follow_Form3_A1]25-35",
              "displayText": "25-35"
            },
            {
              "type": "postback",
              "label": "35-45",
              "data": "[follow_Form3_A2]35-45",
              "displayText": "35-45"
            },
            {
              "type": "postback",
              "label": "45-64",
              "data": "[follow_Form3_A3]45-64",
              "displayText": "45-55"
            },
            {
              "type": "postback",
              "label": "Under 18/55 or older",
              "data": "[follow_Form3_A4]Under 18 / 55 or older",
              "displayText": "Under 24 / 55 or older"
            }
          ]
        }
      }
    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 4thフォームを送信するメソッド */
  sendForm4_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "Do you have purchasing authority? -4/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Mostly have",
              "data": "[follow_Form4_A1]Mostly have",
              "displayText": "Mostly have"
            },
            {
              "type": "postback",
              "label": "Partially have",
              "data": "[follow_Form4_A2]Partially have",
              "displayText": "Partially have"
            },
            {
              "type": "postback",
              "label": "Mostly don't have",
              "data": "[follow_Form4_A3]Mostly don't have",
              "displayText": "Mostly don't have"
            },
            {
              "type": "postback",
              "label": "Don't know",
              "data": "[follow_Form4_A4]Don't know",
              "displayText": "Don't know"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 5thフォームを送信するメソッド */
  sendForm5_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "What products do you want? -5/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Japanese Seafood:🦀",
              "data": "[follow_Form5_A1]Japanese Seafood🦀",
              "displayText": "Japanese Seafood🦀"
            },
            {
              "type": "postback",
              "label": "Fuits & Vegetables🍉",
              "data": "[follow_Form5_A2]Japanese Fuits and Vegetables🍉",
              "displayText": "Japanese Fuits and Vegetables🍉"
            },
            {
              "type": "postback",
              "label": "Japanese Sake🍶",
              "data": "[follow_Form5_A3]Japanese Sake🍶",
              "displayText": "Japanese Sake🍶"
            },
            {
              "type": "postback",
              "label": "Other✒️",
              "data": "[follow_Form5_A4]Other✒️",
              "displayText": "Other✒️"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 6thフォームを送信するメソッド */
  sendForm6_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "What products do you handling? -6/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Food & Ingredients🍕",
              "data": "[follow_Form6_A1]Alternative Food & Ingredients🍕",
              "displayText": "Alternative Food & Ingredients🍕"
            },
            {
              "type": "postback",
              "label": "Alcohol & Wine🍷",
              "data": "[follow_Form6_A2]Drinks, Alcohol & Wine🍷",
              "displayText": "Drinks, Alcohol & Wine🍷"
            },
            {
              "type": "postback",
              "label": "Import goods🚢",
              "data": "[follow_Form6_A3]Import Japanese goods🚢",
              "displayText": "Import Japanese goods🚢"
            },
            {
              "type": "postback",
              "label": "Other✒️",
              "data": "[follow_Form6_A4]Other✒️",
              "displayText": "Other✒️"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 7thフォームを送信するメソッド */
  sendForm7_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "Who do you sell to? -7/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Wholesaler🚛",
              "data": "[follow_Form7_A1]Wholesale distributors🚛",
              "displayText": "Wholesale distributors🚛"
            },
            {
              "type": "postback",
              "label": "Hotels,restaurants🏨",
              "data": "[follow_Form7_A2]Hotels, restaurants, and food service providers🏨",
              "displayText": "Hotels, restaurants, and food service providers🏨"
            },
            {
              "type": "postback",
              "label": "Retail stores🏪",
              "data": "[follow_Form7_A3]Retail stores🏪",
              "displayText": "Retail stores🏪"
            },
            {
              "type": "postback",
              "label": "Online sales📱",
              "data": "[follow_Form7_A4]Online sales📱",
              "displayText": "Online sales📱"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 8thフォームを送信するメソッド */
  sendForm8_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "How often do you import products? -8/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Weekly✈️",
              "data": "[follow_Form8_A1]Weekly✈️",
              "displayText": "Weekly✈️"
            },
            {
              "type": "postback",
              "label": "Monthly⏱️",
              "data": "[follow_Form8_A2]Monthly⏱️",
              "displayText": "Monthly⏱️"
            },
            {
              "type": "postback",
              "label": "Yearly📅",
              "data": "[follow_Form8_A3]Yearly📅",
              "displayText": "Yearly📅"
            },
            {
              "type": "postback",
              "label": "Never before",
              "data": "[follow_Form8_A4]Never imported before",
              "displayText": "Never imported before"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 9thフォームを送信するメソッド */
  sendForm9_() {
    Utilities.sleep(1000);     //1秒後
    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "What social media do you look at? -9/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Facebook",
              "data": "[follow_Form9_A1]Facebook",
              "displayText": "Facebook"
            },
            {
              "type": "postback",
              "label": "Twitter",
              "data": "[follow_Form9_A2]Twitter",
              "displayText": "Twitter"
            },
            {
              "type": "postback",
              "label": "Instagram or TickTok",
              "data": "[follow_Form9_A3]Instagram or TickTok",
              "displayText": "Instagram or TickTok"
            },
            {
              "type": "postback",
              "label": "Other📱",
              "data": "[follow_Form9_A4]Other📱",
              "displayText": "Other📱"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }
  /** 10thフォームを送信するメソッド */
  sendForm10_() {
    Utilities.sleep(1000);     //1秒後

    const messageObject = [
      {
        "type": "template",
        "altText": "Please complete our survey.",
        "template": {
          "type": "buttons",
          "title": "Where did you find us? -10/10-",
          "text": "Please choose from the list.",
          "actions": [
            {
              "type": "postback",
              "label": "Social Media📱",
              "data": "[follow_Form10_A1]Social media(Facebook/Twitter/Instagram/etc)📱",
              "displayText": "Social media(Facebook/Twitter/Instagram/etc)📱"
            },
            {
              "type": "postback",
              "label": "Google search🌏",
              "data": "[follow_Form10_A2]Google search🌏",
              "displayText": "Google search🌏"
            },
            {
              "type": "postback",
              "label": "Direct Email📩",
              "data": "[follow_Form10_A3]Direct Email📩",
              "displayText": "Direct Email📩"
            },
            {
              "type": "postback",
              "label": "Friend🧑‍🤝‍🧑",
              "data": "[follow_Form10_A4]Friend🧑‍🤝‍🧑",
              "displayText": "Friend🧑‍🤝‍🧑"
            }

          ]
        }
      }

    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 11thフォームを送信するメソッド */
  sendForm11_() {
    Utilities.sleep(1000);     //1秒後

    const messageObject = [
      {
        "type": "template",
        "altText": "Thank you for your time and participation.🎉",
        "template": {
          "type": "buttons",
          "title": "Finished🎉",
          "text": "Are you ending or restart from the beginning again?",
          "actions": [
            {
              "type": "postback",
              "label": "Finish🔚",
              "data": "[follow_Form11_A1]Finish🔚",
              "displayText": "Finish🔚"
            },
            {
              "type": "postback",
              "label": "Again✍️",
              "data": "[follow_Form12_A1]Start the survey from the beginning again.✍️",
              "displayText": "Start the survey from the beginning again.✍️"
            }
          ]
        }
      }
    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 終了フォームを送信するメソッド */
  sendFormEnd_() {
    Utilities.sleep(1000);    //1秒後

    const messageObject = [{
      "type": "text",
      "text": `Thank you for your time and participation.⭐The campaign coupon will be applied to your first transaction.🎊

We can conduct import transactions with many Japanese companies other than our own. Please also refer to this list. We hope that all of your businesses will be successful.
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
    const messageObject = [
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
              "label": "Launch the keyboard",
              "data": "空のPostbackです",
              "inputOption": "openKeyboard",
              "fillInText": `Company's name(or your name):`
            }
          ]
        }
      }
    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }


}




/**
 *  TEST用関数
 * */
function testFollowForm() {


  // const e = SpotMessage_WebhookEvent_SAMPLE;
  const e = FOLLOWFORM_WebhookEvent_SAMPLE;

  const event = JSON.parse(e.postData.contents).events[0];

  const f = new FollowForm(event);
  console.log(f.name);

  console.log(f.isDomainObject());

  // console.log(f.sendForm3_());
  // console.log(f.sendForm4_());
  // console.log(f.sendForm5_());
  // console.log(f.sendForm6_());
  // console.log(f.sendForm7_());
  // console.log(f.sendForm8_());
  // console.log(f.sendForm9_());
  // console.log(f.sendForm10_());
  // console.log(f.sendForm11_());

}