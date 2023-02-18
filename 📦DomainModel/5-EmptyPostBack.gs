/**キーボード起動などのEmptyPostback用ドメインオブジェクト
 */
class EmptyPostback {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {
    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;
  }


  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {
    //なにもしない
  }


  /** ドメインオブジェクト判定メソッド
 * @return{boolean} 
 */
  isDomainObject() {
    //タイプがPostbackで、最後に残ったのはEmptyPostbackドメインオブジェクトです。
    if (this.event.type === "postback" && this.event.postback.data === "空のPostbackです") return true
  }

}



/**
 *  TEST用関数
 * */
function testEmptyPostback() {


  const e = EMPTYPOSTBACK_WebhookEvent_SAMPLE;
  console.log(e);
  const event = JSON.parse(e.postData.contents).events[0];

  const empty = new EmptyPostback(event);


  console.log(empty.isDomainObject());

}