# -LINE-LINE-Official-Account-Management-Architecture
LINE公式アカウントをマネジメントするアーキテクチャです


変更履歴
2月9日
- イベントオブジェクトJSONをEnumに定義する
- 下記のテストが通ることを確認
- 公式へのテストも通ることを確認
- 以降は、ここのドメインオブジェクトの開発かなと思い、いったんテンプレート化した

```js
//ドメインオブジェクトを追加したときのテスト関数
function test_doPost() {
  const exports = GASUnit.exports
  const assertThat = AssertGAS.assertThat

  exports({
    'LINE公式アカウントのテストです': {
      '#doPost(e)のテストです': {
        'Followオブジェクトテスト': function () {
          const e = FOLLOW_WebhookEvent_SAMPLE;
          const result = doPost(e);
          console.log(result);
          const expectation = "Followオブジェクトは課題を解決したのでメールを送信しました"
          assertThat(result).is(expectation);
        },
        'UnFollowオブジェクトテスト': function () {
        const e = UNFOLLOW_WebhookEvent_SAMPLE;
        const result = doPost(e);
        console.log(result);
        const expectation = "UnFollowオブジェクトは課題を解決したのでメールを送信しました"
        assertThat(result).is(expectation);
        },
        'SpotInquryオブジェクトテスト': function () {
          const e = SpotInquiry_WebhookEvent_SAMPLE;
          const result = doPost(e);
          const expectation = "SpotInquiryオブジェクトは課題を解決したのでメールを送信しました"
          assertThat(result).is(expectation);
        },
        // 'PostBackオブジェクトテスト': function () {
        // const e = FOLLOW_WebhookEvent_SAMPLE;
        // const result = doPost(e);
        // const expectation = "Followオブジェクトは課題を解決したのでメールを送信しました"
        // assertThat(result).is(expectation);
        // }





      }
    }
  })
}
```
