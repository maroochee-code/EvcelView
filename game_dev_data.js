// 게임 개발 데이터 관리 시나리오
const gameDevDataScenario = {
    id: "game_dev_data",
    title: "게임 개발 데이터 관리",
    description: "게임 개발과 운영에 필요한 각종 데이터를 체계적으로 분석하고 관리하는 방법을 학습합니다.",
    
    // 단계별 가이드
    steps: [
        {
            step: 1,
            title: "유저 리텐션 분석",
            description: "D1, D7, D30 리텐션율을 계산하여 게임의 재미요소를 파악합니다.",
            functions: ["COUNTIFS", "IF", "ROUND"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["가입일", "총가입자", "D1복귀", "D7복귀", "D30복귀"],
                    ["2025-05-01", "1000", "800", "600", "300"],
                    ["2025-05-02", "1200", "950", "720", "400"],
                    ["2025-05-03", "800", "640", "480", "200"]
                ],
                formula: "=ROUND(C2/B2*100,1)",
                result: "80.0%",
                explanation: "D1 리텐션 = (다음날 복귀 유저 / 총 가입자) × 100"
            }
        },
        {
            step: 2,
            title: "플랫폼별 매출 분석",
            description: "iOS, Android, Steam 등 플랫폼별 매출을 비교 분석합니다.",
            functions: ["SUMIFS", "VLOOKUP", "RANK"],
            example: {
                data: [
                    ["A", "B", "C", "D"],
                    ["플랫폼", "월매출", "점유율", "순위"],
                    ["iOS", "500000000", "=B2/SUM(B$2:B$4)*100", "=RANK(B2,B$2:B$4,0)"],
                    ["Android", "800000000", "=B3/SUM(B$2:B$4)*100", "=RANK(B3,B$2:B$4,0)"],
                    ["Steam", "200000000", "=B4/SUM(B$2:B$4)*100", "=RANK(B4,B$2:B$4,0)"]
                ],
                formula: "=SUMIFS(매출범위,플랫폼범위,\"iOS\")",
                result: "500,000,000원",
                explanation: "특정 플랫폼의 총매출을 조건부 합계로 계산"
            }
        },
        {
            step: 3,
            title: "게임 밸런싱 데이터",
            description: "아이템 드롭률, 경험치 테이블 등 게임 밸런싱 데이터를 설계합니다.",
            functions: ["RAND", "IF", "VLOOKUP"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["아이템", "등급", "드롭률", "랜덤값", "드롭여부"],
                    ["전설템", "5성", "0.01", "=RAND()", "=IF(D2<=C2,\"드롭\",\"미드롭\")"],
                    ["희귀템", "4성", "0.05", "=RAND()", "=IF(D3<=C3,\"드롭\",\"미드롭\")"],
                    ["일반템", "3성", "0.3", "=RAND()", "=IF(D4<=C4,\"드롭\",\"미드롭\")"]
                ],
                formula: "=IF(RAND()<=0.01,\"전설템 드롭!\",\"꽝\")",
                result: "확률적 드롭 결과",
                explanation: "랜덤값이 설정된 확률 이하일 때 아이템이 드롭됩니다."
            }
        },
        {
            step: 4,
            title: "수익성 분석 (ARPU/LTV)",
            description: "유저당 평균 매출과 생애 가치를 계산하여 수익성을 분석합니다.",
            functions: ["AVERAGE", "SUMIFS", "DATEDIF"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["유저ID", "가입일", "총결제액", "활동기간", "월평균결제"],
                    ["USER001", "2025-01-01", "150000", "=DATEDIF(B2,TODAY(),\"M\")", "=C2/D2"],
                    ["USER002", "2025-02-15", "80000", "=DATEDIF(B3,TODAY(),\"M\")", "=C3/D3"],
                    ["USER003", "2025-03-10", "200000", "=DATEDIF(B4,TODAY(),\"M\")", "=C4/D4"]
                ],
                formula: "=AVERAGE(E2:E4)",
                result: "월평균 ARPU 계산",
                explanation: "유저별 월평균 결제액을 계산하여 ARPU를 산출합니다."
            }
        },
        {
            step: 5,
            title: "KPI 대시보드 구성",
            description: "DAU, MAU, 매출 등 핵심 지표를 한눈에 볼 수 있는 대시보드를 만듭니다.",
            functions: ["COUNTIFS", "SUMIFS", "AVERAGEIFS"],
            example: {
                data: [
                    ["A", "B", "C", "D"],
                    ["지표", "당월", "전월", "증감률"],
                    ["DAU", "=AVERAGE(일별활성유저)", "25000", "=ROUND((B2-C2)/C2*100,1)"],
                    ["MAU", "=COUNTIFS(로그인일,\">=\"&EOMONTH(TODAY(),-1)+1)", "80000", "=ROUND((B3-C3)/C3*100,1)"],
                    ["월매출", "=SUMIFS(결제액,결제일,\">=\"&EOMONTH(TODAY(),-1)+1)", "500000000", "=ROUND((B4-C4)/C4*100,1)"]
                ],
                formula: "=COUNTIFS(날짜범위,\">=\"&DATE(2025,5,1),날짜범위,\"<=\"&DATE(2025,5,31))",
                result: "월간 활성 유저 수",
                explanation: "특정 기간 내 활성 유저 수를 조건부 개수세기로 계산합니다."
            }
        }
    ],
    
    // 관련 함수들
    relatedFunctions: [
        {
            name: "COUNTIFS",
            usage: "조건부 유저 수 계산",
            formula: "=COUNTIFS(레벨,\">10\",결제여부,\"Y\")",
            description: "레벨 10 이상 결제 유저 수 계산"
        },
        {
            name: "SUMIFS",
            usage: "조건부 매출 합계",
            formula: "=SUMIFS(매출,날짜,\">=\"&A1,플랫폼,\"iOS\")",
            description: "특정 기간 iOS 매출 합계"
        },
        {
            name: "AVERAGEIFS",
            usage: "조건부 평균 계산",
            formula: "=AVERAGEIFS(결제액,레벨,\">20\")",
            description: "고레벨 유저의 평균 결제액"
        },
        {
            name: "PERCENTILE",
            usage: "상위 결제 유저 분석",
            formula: "=PERCENTILE(결제액,0.95)",
            description: "상위 5% 유저의 결제 기준점"
        },
        {
            name: "CORREL",
            usage: "변수 간 상관관계 분석",
            formula: "=CORREL(플레이시간,결제액)",
            description: "플레이시간과 결제액의 상관관계"
        },
        {
            name: "STDEV",
            usage: "데이터 편차 분석",
            formula: "=STDEV(일별매출)",
            description: "매출의 변동성 측정"
        },
        {
            name: "RAND",
            usage: "확률 시뮬레이션",
            formula: "=IF(RAND()<0.01,\"레어아이템\",\"일반아이템\")",
            description: "1% 확률로 레어아이템 드롭"
        },
        {
            name: "VLOOKUP",
            usage: "레벨별 데이터 조회",
            formula: "=VLOOKUP(현재레벨,경험치테이블,2,TRUE)",
            description: "레벨에 따른 필요 경험치 조회"
        }
    ],
    
    // 실무 팁
    practicalTips: [
        {
            title: "리텐션 분석 자동화",
            tip: "가입일 기준으로 자동으로 D1, D7, D30 리텐션을 계산하는 템플릿을 만들어두세요."
        },
        {
            title: "매출 분석 세분화",
            tip: "국가별, 연령대별, 결제수단별로 매출을 세분화하여 분석하면 인사이트를 얻을 수 있습니다."
        },
        {
            title: "A/B 테스트 결과 분석",
            tip: "새로운 기능의 효과를 측정할 때 통계적 유의성을 확인하는 것이 중요합니다."
        },
        {
            title: "예측 모델링",
            tip: "과거 데이터를 바탕으로 미래 매출이나 유저 수를 예측하는 모델을 만들어보세요."
        }
    ],
    
    // 게임별 특화 분석
    gameSpecificAnalysis: [
        {
            gameType: "모바일 RPG",
            keyMetrics: ["리텐션율", "결제전환율", "레벨진행속도", "PVP참여율"],
            formula: "=COUNTIFS(레벨,\">10\",결제여부,\"Y\")/COUNTIFS(레벨,\">10\")"
        },
        {
            gameType: "퍼즐 게임",
            keyMetrics: ["스테이지클리어율", "부스터사용량", "광고시청률", "재도전율"],
            formula: "=COUNTIFS(스테이지,A1,클리어여부,\"성공\")/COUNTIFS(스테이지,A1)"
        },
        {
            gameType: "전략 게임",
            keyMetrics: ["길드가입율", "전투참여도", "자원생산량", "동맹활동"],
            formula: "=AVERAGEIFS(전투횟수,레벨,\">30\",길드여부,\"가입\")"
        }
    ],
    
    // 템플릿 데이터
    templateData: {
        headers: ["날짜", "DAU", "신규가입", "결제유저", "매출", "ARPU", "리텐션D1"],
        sampleData: [
            ["2025-05-01", "25000", "1000", "800", "5000000", "=E2/C2", "=COUNTIFS(가입일,A2,D1복귀,\"Y\")/COUNTIFS(가입일,A2)"],
            ["2025-05-02", "26500", "1200", "900", "6000000", "=E3/C3", "=COUNTIFS(가입일,A3,D1복귀,\"Y\")/COUNTIFS(가입일,A3)"],
            ["2025-05-03", "24800", "800", "750", "4500000", "=E4/C4", "=COUNTIFS(가입일,A4,D1복귀,\"Y\")/COUNTIFS(가입일,A4)"]
        ]
    },
    
    // 차트 추천
    recommendedCharts: [
        {
            type: "Line Chart",
            purpose: "DAU/MAU 트렌드 분석",
            description: "시간에 따른 활성 유저 변화 추이"
        },
        {
            type: "Funnel Chart", 
            purpose: "유저 전환 단계 분석",
            description: "가입 → 튜토리얼 → 첫결제 → 리텐션 단계별 전환율"
        },
        {
            type: "Cohort Analysis",
            purpose: "코호트별 리텐션 분석", 
            description: "가입 시기별 유저 그룹의 장기 리텐션 비교"
        }
    ]
};