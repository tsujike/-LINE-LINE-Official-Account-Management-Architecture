//　# スクリプトファイル目次
//　各クラスは　/** 🔚 End 🔚 */　で区切ってます。
// ## クラス
// - Follow
// - UnFollow

// ## ユーティリティ系
// - richMenuEnum


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


  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    if (this.messageType === "follow") return true;
  }

}

/** 🔚 End 🔚 */

/**ブロック時ドメインオブジェクト */
class UnFollow {

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


  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    if (this.messageType === "unllow") return true;
  }


}



/** 🔚 End 🔚 */

const richMenuEnum = {

testRichMenuSource : {
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": false,
    "name": "99_richMenu_test",
    "chatBarText": "▲タップしてメニューを表示▲",
    "areas": [ //センターで2分割
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 2500 / 2,//2500 /2 
          "height": 1686
        },
        "action": {
          "type": "postback",
          "data": "[Free_RichMenu1_A1]リッチメニュー（左）がタップされました",
          "displayText": "リッチメニュー（左）がタップされました",
        }
      },
      {
        "bounds": {
          "x": 2500 / 2,
          "y": 0,
          "width": 2500 / 2,//2500 /2 
          "height": 1686
        },
        "action": {
          "type": "postback",
          "data": "[Free_RichMenu1_A2]リッチメニュー（右）がタップされました",
          "displayText": "リッチメニュー（右）がタップされました",
        }
      },
    ]
  },

  testRichMenuSource2 : {}

}

const ENUM_RICHMENU = Object.freeze(richMenuEnum);


/**
 *  TEST用関数
 * */
  function myFunction_20230119_022838 () {
   
   console.log(ENUM_RICHMENU.testRichMenuSource);

 }


/** 🔚 End 🔚 */


 const messageObjectEnum = {

  follow_Form: [
    [{//follow_Form[0]
      "type": "template",
      "altText": "アンケートに回答ください",
      "template": {
        "type": "buttons",
        "title": "ご職業は？",
        "text": "以下の中からお選びください",
        "actions": [
          {
            "type": "postback",
            "label": "会社役員",
            "data": "[follow_Form1_A1]会社役員", //.postback.dataで文字列を返す
            "displayText": "会社役員"
          },
          {
            "type": "postback",
            "label": "会社員",
            "data": "[follow_Form1_A2]会社員", //.postback.dataで文字列を返す
            "displayText": "会社員"
          },
          {
            "type": "postback",
            "label": "自営業・フリーランス",
            "data": "[follow_Form1_A3]自営業・フリーランス", //.postback.dataで文字列を返す
            "displayText": "自営業・フリーランス"
          },
          {
            "type": "postback",
            "label": "その他",
            "data": "[follow_Form1_A4]その他", //.postback.dataで文字列を返す
            "displayText": "その他"
          }
        ]
      }
    }],
    [{//follow_Form[1]
      "type": "template",
      "altText": "アンケートに回答ください",
      "template": {
        "type": "buttons",
        "title": "性別は？",
        "text": "以下の中からお選びください",
        "actions": [
          {
            "type": "postback",
            "label": "男性",
            "data": "[follow_Form2_A1]男性",
            "displayText": "男性"
          },
          {
            "type": "postback",
            "label": "女性",
            "data": "[follow_Form2_A2]女性",
            "displayText": "女性"
          },
          {
            "type": "postback",
            "label": "その他・回答しない",
            "data": "[follow_Form2_A3]その他・回答しない",
            "displayText": "その他・回答しない"
          }
        ]
      }
    }
    ],
    [{//follow_Form[2]
      "type": "template",
      "altText": "アンケートに回答ください",
      "template": {
        "type": "buttons",
        "title": "年齢は？",
        "text": "以下の中からお選びください",
        "actions": [
          {
            "type": "postback",
            "label": "20代以下",
            "data": "[follow_Form3_終了]20代以下",
            "displayText": "20代以下"
          },
          {
            "type": "postback",
            "label": "30～40代",
            "data": "[follow_Form3_終了]30～40代",
            "displayText": "30～40代"
          },
          {
            "type": "postback",
            "label": "40～50代",
            "data": "[follow_Form3_終了]40～50代",
            "displayText": "40～50代"
          },
          {
            "type": "postback",
            "label": "50代以上",
            "data": "[follow_Form3_終了]50代以上",
            "displayText": "50代以上"
          }

        ]
      }
    }
    ]

  ]
};

const ENUM_FORM = Object.freeze(messageObjectEnum);



/** 🔚 End 🔚 */
