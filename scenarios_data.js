// 업무 시나리오 메타데이터
const workScenarios = [
    {
        id: "salary_calc",
        name: "급여 계산하기",
        icon: "💰",
        subtitle: "기본급부터 실수령액까지",
        description: "기본급, 각종 수당, 공제액을 계산하여 실제 수령 급여를 산출하는 방법을 학습합니다. 인사팀 필수 스킬입니다.",
        difficulty: "medium",
        functions: ["SUM", "IF", "VLOOKUP", "ROUND", "MAX", "MIN"],
        functionCount: 8,
        estimatedTime: "30분",
        category: "hr"
    },
    {
        id: "inventory_mgmt",
        name: "재고 관리하기", 
        icon: "📦",
        subtitle: "입출고부터 적정재고까지",
        description: "재고 입출고 관리, 적정 재고량 계산, 재주문 시점 알림 등 효율적인 재고 관리 시스템을 구축합니다.",
        difficulty: "medium",
        functions: ["SUMIF", "COUNTIF", "IF", "VLOOKUP", "TODAY", "AVERAGE"],
        functionCount: 10,
        estimatedTime: "45분",
        category: "operations"
    },
    {
        id: "sales_analysis",
        name: "매출 분석하기",
        icon: "📈", 
        subtitle: "매출 트렌드와 성과 분석",
        description: "월별/분기별 매출 분석, 제품별 성과 비교, 매출 예측 등 데이터 기반 영업 전략을 수립합니다.",
        difficulty: "hard",
        functions: ["SUMIFS", "AVERAGEIFS", "VLOOKUP", "INDEX", "MATCH", "RANK"],
        functionCount: 12,
        estimatedTime: "60분",
        category: "sales"
    },
    {
        id: "project_analysis", 
        name: "프로젝트 분석하기",
        icon: "📊",
        subtitle: "일정관리와 진도 추적",
        description: "프로젝트 일정 관리, 진행률 계산, 리소스 할당, 마일스톤 추적 등 체계적인 프로젝트 관리 방법을 제공합니다.",
        difficulty: "hard",
        functions: ["NETWORKDAYS", "DATEDIF", "IF", "COUNTIFS", "SUMIFS", "GANTT"],
        functionCount: 15,
        estimatedTime: "75분",
        category: "pm"
    },
    {
        id: "finance_analysis",
        name: "재무 분석하기",
        icon: "💼",
        subtitle: "투자와 수익성 분석", 
        description: "손익분석, ROI 계산, 현금흐름 분석, 투자 타당성 검토 등 재무 의사결정을 위한 핵심 분석 기법을 학습합니다.",
        difficulty: "hard",
        functions: ["PMT", "FV", "PV", "NPV", "IRR", "RATE"],
        functionCount: 18,
        estimatedTime: "90분",
        category: "finance"
    },
    {
        id: "game_dev_data",
        name: "게임 개발 데이터 관리",
        icon: "🎮",
        subtitle: "게임 데이터 분석과 밸런싱",
        description: "유저 데이터 분석, 게임 밸런싱, 수익 분석, KPI 추적 등 게임 개발과 운영에 필요한 데이터 관리 기법을 제공합니다.",
        difficulty: "hard", 
        functions: ["SUMIFS", "PERCENTILE", "CORREL", "STDEV", "RAND", "NORMAL.DIST"],
        functionCount: 20,
        estimatedTime: "120분",
        category: "gamedev"
    }
];

// 시나리오 카테고리별 정보
const scenarioCategories = {
    hr: { name: "인사관리", color: "#28a745", icon: "👥" },
    operations: { name: "운영관리", color: "#17a2b8", icon: "⚙️" },
    sales: { name: "영업분석", color: "#ffc107", icon: "📈" },
    pm: { name: "프로젝트관리", color: "#6f42c1", icon: "📋" },
    finance: { name: "재무분석", color: "#fd7e14", icon: "💰" },
    gamedev: { name: "게임개발", color: "#e83e8c", icon: "🎮" }
};

// 난이도별 색상
const scenarioDifficulties = {
    easy: { name: "쉬움", color: "#28a745", time: "15-30분" },
    medium: { name: "보통", color: "#ffc107", time: "30-60분" },
    hard: { name: "어려움", color: "#dc3545", time: "60분+" }
};

