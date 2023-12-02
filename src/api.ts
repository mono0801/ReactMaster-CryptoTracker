// API를 fetch하는 함수 생성
const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchCoinHistory(coinId: string) {
    /* // Date.now()로 현재 시간을 밀리초 이므로 / 1000을 하면 초 단위가 된다
    // Math.floor() => 숫자 내림
    const endDate = Math.floor(Date.now() / 1000);
    // 60초 * 60분 * 24시간 * 7일 = 1주일 전부터 시작
    const startDate = endDate - 60 * 60 * 24 * 7; */

    return fetch(
        // coinpaprika의 코인 시세 api가 유료로 변경되어 nomadcoder의 자체 제작 api 사용
        `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    ).then((response) => response.json());
}
