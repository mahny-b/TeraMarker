https://cdn.jsdelivr.net/npm/angular@1.8.2/index.min.js



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