package com.farm.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.farm.backend.service.PricePredictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/price")
@RequiredArgsConstructor
public class PriceController {

    private final PricePredictService pricePredictService;
    private final RestTemplate restTemplate = new RestTemplate();

    // ========== 주간 데이터 API ==============
    @GetMapping("/history-weekly")
    public ResponseEntity<?> getWeeklyHistory(
            @RequestParam String sdate,
            @RequestParam String edate,
            @RequestParam String whsalcd,
            @RequestParam String product // ← MIDNAME(사과·수박·참외·복숭아 등)
    ) {
        try {
            String baseUrl = "http://211.237.50.150:7080/openapi/"
                    + "ea0273ae5fe4ac47dcf337041bb7eb869549f2409cb60964ce1cf6d9d093ff86/json/";

            ObjectMapper mapper = new ObjectMapper();

            // 날짜 전체 리스트
            List<String> dateList = getDateRange(sdate, edate);

            // 날짜 → 평균 가격 저장
            Map<String, Double> dailyPrice = new HashMap<>();

            for (String date : dateList) {

                String apiUrl = baseUrl + "Grid_20240625000000000654_1/1/1000"
                        + "?SALEDATE=" + date
                        + "&WHSALCD=" + whsalcd;

                String json = restTemplate.getForObject(apiUrl, String.class);

                JsonNode rows = mapper.readTree(json)
                        .path("Grid_20240625000000000654_1")
                        .path("row");

                double weightedSum = 0;
                double totalQty = 0;

                for (JsonNode item : rows) {

                    // ★ MIDNAME(품목명) 기반 필터링
                    if (!item.get("MIDNAME").asText().equals(product))
                        continue;

                    try {
                        double cost = Double.parseDouble(item.get("COST").asText());
                        double qty = Double.parseDouble(item.get("QTY").asText());
                        double kg = Double.parseDouble(item.get("STD").asText().replaceAll("[^\\d.]", ""));

                        double perKg = cost / kg;

                        weightedSum += perKg * qty;
                        totalQty += qty;

                    } catch (Exception ignore) {
                    }
                }

                double avg = (totalQty == 0) ? -1 : weightedSum / totalQty;
                dailyPrice.put(date, avg);
            }

            // ======================= 주 단위 날짜 생성 ========================
            List<String> weeklyDates = new ArrayList<>();
            LocalDate start = LocalDate.parse(sdate, DateTimeFormatter.BASIC_ISO_DATE);

            while (!start.isAfter(LocalDate.parse(edate, DateTimeFormatter.BASIC_ISO_DATE))) {
                weeklyDates.add(start.format(DateTimeFormatter.BASIC_ISO_DATE));
                start = start.plusDays(7);
            }

            // ======================= 주간 가격 계산 ========================
            List<Double> weeklyPrices = new ArrayList<>();

            for (String weekStart : weeklyDates) {
                double weeklySum = 0;
                int validDays = 0;

                LocalDate d = LocalDate.parse(weekStart, DateTimeFormatter.BASIC_ISO_DATE);

                for (int i = 0; i < 7; i++) {
                    String day = d.plusDays(i).format(DateTimeFormatter.BASIC_ISO_DATE);

                    if (dailyPrice.containsKey(day)) {
                        double v = dailyPrice.get(day);
                        if (v != -1) { // -1은 데이터 없음 의미
                            weeklySum += v;
                            validDays++;
                        }
                    }
                }

                double weeklyAvg = (validDays == 0) ? 0.0 : weeklySum / validDays;
                weeklyPrices.add(weeklyAvg);
            }

            // ======================= 가격 예측 ========================
            int n = weeklyPrices.size();
            double[] x = new double[n];
            double[] y = new double[n];

            for (int i = 0; i < n; i++) {
                x[i] = i;
                y[i] = weeklyPrices.get(i);
            }

            double predicted = pricePredictService.predictPrice(x, y, n);

            // ======================= 결과 반환 ========================
            Map<String, Object> result = new HashMap<>();
            result.put("labels", weeklyDates); // 날짜
            result.put("avgPrices", weeklyPrices); // 주간 평균 가격
            result.put("predict", predicted); // 예측값
            result.put("product", product); // 품목명

            return ResponseEntity.ok(result);

    
    private final RestTemplate restTemplate;
    private static final String MARKET_LIST_URL = "http://211.237.50.150:7080/openapi/ea0273ae5fe4ac47dcf337041bb7eb869549f2409cb60964ce1cf6d9d093ff86/json/Grid_20240625000000000661_1/1/33";
    private static final String PRICE_DATA_URL = "http://211.237.50.150:7080/openapi/ea0273ae5fe4ac47dcf337041bb7eb869549f2409cb60964ce1cf6d9d093ff86/json/Grid_20240625000000000654_1/1/1000";
    
    public PriceController() {
        this.restTemplate = new RestTemplate();
    }
    
    // 시장 목록 조회
    @GetMapping("/markets")
    public ResponseEntity<?> getMarkets() {
        try {
            String response = restTemplate.getForObject(MARKET_LIST_URL, String.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ======================= 날짜 생성 유틸 ========================
    private List<String> getDateRange(String sdate, String edate) {
        DateTimeFormatter fmt = DateTimeFormatter.BASIC_ISO_DATE;
        LocalDate start = LocalDate.parse(sdate, fmt);
        LocalDate end = LocalDate.parse(edate, fmt);

        List<String> list = new ArrayList<>();
        for (LocalDate d = start; !d.isAfter(end); d = d.plusDays(1)) {
            list.add(d.format(fmt));
    
    // 가격 데이터 조회 (날짜 + 시장 필터)
    @GetMapping("/trend")
    public ResponseEntity<?> getPriceTrend(
            @RequestParam(required = false, defaultValue = "20250530") String saleDate,
            @RequestParam(required = false, defaultValue = "110001") String whsalCd) {
        try {
            String url = PRICE_DATA_URL + "?SALEDATE=" + saleDate + "&WHSALCD=" + whsalCd;
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
        return list;
    }
}