// 급여 계산하기 시나리오 상세 데이터
const salaryCalcScenario = {
    id: "salary_calc",
    title: "급여 계산하기",
    description: "직원 급여를 체계적으로 계산하는 방법을 학습합니다.",
    
    steps: [
        {
            step: 1,
            title: "기본급 및 수당 계산",
            description: "기본급에 각종 수당을 더하여 총 지급액을 계산합니다.",
            functions: ["SUM", "IF", "VLOOKUP"],
            example: {
                formula: "=SUM(B2:D2)",
                result: "3,350,000원",
                explanation: "기본급 + 식대 + 교통비를 합산하여 총 지급액을 계산합니다."
            }
        },
        {
            step: 2,
            title: "연장근무 수당 계산",
            description: "연장근무 시간에 따른 연장수당을 계산합니다.",
            functions: ["IF", "MAX"],
            example: {
                formula: "=IF(B2>40,(B2-40)*C2*1.5,0)",
                result: "112,500원",
                explanation: "40시간 초과 근무시 1.5배 연장수당을 지급합니다."
            }
        },
        {
            step: 3,
            title: "세금 및 공제액 계산",
            description: "소득세, 국민연금 등 각종 공제액을 계산합니다.",
            functions: ["ROUND"],
            example: {
                formula: "=ROUND(B2*0.06,0)",
                result: "201,000원",
                explanation: "총지급액의 6%를 소득세로 계산하고 원단위로 반올림합니다."
            }
        },
        {
            step: 4,
            title: "실수령액 계산",
            description: "총지급액에서 공제액을 차감하여 실수령액을 계산합니다.",
            functions: ["SUM"],
            example: {
                formula: "=B2-C2",
                result: "2,882,225원",
                explanation: "총지급액에서 총공제액을 차감하여 실제 수령할 금액을 계산합니다."
            }
        }
    ],
    
    relatedFunctions: [
        {
            name: "SUM",
            usage: "급여 항목들의 합계 계산",
            formula: "=SUM(B2:F2)",
            description: "기본급, 수당들을 모두 합산"
        },
        {
            name: "IF", 
            usage: "조건부 수당 계산",
            formula: "=IF(근무시간>40, 연장수당, 0)",
            description: "연장근무 여부에 따른 수당 지급"
        },
        {
            name: "ROUND",
            usage: "세금 계산시 반올림",
            formula: "=ROUND(B2*0.06, 0)",  
            description: "소수점 이하 원단위 반올림"
        }
    ],
    
    practicalTips: [
        {
            title: "급여 테이블 구성",
            tip: "직급별 기본급을 별도 테이블로 관리하고 VLOOKUP으로 조회하면 관리가 편리합니다."
        },
        {
            title: "공제액 자동화",
            tip: "세율은 변경될 수 있으므로 상수표를 만들어 참조하는 것이 좋습니다."
        }
    ]
};

// 게임 개발 데이터 관리 시나리오 상세 데이터
const gameDevDataScenario = {
    id: "game_dev_data",
    title: "게임 개발 데이터 관리",
    description: "게임 개발과 운영에 필요한 각종 데이터를 체계적으로 분석하고 관리하는 방법을 학습합니다.",
    
    steps: [
        {
            step: 1,
            title: "유저 리텐션 분석",
            description: "D1, D7, D30 리텐션율을 계산하여 게임의 재미요소를 파악합니다.",
            functions: ["COUNTIFS", "IF", "ROUND"],
            example: {
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
                formula: "=SUMIFS(매출범위,플랫폼범위,\"iOS\")",
                result: "500,000,000원",
                explanation: "특정 플랫폼의 총매출을 조건부 합계로 계산"
            }
        },
        {
            step: 3,
            title: "게임 밸런싱 데이터",
            description: "아이템 드롭률, 경험치 테이블 등 게임 밸런싱 데이터를 설계합니다.",
            functions: ["RAND", "IF"],
            example: {
                formula: "=IF(RAND()<=0.01,\"전설템 드롭!\",\"꽝\")",
                result: "확률적 드롭 결과",
                explanation: "랜덤값이 설정된 확률 이하일 때 아이템이 드롭됩니다."
            }
        }
    ],
    
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
            name: "RAND",
            usage: "확률 시뮬레이션",
            formula: "=IF(RAND()<0.01,\"레어아이템\",\"일반아이템\")",
            description: "1% 확률로 레어아이템 드롭"
        }
    ],
    
    practicalTips: [
        {
            title: "리텐션 분석 자동화",
            tip: "가입일 기준으로 자동으로 D1, D7, D30 리텐션을 계산하는 템플릿을 만들어두세요."
        },
        {
            title: "매출 분석 세분화",
            tip: "국가별, 연령대별, 결제수단별로 매출을 세분화하여 분석하면 인사이트를 얻을 수 있습니다."
        }
    ]
};