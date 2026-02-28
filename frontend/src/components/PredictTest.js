import axios from "axios";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

// 한국식 날짜 변환 함수
const formatKoreanDate = (yyyymmdd) => {
  const month = parseInt(yyyymmdd.substring(4, 6));
  const day = parseInt(yyyymmdd.substring(6, 8));
  return `${month}월 ${day}일`;
};

function PredictTest() {
  const [chartData, setChartData] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  // 품목 리스트 (MIDNAME 기반)
  const productList = [
    "사과",
    "수박",
    "참외",
    "복숭아",
    "배",
    "포도",
    "바나나"
  ];

  const [product, setProduct] = useState(productList[0]); // 기본값 = 사과

  // Chart.js 옵션 (툴팁 소수점 제거 + 원 표시)
  const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (ctx) {
          const value = Math.round(ctx.raw);
          return `${ctx.dataset.label}: ${value.toLocaleString()}원`;
        },
      },
    },
    legend: {
      labels: {
        font: { size: 14 }
      }
    }
  },

  // 격자선 제거
  scales: {
    x: {
      grid: {
        display: false, // x축 격자선
      },
      ticks: {
        font: { size: 13 },
      }
    },
    y: {
      grid: {
        display: true, // y축 격자선
      },
      ticks: {
        font: { size: 13 },
      }
    }
  }
};


  const handlePredict = () => {
    setLoading(true);
    setChartData(null);
    setPredictedPrice(null);

    axios
      .get("http://localhost:8080/api/price/history-weekly", {
        params: {
          sdate: "20250501",
          edate: "20250730",
          whsalcd: "210001",
          product: product // MIDNAME 기반 검색
        }
      })
      .then((res) => {
        const { labels, avgPrices, predict } = res.data;

        const koreanLabels = labels.map(formatKoreanDate);
        const finalLabels = [...koreanLabels, "예측"];
        const priceData = [...avgPrices, predict];

        setPredictedPrice(predict);

        setChartData({
          labels: finalLabels,
          datasets: [
            {
              label: `${product} 주 평균 가격 (원/kg)`,
              data: priceData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.25,
              fill: true,
              pointRadius: (ctx) =>
                ctx.dataIndex === priceData.length - 1 ? 7 : 5,
              pointBorderColor: (ctx) =>
                ctx.dataIndex === priceData.length - 1 ? "red" : "rgba(75,192,192,1)",
              pointBackgroundColor: (ctx) =>
                ctx.dataIndex === priceData.length - 1 ? "red" : "white",
            },
          ],
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ width: "900px", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "32px" }}>
        주간 가격 추이 & 예측 그래프
      </h2>

      {/* 품목 선택 */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        >
          {productList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <button onClick={handlePredict}>가격 추이 가져오기</button>
      </div>

      {/* 로딩 메시지 */}
      {loading && (
        <p style={{ fontSize: "20px", color: "#555", marginTop: "15px" }}>
          🔄 {product} 가격 추이를 계산중입니다...
        </p>
      )}

      {/* 예측 가격 */}
      {!loading && predictedPrice && (
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          예상 다음 주 가격: <b>{Math.round(predictedPrice).toLocaleString()}</b> 원
        </p>
      )}

      {/* 그래프 */}
      {!loading && chartData && (
        <div style={{ height: "420px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default PredictTest;
