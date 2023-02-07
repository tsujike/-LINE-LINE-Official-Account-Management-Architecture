//アプリケーション層
//データベースや外部システムとの通信を担当するリポジトリクラスや
//外部システムとのインターフェースを提供するサービスクラスなどを持ちます
//設計は「Appliaction」という名前からスタートします
class Appliaction {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {
    this.event = event;

    //ドメインオブジェクト群
    this.domainObjects = {
      Follow: new Follow(),
      Unfollow: new Unfollow()
      //ドメインオブジェクトに変更があったら足す
    }
  }

  /** 特定のドメインオブジェクトの課題を処理するメソッド
   */
  getSolutions() {
    const domainObject = this.getDomainObject_();
    domainObject.getSolution();
  }


  /** ドメインオブジェクトを取得するメソッド
   * @return{object} ドメインオブジェクト
   */
  getDomainObject_() {
    for (const domainObject of this.domainObjects) {
      if (domainObject.isDomainObject(this.event)) {
        const domainName = domainObject.getName();
        return this.domainObjects[domainName]
      }
    }
  }



}


//上記クラスのテスト関数
function test_Appliaction() {

  const exports = GASUnit.exports
  const assertThat = AssertGAS.assertThat

  exports({
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function () {
          const index = [1, 2, 3].indexOf(4)
          assertThat(index).is(-1)
        },
        'should return the index when present': function () {
          const index = [1, 2, 3].indexOf(3)
          assertThat(index).is(2)
        }
      }
    }
  })
}
