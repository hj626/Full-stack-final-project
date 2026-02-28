import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

// 캐러셀 반응형 설정
const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};


const PriceTrend = () => {
    const defaultMonth = '202505';
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
    const [selectedMarket, setSelectedMarket] = useState('110001');
    const [markets, setMarkets] = useState([]);
    const [summaryCards, setSummaryCards] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [monthAverage, setMonthAverage] = useState(null);
    const [prevMonthAverage, setPrevMonthAverage] = useState(null);

    // 시장 목록 가져오기
    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/price/markets"
                );
                const marketData = response.data.Grid_20240625000000000661_1;

                if (marketData && marketData.row) {
                    setMarkets(marketData.row);
                }
            } catch (err) {
                console.error("Error fetching markets:", err);
            }
        };
        fetchMarkets();
    }, []);

    // 월별 요약 데이터 가져오기
    const fetchPriceData = async (month, marketCd) => {
        setLoading(true);
        setError(null);

        try {
            await processSummaryCards(month, marketCd);
        } catch (err) {
            setError(err?.message || '데이터를 불러오지 못했습니다.');
            console.error('Error fetching price data:', err);
        } finally {
            setLoading(false);
        }
    };

    const extractKgFromStd = (std) => {
        if (!std) return 1;
        const match = std.match(/([\d.]+)\s*kg/i);
        return match ? parseFloat(match[1]) : 1;
    };

    const calculatePricePerKg = (item) => {
        const cost = parseFloat(item.COST) || 0;
        const kgPerUnit = extractKgFromStd(item.STD);
        return kgPerUnit > 0 ? cost / kgPerUnit : 0;
    };

    // 요약 카드 데이터 처리 (전달 평균 대비 상승률)
    const processSummaryCards = async (currentMonth, marketCd) => {
        const aggregateMonthlyStats = (monthlyData) => {
            const grouped = monthlyData.reduce((acc, dayData) => {
                dayData.data.forEach((item) => {
                    const itemName = item.MIDNAME;
                    const pricePerKg = calculatePricePerKg(item);
                    if (Number.isNaN(pricePerKg)) {
                        return;
                    }
                    if (!acc[itemName]) {
                        acc[itemName] = { sum: 0, count: 0 };
                    }
                    acc[itemName].sum += pricePerKg;
                    acc[itemName].count += 1;
                });
                return acc;
            }, {});

            return Object.keys(grouped).reduce((result, itemName) => {
                const { sum, count } = grouped[itemName];
                if (count === 0) {
                    return result;
                }
                result[itemName] = {
                    avg: Math.round(sum / count),
                    count,
                };
                return result;
            }, {});
        };

        try {
            const currentMonthData = await fetchMonthData(currentMonth, marketCd);
            if (currentMonthData.length === 0) {
                setSummaryCards([]);
                setSelectedItem(null);
                return;
            }
            const year = parseInt(currentMonth.substring(0, 4));
            const monthIndex = parseInt(currentMonth.substring(4, 6)) - 1;
            const previousMonthDate = new Date(year, monthIndex, 1);
            previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
            const previousMonthStr =
                previousMonthDate.getFullYear() +
                String(previousMonthDate.getMonth() + 1).padStart(2, '0');

            const previousMonthData = await fetchMonthData(previousMonthStr, marketCd);

            const currentStats = aggregateMonthlyStats(currentMonthData);
            const previousStats = aggregateMonthlyStats(previousMonthData);

            const cards = Object.keys(currentStats).map((itemName) => {
                const { avg: avgPrice, count } = currentStats[itemName];
                const prevAvg = previousStats[itemName]?.avg;
                const rateValue =
                    prevAvg && prevAvg > 0
                        ? ((avgPrice - prevAvg) / prevAvg) * 100
                        : 0;

                return {
                    name: itemName,
                    value: avgPrice.toLocaleString(),
                    monthlyAverage: avgPrice,
                    count,
                    rate: `${Math.abs(rateValue).toFixed(1)}%`,
                    rateValue: rateValue,
                    up: rateValue >= 0
                };
            });

            const topCards = cards
                .sort((a, b) => {
                    if (b.count !== a.count) {
                        return b.count - a.count;
                    }
                    return Math.abs(b.rateValue) - Math.abs(a.rateValue);
                })
                .slice(0, 10);

            setSummaryCards(topCards);

            if (topCards.length > 0) {
                setSelectedItem(topCards[0].name);
            } else {
                setSelectedItem(null);
            }
        } catch (err) {
            console.error('Error processing summary cards:', err);
            throw err;
        }
    };

    // 선택된 월의 모든 데이터를 가져오는 함수
    const fetchMonthData = async (month, marketCd) => {
        try {
            const year = parseInt(month.substring(0, 4));
            const monthIndex = parseInt(month.substring(4, 6)) - 1;
            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

            const requests = [];
            const dates = [];

            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${year}${String(monthIndex + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`;
                dates.push(dateStr);
                requests.push(
                    axios
                        .get('http://localhost:8080/api/price/trend', {
                            params: {
                                saleDate: dateStr,
                                whsalCd: marketCd
                            }
                        })
                        .catch((err) => {
                            console.error('Error fetching day data:', dateStr, err);
                            return null;
                        })
                );
            }

            const responses = await Promise.all(requests);
            return dates.map((dateStr, index) => ({
                date: dateStr,
                data: responses[index]?.data?.Grid_20240625000000000654_1?.row || []
            }));
        } catch (err) {
            console.error('Error fetching month data:', err);
            return [];
        }
    };

    const buildDailyAverageMap = (monthData, itemName) => {
        return monthData.reduce((acc, dayData) => {
            const itemData = dayData.data.filter((item) => item.MIDNAME === itemName);
            if (itemData.length === 0) {
                return acc;
            }
            const avgPrice =
                itemData.reduce((sum, item) => {
                    return sum + calculatePricePerKg(item);
                }, 0) / itemData.length;
            const rounded = Math.round(avgPrice);
            const day = parseInt(dayData.date.substring(6, 8), 10);
            acc[day] = rounded;
            return acc;
        }, {});
    };

    const calculateOverallAverage = (values) => {
        if (!values.length) {
            return null;
        }
        return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    };

    // 선택된 품목의 차트 데이터 생성 (월별 구간 평균)
    useEffect(() => {
        const loadChartData = async () => {
            if (!(selectedItem && selectedMonth && selectedMarket)) {
                setChartData(null);
                setMonthAverage(null);
                setPrevMonthAverage(null);
                return;
            }

            const monthData = await fetchMonthData(selectedMonth, selectedMarket);

            if (monthData.length > 0) {
                const year = parseInt(selectedMonth.substring(0, 4));
                const monthIndex = parseInt(selectedMonth.substring(4, 6)) - 1;
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                const segments = [
                    { label: '1~7일', start: 1, end: Math.min(7, daysInMonth) },
                    { label: '8~14일', start: 8, end: Math.min(14, daysInMonth) },
                    { label: '15~21일', start: 15, end: Math.min(21, daysInMonth) },
                    { label: '22~28일', start: 22, end: Math.min(28, daysInMonth) },
                    ...(daysInMonth >= 29
                        ? [{ label: '29~말일', start: 29, end: daysInMonth }]
                        : [])
                ];

                const dailyAverageMap = buildDailyAverageMap(monthData, selectedItem);
                const allDailyValues = Object.values(dailyAverageMap);
                setMonthAverage(calculateOverallAverage(allDailyValues));

                const previousMonthDate = new Date(year, monthIndex, 1);
                previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
                const previousMonthStr =
                    previousMonthDate.getFullYear() +
                    String(previousMonthDate.getMonth() + 1).padStart(2, '0');
                const previousMonthData = await fetchMonthData(previousMonthStr, selectedMarket);
                const previousDailyAverageMap = buildDailyAverageMap(previousMonthData, selectedItem);
                setPrevMonthAverage(
                    calculateOverallAverage(Object.values(previousDailyAverageMap))
                );

                const segmentValues = segments.map((segment) => {
                    const values = Object.entries(dailyAverageMap)
                        .filter(([day]) => {
                            const numericDay = parseInt(day, 10);
                            return numericDay >= segment.start && numericDay <= segment.end;
                        })
                        .map(([, value]) => value);

                    if (values.length === 0) {
                        return null;
                    }

                    return Math.round(
                        values.reduce((sum, value) => sum + value, 0) / values.length
                    );
                });

                const chart = {
                    labels: segments.map((segment) => segment.label),
                    datasets: [
                        {
                            label: `${selectedItem} 월간 구간 평균 가격`,
                            data: segmentValues,
                            borderColor: "#ff4d4d",
                            backgroundColor: "rgba(255,77,77,0.3)",
                            tension: 0,
                            fill: false,
                            spanGaps: false,
                        }
                    ],
                };

                setChartData(chart);
            } else {
                setChartData(null);
                setMonthAverage(null);
                setPrevMonthAverage(null);
            }
        };
        loadChartData();
    }, [selectedItem, selectedMonth, selectedMarket]);

    useEffect(() => {
        fetchPriceData(selectedMonth, selectedMarket);
    }, [selectedMonth, selectedMarket]);

    if (loading) {
        return (
            <div
                className="container mb-5 text-center"
                style={{ minHeight: "400px", paddingTop: "100px" }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">데이터를 불러오는 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="container mb-5 text-center"
                style={{ minHeight: "400px", paddingTop: "100px" }}
            >
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">에러 발생</h4>
                    <p>{error}</p>
                    <hr />
                    <button className="btn btn-primary" onClick={() => fetchPriceData(selectedMonth, selectedMarket)}>
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    if (!chartData) {
        return (
            <div
                className="container mb-5 text-center"
                style={{ minHeight: "400px", paddingTop: "100px" }}
            >
                <p className="text-muted">데이터가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="container mb-5">
            {/* 제목 */}
            <div
                className="section-header text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: "600px" }}
            >
                <h2 className="display-5 mb-3">주요 품목 가격동향</h2>
                <p className="text-muted">월과 시장을 선택하면 해당 기간의 가격 흐름을 확인할 수 있어요.</p>
            </div>

            {/* 날짜 및 시장 선택 */}
            <div className="filter-panel shadow-sm bg-white p-4 mb-4 d-flex flex-wrap justify-content-center gap-4">
                <div className="filter-item">
                    <label className="form-label fw-bold">월 선택</label>
                    <input 
                        type="month" 
                        className="form-control filter-control"
                        value={selectedMonth.replace(/(\d{4})(\d{2})/, '$1-$2')}
                        onChange={(e) => {
                            const newMonth = e.target.value.replace(/-/g, '');
                            setSelectedMonth(newMonth);
                        }}
                    />
                </div>
                <div className="filter-item">
                    <label className="form-label fw-bold">시장 선택</label>
                    <select 
                        className="form-select filter-control"
                        value={selectedMarket}
                        onChange={(e) => {
                            setSelectedMarket(e.target.value);
                            // processSummaryCards에서 자동으로 첫 번째 카드를 선택하므로 여기서는 제거
                        }}
                    >
                        {markets.map((market) => (
                            <option key={market.CODEID} value={market.CODEID}>
                                {market.CODENAME}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 카드 영역 */}
            <div className="carousel-wrapper bg-white shadow-sm p-4 mb-4">
                <Carousel
                    responsive={responsive}
                    swipeable
                    draggable
                    showDots={false}
                    infinite={true}
                    keyBoardControl
                    containerClass="carousel-container"
                    itemClass="px-2"
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    transitionDuration={500}
                >
                    {summaryCards.map((item, idx) => (
                        <div className="col-lg-10 col-md-10 col-sm-10" style={{ minWidth: '200px' }} key={idx}>
                            <div
                                className={`price-card text-center p-3 ${
                                    selectedItem === item.name ? "selected-card" : ""
                                }`}
                                onClick={() => setSelectedItem(item.name)}
                                style={{ cursor: "pointer" }}
                            >
                                <h6 className="text-secondary">{item.name}</h6>
                                <p className="text-muted small mb-1">월평균</p>
                                <h2 className="fw-bold" style={{fontSize: '1.5rem'}}>{item.value}원</h2>
                                <span className={item.up ? "text-danger fw-bold" : "text-primary fw-bold"}>
                                    전월 대비 {item.rate} {item.up ? "▲" : "▼"}
                                </span>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* 그래프 영역 */}
            <div className="graph-card bg-white shadow-sm p-4">
                <h4 className="fw-bold mb-3">{selectedItem} 월간 구간 평균 가격</h4>
                {prevMonthAverage !== null && (
                    <p className="text-muted small mb-1">
                        전월 평균 가격: {prevMonthAverage.toLocaleString()}원
                    </p>
                )}
                {monthAverage !== null && (
                    <p className="text-primary fw-semibold mb-3">
                        이번달 평균 가격: {monthAverage.toLocaleString()}원
                    </p>
                )}
                <Line data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + '원';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString() + '원';
                                }
                            }
                        }
                    }
                }} />
                <p className="text-muted small mt-3">
                    ※ 카드의 상승률은 전달 월평균 대비 변동률입니다.
                </p>
            </div>

            {/* 내부 스타일 */}
            <style>{`
                .filter-panel {
                    border: 1px solid #eef2f6;
                }
                .filter-item {
                    min-width: 220px;
                }
                .filter-control {
                    border-radius: 0.75rem;
                    background: #f8fafc;
                    border-color: #dbe4f0;
                }
                .filter-control:focus {
                    box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.15);
                    border-color: #86b7fe;
                    background: #ffffff;
                }
                .carousel-wrapper {
                    border: 1px solid #eef2f6;
                }
                .price-card {
                    transition: 0.25s;
                    background: white;
                }
                .price-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 5px 16px rgba(0,0,0,0.15);
                }
                .selected-card {
                    border: 2px solid #007bff !important;
                    background: #e9f3ff !important;
                }
                .graph-card {
                    min-height: 350px;
                }
                .react-multiple-carousel__arrow {
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0.85;
                }
                .react-multiple-carousel__arrow--left {
                    left: -25px;
                }
                .react-multiple-carousel__arrow--right {
                    right: -25px;
                }
            `}</style>
        </div>
    );
};

export default PriceTrend;
