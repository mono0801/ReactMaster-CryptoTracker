// Coin.tsx 페이지에 해당 코인의 차트를 보여주는 라우터

import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { validateHeaderValue } from "http";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IChart {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({ coinId }: IChart) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId)
        // 5초마다 fetch를 실행
        // { refetchInterval: 10000 }
    );

    const ohlcvData = data?.map((data: IHistorical) => ({
        x: data.time_close,
        y: [
            Number(data.open).toFixed(0),
            Number(data.high).toFixed(0),
            Number(data.low).toFixed(0),
            Number(data.close).toFixed(0),
        ],
    }));

    const isDark = useRecoilValue(isDarkAtom);

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <>
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "Price",
                                data: data?.map((price) =>
                                    Number(price.close)
                                ) as number[],
                            },
                        ]}
                        options={{
                            theme: {
                                mode: isDark ? "dark" : "light",
                            },
                            chart: {
                                background: "transparent",
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                            },
                            grid: {
                                show: false,
                            },
                            yaxis: { show: false },
                            xaxis: {
                                labels: { show: false },
                                axisBorder: { show: false },
                                axisTicks: { show: false },
                                type: "datetime",
                                categories: data?.map((price) =>
                                    new Date(price.time_close * 1000).toString()
                                ),
                            },
                            stroke: {
                                curve: "smooth",
                                width: 5,
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    gradientToColors: ["#0be881"],
                                    stops: [0, 100],
                                },
                            },
                            colors: ["#0fbcf9"],
                            tooltip: {
                                y: {
                                    formatter: (value) =>
                                        `$ ${value.toFixed(2)}`,
                                },
                            },
                        }}
                    />
                    <ApexChart
                        type="candlestick"
                        series={
                            [
                                {
                                    data: ohlcvData,
                                },
                            ] as unknown as number[]
                        }
                        options={{
                            theme: {
                                mode: isDark ? "dark" : "light",
                            },
                            chart: {
                                type: "candlestick",
                                background: "transparent",
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                            },
                            grid: {
                                show: false,
                            },
                            yaxis: { show: false },
                            xaxis: {
                                labels: { show: false },
                                axisBorder: { show: false },
                                axisTicks: { show: false },
                                type: "datetime",
                                categories: data?.map((price) =>
                                    new Date(price.time_close * 1000).toString()
                                ),
                            },
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default Chart;
