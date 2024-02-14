// Coin.tsx 페이지에 해당 코인의 가격을 보여주는 라우터

import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoinTickers } from "../api";

const Overview = styled.div`
    background-color: rgba(0, 0, 0, 0.5);

    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewExtend = styled(Overview)`
    display: flex;
    justify-content: space-between;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const OverviewItemExtend = styled(OverviewItem)`
    span:first-child {
        font-size: 15px;
        color: #45aaf2;
        font-weight: 450;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Tabs = styled.div`
    margin: 25px 0px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;
`;

const Span = styled.span`
    font-size: 200%;
`;

interface IChart {
    coinId: string;
}

interface PriceData {
    quotes: {
        USD: {
            // 최고가
            ath_date: string;
            ath_price: number;
            percent_from_price_ath: number;

            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
        };
    };
}

function Price({ coinId }: IChart) {
    const { isLoading: tickersLoading, data: tickersdata } =
        useQuery<PriceData>(
            ["tickers", coinId],
            () => fetchCoinTickers(coinId),
            {
                // 5초마다 fetch를 실행
                // refetchInterval: 5000,
            }
        );
    return (
        <div>
            {tickersLoading ? (
                "Loading Price"
            ) : (
                <>
                    <OverviewExtend>
                        <OverviewItemExtend>
                            <span>최고가</span>
                            <span>{tickersdata?.quotes.USD.ath_date} 기준</span>
                        </OverviewItemExtend>
                        <OverviewItem>
                            <span></span>
                            <Span>
                                ${tickersdata?.quotes.USD.ath_price.toFixed(2)}
                            </Span>
                        </OverviewItem>
                    </OverviewExtend>

                    <Tabs>
                        <Overview>
                            <OverviewItemExtend>
                                <span>1시간 전보다</span>
                                <Span>
                                    {tickersdata?.quotes.USD.percent_change_1h.toFixed(
                                        1
                                    )}
                                    %
                                </Span>
                            </OverviewItemExtend>
                        </Overview>
                        <Overview>
                            <OverviewItemExtend>
                                <span>6시간 전보다</span>
                                <Span>
                                    {tickersdata?.quotes.USD.percent_change_6h.toFixed(
                                        1
                                    )}
                                    %
                                </Span>
                            </OverviewItemExtend>
                        </Overview>
                        <Overview>
                            <OverviewItemExtend>
                                <span>12시간 전보다</span>
                                <Span>
                                    {tickersdata?.quotes.USD.percent_change_12h.toFixed(
                                        1
                                    )}
                                    %
                                </Span>
                            </OverviewItemExtend>
                        </Overview>
                        <Overview>
                            <OverviewItemExtend>
                                <span>1일 전보다</span>
                                <Span>
                                    {tickersdata?.quotes.USD.percent_change_24h.toFixed(
                                        1
                                    )}
                                    %
                                </Span>
                            </OverviewItemExtend>
                        </Overview>
                        <Overview>
                            <OverviewItemExtend>
                                <span>1주일 전보다</span>
                                <Span>
                                    {tickersdata?.quotes.USD.percent_change_7d.toFixed(
                                        1
                                    )}
                                    %
                                </Span>
                            </OverviewItemExtend>
                        </Overview>
                        <Overview>
                            <OverviewItemExtend>
                                <span>1달 전보다</span>
                                <Span>
                                    {tickersdata?.quotes.USD.percent_change_30d.toFixed(
                                        1
                                    )}
                                    %
                                </Span>
                            </OverviewItemExtend>
                        </Overview>
                    </Tabs>
                </>
            )}
        </div>
    );
}

export default Price;
