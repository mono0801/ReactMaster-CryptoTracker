// 코인 리스트에서 1개 클릭시 해당 코인의 상세정보를 보여주는 페이지
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Link,
    Route,
    Switch,
    useLocation,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const Container = styled.div`
    max-width: 480px;

    padding: 0px 20px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IconDiv = styled.div`
    font-size: 175%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 15px;
        color: #45aaf2;
        font-weight: 450;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    margin: 25px 0px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    padding: 7px 0px;
    border-radius: 10px;

    text-align: center;

    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};

    a {
        display: block;
    }
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

// 인터페이스에선 일반적으로 이름 앞에 대문자 I를 붙인다
// Alt + Shift + i => 블록한 부분의 커서를 각 문장 맨끝으로 이동
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface ICoinProps {}

function Coin({}: ICoinProps) {
    const { coinId } = useParams<RouteParams>();
    // Coins.tsx에서 Link로 보낸 state: { name: coin.name }를 가져오기
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    // 함수 자체를 전달하기 위해 () => 사용
    const { isLoading: infoLoading, data: infodata } = useQuery<InfoData>(
        ["info", coinId],
        () => fetchCoinInfo(coinId)
    );
    const { isLoading: tickersLoading, data: tickersdata } =
        useQuery<PriceData>(
            ["tickers", coinId],
            () => fetchCoinTickers(coinId),
            {
                // 5초마다 fetch를 실행
                // refetchInterval: 5000,
            }
        );

    const loading = infoLoading || tickersLoading;

    const setIsDarkAtom = useSetRecoilState(isDarkAtom);
    const [isDark, setIsDark] = useState(true);
    const toggleTheme = () => {
        setIsDarkAtom((prev) => !prev);
        setIsDark((prev) => !prev);
    };

    /*     const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();

    useEffect(() => {
        (async () => {
            //코인의 정보 가져오기
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            // 코인의 가격 가져오기
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
        // [coinId] => coinId 변수가 변할 경우 useEffect 실행
    }, [coinId]); */

    return (
        <Container>
            <Helmet>
                <title>
                    Coin :
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infodata?.name}
                </title>
            </Helmet>
            <Header>
                <Link
                    to={{
                        pathname: `/`,
                    }}
                >
                    <IconDiv>
                        <IoHomeOutline />
                    </IconDiv>
                </Link>
                {/* state가 존재하면 .name 없으면 "Loading"표시 (삼항연산자) */}
                <Title>
                    {state?.name
                        ? state.name
                        : // home -> coin 순으로 페이지 접속이 아닌 곧바로 coin으로 접속 시
                        loading
                        ? "Loading..."
                        : infodata?.name}
                </Title>
                {isDark ? (
                    <IconDiv onClick={() => toggleTheme()}>
                        <MdOutlineWbSunny />
                    </IconDiv>
                ) : (
                    <IconDiv onClick={() => toggleTheme()}>
                        <FaMoon />
                    </IconDiv>
                )}
            </Header>

            {loading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            {/* infodata?.rank => infodata.name에 아무것도 없을 경우 undifine을 반환하게 한다 */}
                            <span>{infodata?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>-{infodata?.symbol}-</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Prcie</span>
                            <span>
                                ${tickersdata?.quotes?.USD?.price?.toFixed(3)}
                            </span>
                        </OverviewItem>
                    </Overview>

                    <Description>{infodata?.description}</Description>

                    <Overview>
                        <OverviewItem>
                            <span>Total Supply</span>
                            <span>{tickersdata?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply</span>
                            <span>{tickersdata?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                    </Tabs>

                    <Switch>
                        <Route path={`/${coinId}/price`}>
                            <Price coinId={coinId} />
                        </Route>
                        <Route path={`/${coinId}/chart`}>
                            <Chart coinId={coinId} />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
}
export default Coin;
