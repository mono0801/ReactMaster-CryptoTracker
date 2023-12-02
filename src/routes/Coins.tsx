// 코인 리스트를 보여주는 페이지
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atom";

const Container = styled.div`
    max-width: 480px;

    padding: 0px 20px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};

    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid ${(props) => props.theme.textColor};

    a {
        // a태그의 범위를 카드의 흰색 배경 끝까지로 지정
        display: flex;
        align-items: center;
        padding: 20px;

        transition: color 0.2s ease-in;
    }

    &:hover {
        // <Link>를 썻지만 브라우저에선 자동적으로 a 태그로 변환된다
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
    /* // array이기 때문에 <ICoin[]>로 사용
    const [coins, setCoins] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // funtion() ()를 하면 앞의 함수가 즉시 실행된다
        (async () => {
            const response = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []); */

    // 위의 주석을 react-query를 통해 1줄로 바꿀 수 있다
    // isLoading은 useQuery의 결과가 true인지 false인지를 나타낸다
    // useQuery의 결과를 data에 넣는다.
    // data는 캐시에 저장되어 있어서 한번 저장되면 loading창이 뜨지 않는다

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    console.log(data?.slice(0, 100));

    const setIsDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleTheme = () => setIsDarkAtom((prev) => !prev);

    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <button onClick={() => toggleTheme()}>Theme</button>
            </Header>

            {isLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        // &rarr : 오른쪽 화살표 [html 태그]
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    // Link로 다른 페이지로 이동할 때 state를 전달
                                    state: { name: coin.name },
                                }}
                            >
                                <Img
                                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;
