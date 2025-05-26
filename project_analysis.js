// 프로젝트 분석하기 시나리오 완성 버전
const projectAnalysisScenario = {
    id: "project_analysis",
    title: "프로젝트 분석하기",
    description: "체계적인 프로젝트 관리 및 분석을 통해 일정 관리, 진행률 계산, 리소스 할당, 마일스톤 추적 등을 효율적으로 수행하는 방법을 학습합니다.",
    
    // 단계별 가이드
    steps: [
        {
            step: 1,
            title: "프로젝트 일정 계획하기",
            description: "프로젝트의 시작일, 종료일, 소요 기간을 계산하고 간트 차트 기반으로 일정을 수립합니다.",
            functions: ["NETWORKDAYS", "DATEDIF", "TODAY"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["작업명", "시작일", "종료일", "소요일수", "진행상태"],
                    ["요구사항 분석", "2025-05-01", "2025-05-10", "=NETWORKDAYS(B2,C2)", "완료"],
                    ["설계", "2025-05-11", "2025-05-25", "=NETWORKDAYS(B3,C3)", "진행중"],
                    ["개발", "2025-05-26", "2025-06-20", "=NETWORKDAYS(B4,C4)", "대기중"]
                ],
                formula: "=NETWORKDAYS(시작일,종료일)",
                result: "8일",
                explanation: "주말과 공휴일을 제외한 실제 업무일수를 계산합니다."
            }
        },
        {
            step: 2,
            title: "프로젝트 진행률 추적",
            description: "각 작업의 진행률을 백분율로 계산하고 전체 프로젝트 완료율을 파악합니다.",
            functions: ["SUMPRODUCT", "SUM", "ROUND"],
            example: {
                data: [
                    ["A", "B", "C", "D"],
                    ["작업명", "예상공수", "진행률", "완료공수"],
                    ["요구사항 분석", "40", "100%", "=B2*C2"],
                    ["설계", "60", "70%", "=B3*C3"],
                    ["개발", "120", "0%", "=B4*C4"],
                    ["테스트", "80", "0%", "=B5*C5"]
                ],
                formula: "=ROUND(SUMPRODUCT(B2:B5,C2:C5)/SUM(B2:B5)*100,1)",
                result: "46.7%",
                explanation: "가중평균으로 전체 프로젝트 진행률을 계산합니다."
            }
        },
        {
            step: 3,
            title: "리소스 할당 및 워크로드 분석",
            description: "팀원별 업무 배분을 분석하고 리소스 과부하 여부를 확인합니다.",
            functions: ["SUMIF", "COUNTIF", "AVERAGE"],
            example: {
                data: [
                    ["A", "B", "C", "D"],
                    ["작업명", "담당자", "예상공수", "상태"],
                    ["UI 설계", "김철수", "30", "진행중"],
                    ["API 개발", "김철수", "40", "대기중"],
                    ["DB 설계", "이영희", "25", "완료"],
                    ["테스트", "박민수", "35", "대기중"]
                ],
                formula: "=SUMIF(B2:B5,\"김철수\",C2:C5)",
                result: "70시간",
                explanation: "특정 담당자에게 할당된 총 작업시간을 계산합니다."
            }
        },
        {
            step: 4,
            title: "마일스톤 및 임계경로 분석",
            description: "주요 마일스톤까지의 남은 기간을 계산하고 지연 위험을 평가합니다.",
            functions: ["IF", "DATEDIF", "TODAY"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["마일스톤", "목표일", "현재일", "남은일수", "상태"],
                    ["설계 완료", "2025-05-25", "=TODAY()", "=DATEDIF(C2,B2,\"D\")", "=IF(D2<0,\"지연\",\"정상\")"],
                    ["개발 완료", "2025-06-20", "=TODAY()", "=DATEDIF(C3,B3,\"D\")", "=IF(D3<0,\"지연\",\"정상\")"],
                    ["최종 완료", "2025-07-10", "=TODAY()", "=DATEDIF(C4,B4,\"D\")", "=IF(D4<0,\"지연\",\"정상\")"]
                ],
                formula: "=IF(DATEDIF(TODAY(),목표일,\"D\")<0,\"지연\",\"정상\")",
                result: "정상",
                explanation: "마일스톤 달성 여부를 자동으로 판단합니다."
            }
        },
        {
            step: 5,
            title: "비용 및 예산 관리",
            description: "프로젝트 비용을 추적하고 예산 대비 실적을 분석합니다.",
            functions: ["SUM", "IF", "VLOOKUP"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["비용항목", "예산", "실제비용", "차이", "상태"],
                    ["인건비", "50000000", "45000000", "=B2-C2", "=IF(D2>=0,\"예산내\",\"초과\")"],
                    ["장비비", "10000000", "12000000", "=B3-C3", "=IF(D3>=0,\"예산내\",\"초과\")"],
                    ["기타비용", "5000000", "3000000", "=B4-C4", "=IF(D4>=0,\"예산내\",\"초과\")"]
                ],
                formula: "=SUM(실제비용)/SUM(예산)*100",
                result: "92.3%",
                explanation: "전체 예산 대비 실제 비용 비율을 계산합니다."
            }
        },
        {
            step: 6,
            title: "위험 관리 및 이슈 추적",
            description: "프로젝트 위험 요소를 수치화하고 이슈 해결 현황을 모니터링합니다.",
            functions: ["COUNTIFS", "RANK", "MAX"],
            example: {
                data: [
                    ["A", "B", "C", "D", "E"],
                    ["위험요소", "발생확률", "영향도", "위험점수", "우선순위"],
                    ["일정지연", "0.7", "0.8", "=B2*C2", "=RANK(D2,D$2:D$5,0)"],
                    ["인력부족", "0.5", "0.9", "=B3*C3", "=RANK(D3,D$2:D$5,0)"],
                    ["예산초과", "0.3", "0.6", "=B4*C4", "=RANK(D4,D$2:D$5,0)"],
                    ["기술이슈", "0.4", "0.7", "=B5*C5", "=RANK(D5,D$2:D$5,0)"]
                ],
                formula: "=발생확률*영향도",
                result: "0.56",
                explanation: "위험 점수 = 발생 확률 × 영향도로 위험을 수치화합니다."
            }
        }
    ],
    
    // 관련 함수들
    relatedFunctions: [
        {
            name: "NETWORKDAYS",
            usage: "프로젝트 기간 계산",
            formula: "=NETWORKDAYS(시작일,종료일,휴일범위)",
            description: "주말과 공휴일을 제외한 실제 업무일수 계산"
        },
        {
            name: "DATEDIF",
            usage: "기간 차이 계산",
            formula: "=DATEDIF(시작일,종료일,\"D\")",
            description: "두 날짜 사이의 일수, 월수, 년수 차이 계산"
        },
        {
            name: "SUMPRODUCT",
            usage: "가중 평균 진행률",
            formula: "=SUMPRODUCT(공수,진행률)/SUM(공수)",
            description: "작업량을 고려한 전체 프로젝트 진행률 계산"
        },
        {
            name: "COUNTIFS",
            usage: "조건부 이슈 개수",
            formula: "=COUNTIFS(상태,\"진행중\",우선순위,\"높음\")",
            description: "특정 조건을 만족하는 이슈나 작업 개수 계산"
        },
        {
            name: "RANK",
            usage: "위험도 순위 매기기",
            formula: "=RANK(위험점수,위험점수범위,0)",
            description: "위험 요소의 심각도에 따른 우선순위 결정"
        },
        {
            name: "VLOOKUP",
            usage: "담당자 정보 조회",
            formula: "=VLOOKUP(담당자명,인력풀,2,FALSE)",
            description: "담당자별 시간당 비용이나 스킬 정보 조회"
        },
        {
            name: "TODAY",
            usage: "현재 기준 계산",
            formula: "=TODAY()",
            description: "오늘 날짜 기준으로 남은 기간이나 지연 여부 계산"
        },
        {
            name: "IF",
            usage: "상태 자동 판단",
            formula: "=IF(진행률>=1,\"완료\",\"진행중\")",
            description: "진행률이나 일정에 따른 프로젝트 상태 자동 분류"
        }
    ],
    
    // 실무 팁
    practicalTips: [
        {
            title: "간트 차트 활용",
            tip: "엑셀의 조건부 서식을 활용하여 간트 차트를 만들면 시각적으로 일정을 파악하기 쉽습니다."
        },
        {
            title: "대시보드 구성",
            tip: "핵심 KPI(진행률, 예산 사용률, 위험도 등)를 한눈에 볼 수 있는 대시보드를 별도 시트로 구성하세요."
        },
        {
            title: "정기 업데이트",
            tip: "주간 단위로 진행률과 이슈를 업데이트하여 프로젝트 현황을 실시간으로 파악하세요."
        },
        {
            title: "베이스라인 관리",
            tip: "초기 계획(베이스라인)을 별도로 저장하여 실제 진행 상황과 비교 분석하세요."
        },
        {
            title: "리스크 로그",
            tip: "식별된 위험 요소들을 지속적으로 모니터링하고 대응 계획을 수립하세요."
        },
        {
            title: "의사소통 관리",
            tip: "이해관계자별 보고서 양식을 미리 정의하여 효율적인 의사소통을 도모하세요."
        }
    ],
    
    // 고급 분석 기법
    advancedAnalytics: [
        {
            title: "번다운 차트",
            description: "남은 작업량의 변화를 시각화하여 프로젝트 완료 예측",
            formula: "=총작업량-누적완료량"
        },
        {
            title: "EVM (Earned Value Management)",
            description: "계획 대비 실제 성과를 비용과 일정 관점에서 분석",
            metrics: ["PV (계획가치)", "EV (획득가치)", "AC (실제비용)", "SPI (일정성과지수)", "CPI (비용성과지수)"]
        },
        {
            title: "Critical Path Method",
            description: "가장 긴 작업 경로를 찾아 프로젝트 최소 완료 기간 계산",
            tip: "종속성이 있는 작업들의 최장 경로를 파악하여 중점 관리"
        },
        {
            title: "Monte Carlo 시뮬레이션",
            description: "불확실성을 고려한 프로젝트 완료 확률 분석",
            application: "낙관적/비관적/현실적 시나리오를 조합한 완료일 예측"
        }
    ],
    
    // 템플릿 구조
    templateStructure: {
        "프로젝트 개요": {
            fields: ["프로젝트명", "PM", "시작일", "목표완료일", "예산", "팀원수"],
            purpose: "프로젝트 기본 정보 관리"
        },
        "WBS (작업분해구조)": {
            fields: ["작업ID", "작업명", "상위작업", "담당자", "예상공수", "시작일", "종료일"],
            purpose: "세부 작업 단위로 프로젝트 분해"
        },
        "일정관리": {
            fields: ["작업명", "예정시작", "예정완료", "실제시작", "실제완료", "진행률", "지연일수"],
            purpose: "계획 대비 실제 일정 추적"
        },
        "리소스 관리": {
            fields: ["담당자", "역할", "할당시간", "가용시간", "활용률", "비용"],
            purpose: "인력 및 자원 배분 최적화"
        },
        "위험 관리": {
            fields: ["위험ID", "설명", "발생확률", "영향도", "대응계획", "담당자", "상태"],
            purpose: "프로젝트 위험 요소 체계적 관리"
        }
    },
    
    // 성과 측정 지표
    kpiMetrics: [
        {
            name: "일정 성과 지수 (SPI)",
            formula: "=EV/PV",
            interpretation: "1.0 이상이면 일정 준수, 미만이면 지연"
        },
        {
            name: "비용 성과 지수 (CPI)", 
            formula: "=EV/AC",
            interpretation: "1.0 이상이면 예산 절약, 미만이면 예산 초과"
        },
        {
            name: "품질 지표",
            formula: "=결함수정건수/전체이슈건수",
            interpretation: "품질 관리 효율성 측정"
        },
        {
            name: "팀 생산성",
            formula: "=완료된기능점수/총투입시간",
            interpretation: "시간당 산출물 생산량 측정"
        }
    ]
};

// 전역으로 노출
if (typeof window !== 'undefined') {
    window.projectAnalysisScenario = projectAnalysisScenario;
}