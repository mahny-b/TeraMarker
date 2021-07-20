const Config = {
    accessToken: 'アクセストークン',
    baseUrl: 'https://teratail.com/api/v1',
}

const Endpoint = {
    users: '/users',
    usersSearch: '/users/search',
    question: '/question',
    users: '',
}

/*
 * # ユーザの名前を赤くしちゃう機能
 * - 質問一覧画面（質問者の名前）
 * - 質問画面の詳細（質問、回答、コメント上の名前）
 * - ユーザ詳細画面（全体的に？）
 * - ユーザランキング（まあ、ここまでやるのは過剰かなあ…）
 * 
 * # 妄想
 * - 評価の共有機能
 *     - 評価が悪いユーザをシェアする…多分荒れる火種になるよなあ…まずはクローズな機能に特化した方が良いか
 * - 赤以外の着色機能
 *     - これはありかなと思う
 * - 保存場所
 *     - ベタなのはHTML5のローカルストレージ
 *     - おそらく正しいのはGoogleのStorageAPI
 *     - 編集の簡単さならスプレッドシート。共有させる機能はこれを活用すると楽そうだけど、スプレッドシートの権限周りで面倒だよな…
 */


/**
 * Teratail APIを利用した機能をクラス化したもの
 * @author mahny
 */
class TeraMarker {
    constructor() {
        // nop
    }
}

/**
 * TeraTailユーザ情報
 * @author mahny
 */
class TeraUser {
    constructor(id, displayName) {
        this.id = id; // ユーザが手動入力した場合は、初期化時に取れないハズ。画面から登録する時はJSで拾えるので取れる
        this.displayName = displayName;

        // リネーム対策にidを取る
        if (!this.id) {
            const self = this;
            new Promise((resolve, reject) => {
                resolve('取得したid');
            }).then(result => {
                if (result) {
                    self.id = result;
                }
            });
        }
    }

    /**
     * サムネイルURLからIDを抽出する。未指定時はdisplay_nameからAPIを使用して逆引きする
     * @param {string} photo サムネイルURL
     */
    _extractId(photo) {
        if (!photo || typeof(photo) != 'string') {
            throw 'サムネイルURLが取得できませんでした / photo=[' + photo + ']';
        }
        this.id = 'サムネURLからidを抽出する正規表現';
    }
}

/**
 * 指定したURLにGetリクエストを投げて結果を取得する
 * @param {string} url リクエストURL
 * @returns {json} レスポンスJSON
 */
function httpGet(url) {
    // TODO 20210719 mahny angular使うかなあ、ベタでやるかなあ…
    const req = new XMLHttpRequest();
    req.open('GET', url);

}