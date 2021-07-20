/**
 * ★メモ★
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


//------------------------------
// 定数系
//------------------------------

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


//------------------------------
// モジュール系
//------------------------------
/**
 * TeraTailユーザ情報
 * @author mahny
 */
class TeraUser {
    constructor(id, displayName) {
        this.id = id; // ユーザが手動入力した場合は、初期化時に取れないハズ。画面から登録する時はJSで拾えるので取れる
        this.displayName = displayName;
    }
}

/**
 * 答え害のないユーザの名前を染め上げちゃうクラス
 */
class TeraMarker {
    /**
     * 初期化
     * @param {TeraUser[]} blackList 染めちゃうユーザリスト
     */
    constructor(blackList) {
        this._watchIntervalMsec = 2000;
        this.blackList = blackList;

        this._dyeQuestions();
    }

    /**
     * 質問一覧、質問詳細画面で名前を染め上げちゃう
     */
    _dyeQuestions() {
        let query = "";
        this.blackList.forEach(b => {
            if (0 < query.length) {
                query += ', ';
            }
            query += 'a[href="/users/' + b.displayName + '"]';
        });

        const loop = () => {
            const elements = document.querySelectorAll(query);
            elements?.forEach(element => {
                element.style.color = '#ff0000';
            });
            setTimeout(loop, this._watchIntervalMsec);
        };
        setTimeout(loop, this._watchIntervalMsec);
    }
}

//------------------------------
// メイン処理
//------------------------------
new TeraMarker([
    new TeraUser(null, 'mahny'),
]);