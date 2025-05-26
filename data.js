// 엑셀 함수 데이터
const excelFunctions = [
    {
        name: "SUM",
        category: "basic",
        difficulty: "easy",
        popular: true,
        description: "선택한 범위의 숫자들을 모두 더합니다. 가장 기본적이고 자주 사용되는 함수입니다.",
        syntax: "=SUM(숫자1, [숫자2, ...])",
        example: {
            data: [
                ["A", "B"],
                ["1", "매출"],
                ["2", "100,000"],
                ["3", "150,000"],
                ["4", "200,000"]
            ],
            formula: "=SUM(A2:A4)",
            result: "450,000"
        },
        tags: ["합계", "기본함수", "계산"]
    },
    {
        name: "VLOOKUP",
        category: "lookup",
        difficulty: "medium",
        popular: true,
        description: "테이블에서 특정 값을 찾아 해당하는 다른 열의 값을 반환합니다. 데이터 조회에 가장 많이 사용됩니다.",
        syntax: "=VLOOKUP(찾을값, 테이블범위, 열번호, 정확히일치)",
        example: {
            data: [
                ["A", "B", "C"],
                ["사번", "이름", "부서"],
                ["101", "김철수", "영업"],
                ["102", "이영희", "마케팅"],
                ["103", "박민수", "개발"]
            ],
            formula: "=VLOOKUP(102,A2:C4,2,FALSE)",
            result: "이영희",
            additionalFormula: "=VLOOKUP(102,A2:C4,3,FALSE)",
            additionalResult: "마케팅"
        },
        tags: ["조회", "참조", "데이터검색"]
    },
    {
        name: "IF",
        category: "logical",
        difficulty: "easy",
        popular: true,
        description: "조건을 확인하여 참이면 한 값을, 거짓이면 다른 값을 반환합니다. 조건부 계산의 기본입니다.",
        syntax: "=IF(조건, 참일때값, 거짓일때값)",
        example: {
            data: [
                ["A", "B"],
                ["이름", "점수"],
                ["김철수", "85"],
                ["이영희", "92"],
                ["박민수", "78"]
            ],
            formula: "=IF(B2>=80,\"합격\",\"불합격\")",
            result: "합격",
            additionalFormula: "=IF(B4>=80,\"합격\",\"불합격\")",
            additionalResult: "불합격"
        },
        tags: ["조건", "논리", "분기"]
    },
    {
        name: "COUNTIF",
        category: "basic",
        difficulty: "medium",
        popular: true,
        description: "조건을 만족하는 셀의 개수를 센다. 특정 조건에 맞는 데이터의 빈도를 파악할 때 유용합니다.",
        syntax: "=COUNTIF(범위, 조건)",
        example: {
            data: [
                ["A"],
                ["부서"],
                ["영업"],
                ["마케팅"],
                ["영업"],
                ["개발"],
                ["영업"]
            ],
            formula: "=COUNTIF(A2:A6,\"영업\")",
            result: "3",
            additionalFormula: "=COUNTIF(A2:A6,\"마케팅\")",
            additionalResult: "1"
        },
        tags: ["개수세기", "조건부계산", "통계"]
    },
    {
        name: "CONCATENATE",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "여러 텍스트를 하나로 합칩니다. 이름+성, 주소 합치기 등에 자주 사용됩니다.",
        syntax: "=CONCATENATE(텍스트1, 텍스트2, ...)",
        example: {
            data: [
                ["A", "B", "C"],
                ["성", "이름", "부서"],
                ["김", "철수", "영업팀"],
                ["이", "영희", "마케팅팀"]
            ],
            formula: "=CONCATENATE(A2,B2)",
            result: "김철수",
            additionalFormula: "=CONCATENATE(A2,B2,\" (\",C2,\")\")",
            additionalResult: "김철수 (영업팀)"
        },
        tags: ["텍스트", "문자열결합", "연결"]
    },
    {
        name: "TODAY",
        category: "date",
        difficulty: "easy",
        popular: false,
        description: "오늘 날짜를 반환합니다. 자동으로 업데이트되는 날짜가 필요할 때 사용합니다.",
        syntax: "=TODAY()",
        example: {
            data: [
                ["A", "B"],
                ["오늘", "=TODAY()"],
                ["1주후", "=TODAY()+7"],
                ["30일후", "=TODAY()+30"]
            ],
            formula: "=TODAY()",
            result: "2025-05-26"
        },
        tags: ["날짜", "시간", "자동업데이트"]
    },
    {
        name: "AVERAGE",
        category: "basic",
        difficulty: "easy",
        popular: true,
        description: "선택한 범위의 숫자들의 평균값을 계산합니다. 성과 분석이나 통계에 자주 사용됩니다.",
        syntax: "=AVERAGE(숫자1, [숫자2, ...])",
        example: {
            data: [
                ["A", "B"],
                ["월", "매출"],
                ["1월", "1000"],
                ["2월", "1200"],
                ["3월", "1100"]
            ],
            formula: "=AVERAGE(B2:B4)",
            result: "1100"
        },
        tags: ["평균", "통계", "계산"]
    },
    {
        name: "MAX",
        category: "basic",
        difficulty: "easy",
        popular: true,
        description: "선택한 범위에서 가장 큰 값을 찾습니다. 최고 성과나 최대값 찾기에 사용됩니다.",
        syntax: "=MAX(숫자1, [숫자2, ...])",
        example: {
            data: [
                ["A", "B"],
                ["직원", "매출"],
                ["김철수", "500"],
                ["이영희", "800"],
                ["박민수", "600"]
            ],
            formula: "=MAX(B2:B4)",
            result: "800"
        },
        tags: ["최대값", "최고", "비교"]
    },
    {
        name: "MIN",
        category: "basic",
        difficulty: "easy",
        popular: true,
        description: "선택한 범위에서 가장 작은 값을 찾습니다. 최저 성과나 최소값 찾기에 사용됩니다.",
        syntax: "=MIN(숫자1, [숫자2, ...])",
        example: {
            data: [
                ["A", "B"],
                ["제품", "가격"],
                ["A제품", "15000"],
                ["B제품", "12000"],
                ["C제품", "18000"]
            ],
            formula: "=MIN(B2:B4)",
            result: "12000"
        },
        tags: ["최소값", "최저", "비교"]
    },
    {
        name: "SUMIF",
        category: "basic",
        difficulty: "medium",
        popular: true,
        description: "조건을 만족하는 셀들의 합계를 계산합니다. 특정 조건에 맞는 데이터만 합산할 때 사용됩니다.",
        syntax: "=SUMIF(범위, 조건, [합계범위])",
        example: {
            data: [
                ["A", "B"],
                ["부서", "매출"],
                ["영업", "100"],
                ["마케팅", "80"],
                ["영업", "120"],
                ["개발", "90"]
            ],
            formula: "=SUMIF(A2:A5,\"영업\",B2:B5)",
            result: "220"
        },
        tags: ["조건부합계", "조건", "합계"]
    },
    {
        name: "LEFT",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트의 왼쪽부터 지정한 개수만큼의 문자를 추출합니다. 코드나 ID 분리에 유용합니다.",
        syntax: "=LEFT(텍스트, [문자수])",
        example: {
            data: [
                ["A"],
                ["제품코드"],
                ["ABC123"],
                ["DEF456"],
                ["GHI789"]
            ],
            formula: "=LEFT(A2,3)",
            result: "ABC"
        },
        tags: ["텍스트", "문자추출", "왼쪽"]
    },
    {
        name: "RIGHT",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트의 오른쪽부터 지정한 개수만큼의 문자를 추출합니다. 확장자나 코드 분리에 유용합니다.",
        syntax: "=RIGHT(텍스트, [문자수])",
        example: {
            data: [
                ["A"],
                ["파일명"],
                ["report.xlsx"],
                ["data.csv"],
                ["image.png"]
            ],
            formula: "=RIGHT(A2,4)",
            result: "xlsx"
        },
        tags: ["텍스트", "문자추출", "오른쪽"]
    },
    {
        name: "MID",
        category: "text",
        difficulty: "medium",
        popular: false,
        description: "텍스트의 지정한 위치부터 지정한 개수만큼의 문자를 추출합니다. 중간 부분 추출에 사용됩니다.",
        syntax: "=MID(텍스트, 시작위치, 문자수)",
        example: {
            data: [
                ["A"],
                ["주민번호"],
                ["901225-1234567"],
                ["850315-2345678"]
            ],
            formula: "=MID(A2,3,2)",
            result: "12"
        },
        tags: ["텍스트", "문자추출", "중간"]
    },
    {
        name: "LEN",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트의 문자 개수를 반환합니다. 데이터 검증이나 길이 확인에 사용됩니다.",
        syntax: "=LEN(텍스트)",
        example: {
            data: [
                ["A"],
                ["텍스트"],
                ["안녕하세요"],
                ["Hello World"],
                ["엑셀함수"]
            ],
            formula: "=LEN(A2)",
            result: "5"
        },
        tags: ["텍스트", "길이", "문자수"]
    },
    {
        name: "UPPER",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트를 모두 대문자로 변환합니다. 데이터 정규화에 유용합니다.",
        syntax: "=UPPER(텍스트)",
        example: {
            data: [
                ["A"],
                ["텍스트"],
                ["hello world"],
                ["Excel Functions"],
                ["data analysis"]
            ],
            formula: "=UPPER(A2)",
            result: "HELLO WORLD"
        },
        tags: ["텍스트", "대문자", "변환"]
    },
    {
        name: "LOWER",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트를 모두 소문자로 변환합니다. 데이터 정규화에 유용합니다.",
        syntax: "=LOWER(텍스트)",
        example: {
            data: [
                ["A"],
                ["텍스트"],
                ["HELLO WORLD"],
                ["Excel Functions"],
                ["DATA ANALYSIS"]
            ],
            formula: "=LOWER(A2)",
            result: "hello world"
        },
        tags: ["텍스트", "소문자", "변환"]
    },
    {
        name: "TRIM",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트의 앞뒤 공백을 제거합니다. 데이터 정리에 필수적인 함수입니다.",
        syntax: "=TRIM(텍스트)",
        example: {
            data: [
                ["A"],
                ["텍스트"],
                ["  안녕하세요  "],
                [" Excel  "],
                ["   데이터   "]
            ],
            formula: "=TRIM(A2)",
            result: "안녕하세요"
        },
        tags: ["텍스트", "공백제거", "정리"]
    },
    {
        name: "ROUND",
        category: "basic",
        difficulty: "easy",
        popular: true,
        description: "숫자를 지정한 자릿수로 반올림합니다. 계산 결과 정리에 자주 사용됩니다.",
        syntax: "=ROUND(숫자, 자릿수)",
        example: {
            data: [
                ["A"],
                ["값"],
                ["3.14159"],
                ["2.71828"],
                ["1.41421"]
            ],
            formula: "=ROUND(A2,2)",
            result: "3.14"
        },
        tags: ["반올림", "숫자", "정리"]
    },
    {
        name: "NOW",
        category: "date",
        difficulty: "easy",
        popular: false,
        description: "현재 날짜와 시간을 반환합니다. 타임스탬프나 실시간 데이터에 사용됩니다.",
        syntax: "=NOW()",
        example: {
            data: [
                ["A", "B"],
                ["현재시간", "=NOW()"],
                ["1시간후", "=NOW()+1/24"],
                ["어제", "=NOW()-1"]
            ],
            formula: "=NOW()",
            result: "2025-05-26 14:30:25"
        },
        tags: ["날짜", "시간", "현재시간"]
    },
    {
        name: "DATEDIF",
        category: "date",
        difficulty: "medium",
        popular: false,
        description: "두 날짜 사이의 기간을 계산합니다. 근무기간, 나이 계산 등에 유용합니다.",
        syntax: "=DATEDIF(시작날짜, 종료날짜, 단위)",
        example: {
            data: [
                ["A", "B"],
                ["입사일", "퇴사일"],
                ["2020-01-01", "2025-05-26"],
                ["1990-02-15", "2025-05-26"]
            ],
            formula: "=DATEDIF(A2,B2,\"Y\")",
            result: "5"
        },
        tags: ["날짜", "기간계산", "차이"]
    },
    {
        name: "HLOOKUP",
        category: "lookup",
        difficulty: "medium",
        popular: true,
        description: "가로 테이블에서 값을 찾아 반환합니다. VLOOKUP의 가로 버전으로 월별 데이터 조회에 유용합니다.",
        syntax: "=HLOOKUP(찾을값, 테이블범위, 행번호, 정확히일치)",
        example: {
            data: [
                ["A", "B", "C", "D"],
                ["월", "1월", "2월", "3월"],
                ["매출", "1000", "1200", "1100"],
                ["비용", "800", "900", "850"]
            ],
            formula: "=HLOOKUP(\"2월\",B1:D3,2,FALSE)",
            result: "1200"
        },
        tags: ["조회", "가로검색", "테이블"]
    },
    {
        name: "INDEX",
        category: "lookup",
        difficulty: "medium",
        popular: true,
        description: "테이블의 특정 행과 열의 교차점 값을 반환합니다. MATCH와 함께 사용하면 강력한 조회 기능을 제공합니다.",
        syntax: "=INDEX(배열, 행번호, [열번호])",
        example: {
            data: [
                ["A", "B", "C"],
                ["제품", "가격", "재고"],
                ["노트북", "800000", "50"],
                ["마우스", "30000", "100"],
                ["키보드", "80000", "75"]
            ],
            formula: "=INDEX(B2:C4,2,1)",
            result: "30000"
        },
        tags: ["조회", "인덱스", "테이블참조"]
    },
    {
        name: "MATCH",
        category: "lookup",
        difficulty: "medium",
        popular: true,
        description: "찾을 값의 위치를 반환합니다. INDEX와 함께 사용하여 동적 조회를 만들 수 있습니다.",
        syntax: "=MATCH(찾을값, 찾을범위, [일치유형])",
        example: {
            data: [
                ["A"],
                ["제품"],
                ["노트북"],
                ["마우스"],
                ["키보드"]
            ],
            formula: "=MATCH(\"마우스\",A2:A4,0)",
            result: "2"
        },
        tags: ["조회", "위치찾기", "매치"]
    },
    {
        name: "IFERROR",
        category: "logical",
        difficulty: "medium",
        popular: true,
        description: "수식에서 오류가 발생할 때 대체값을 반환합니다. 오류 처리에 필수적인 함수입니다.",
        syntax: "=IFERROR(값, 오류시값)",
        example: {
            data: [
                ["A", "B"],
                ["분자", "분모"],
                ["10", "2"],
                ["10", "0"],
                ["15", "3"]
            ],
            formula: "=IFERROR(A2/B2,\"계산불가\")",
            result: "5",
            additionalFormula: "=IFERROR(A3/B3,\"계산불가\")",
            additionalResult: "계산불가"
        },
        tags: ["오류처리", "예외처리", "안전장치"]
    },
    {
        name: "SUMIFS",
        category: "basic",
        difficulty: "hard",
        popular: true,
        description: "여러 조건을 만족하는 셀들의 합계를 계산합니다. 복합 조건 분석에 매우 유용합니다.",
        syntax: "=SUMIFS(합계범위, 조건범위1, 조건1, [조건범위2, 조건2, ...])",
        example: {
            data: [
                ["A", "B", "C"],
                ["부서", "월", "매출"],
                ["영업", "1월", "100"],
                ["마케팅", "1월", "80"],
                ["영업", "2월", "120"],
                ["영업", "1월", "90"]
            ],
            formula: "=SUMIFS(C2:C5,A2:A5,\"영업\",B2:B5,\"1월\")",
            result: "190"
        },
        tags: ["다중조건", "합계", "복합필터"]
    },
    {
        name: "COUNTIFS",
        category: "basic",
        difficulty: "hard",
        popular: true,
        description: "여러 조건을 만족하는 셀의 개수를 셉니다. 복합 조건으로 데이터 개수를 파악할 때 사용합니다.",
        syntax: "=COUNTIFS(조건범위1, 조건1, [조건범위2, 조건2, ...])",
        example: {
            data: [
                ["A", "B", "C"],
                ["부서", "점수", "등급"],
                ["영업", "85", "A"],
                ["마케팅", "92", "A"],
                ["영업", "78", "B"],
                ["개발", "88", "A"]
            ],
            formula: "=COUNTIFS(A2:A5,\"영업\",C2:C5,\"A\")",
            result: "1"
        },
        tags: ["다중조건", "개수세기", "복합필터"]
    },
    {
        name: "AVERAGEIFS",
        category: "basic",
        difficulty: "hard",
        popular: true,
        description: "여러 조건을 만족하는 셀들의 평균을 계산합니다. 조건부 평균 분석에 사용됩니다.",
        syntax: "=AVERAGEIFS(평균범위, 조건범위1, 조건1, [조건범위2, 조건2, ...])",
        example: {
            data: [
                ["A", "B", "C"],
                ["부서", "경력", "연봉"],
                ["영업", "3", "3500"],
                ["영업", "5", "4200"],
                ["마케팅", "3", "3800"],
                ["영업", "2", "3200"]
            ],
            formula: "=AVERAGEIFS(C2:C5,A2:A5,\"영업\",B2:B5,\">2\")",
            result: "3850"
        },
        tags: ["다중조건", "평균", "복합필터"]
    },
    {
        name: "FIND",
        category: "text",
        difficulty: "medium",
        popular: false,
        description: "텍스트 내에서 특정 문자열의 위치를 찾습니다. 대소문자를 구분하며 데이터 파싱에 유용합니다.",
        syntax: "=FIND(찾을텍스트, 대상텍스트, [시작위치])",
        example: {
            data: [
                ["A"],
                ["이메일"],
                ["user@company.com"],
                ["admin@test.org"],
                ["info@sample.net"]
            ],
            formula: "=FIND(\"@\",A2)",
            result: "5"
        },
        tags: ["텍스트", "위치찾기", "문자열검색"]
    },
    {
        name: "SUBSTITUTE",
        category: "text",
        difficulty: "medium",
        popular: false,
        description: "텍스트 내의 특정 문자나 문자열을 다른 것으로 바꿉니다. 데이터 정리에 매우 유용합니다.",
        syntax: "=SUBSTITUTE(텍스트, 기존텍스트, 새텍스트, [인스턴스번호])",
        example: {
            data: [
                ["A"],
                ["전화번호"],
                ["010-1234-5678"],
                ["02-123-4567"],
                ["031-987-6543"]
            ],
            formula: "=SUBSTITUTE(A2,\"-\",\"\")",
            result: "01012345678"
        },
        tags: ["텍스트", "치환", "문자열변경"]
    },
    {
        name: "TEXT",
        category: "text",
        difficulty: "medium",
        popular: true,
        description: "숫자나 날짜를 지정한 형식의 텍스트로 변환합니다. 보고서 작성 시 형식 맞추기에 필수입니다.",
        syntax: "=TEXT(값, 형식코드)",
        example: {
            data: [
                ["A", "B"],
                ["숫자", "날짜"],
                ["1234.56", "2025-05-26"],
                ["9876.43", "2025-12-31"]
            ],
            formula: "=TEXT(A2,\"#,##0.00\")",
            result: "1,234.56",
            additionalFormula: "=TEXT(B2,\"yyyy년 mm월 dd일\")",
            additionalResult: "2025년 05월 26일"
        },
        tags: ["텍스트", "형식변환", "포맷팅"]
    },
    {
        name: "VALUE",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트로 저장된 숫자를 실제 숫자로 변환합니다. 데이터 가져오기 후 형식 변환에 사용됩니다.",
        syntax: "=VALUE(텍스트)",
        example: {
            data: [
                ["A"],
                ["텍스트숫자"],
                ["123"],
                ["456.78"],
                ["789"]
            ],
            formula: "=VALUE(A2)",
            result: "123"
        },
        tags: ["텍스트", "숫자변환", "형변환"]
    },
    {
        name: "YEAR",
        category: "date",
        difficulty: "easy",
        popular: true,
        description: "날짜에서 연도를 추출합니다. 연도별 분석이나 나이 계산에 자주 사용됩니다.",
        syntax: "=YEAR(날짜)",
        example: {
            data: [
                ["A"],
                ["날짜"],
                ["2025-05-26"],
                ["1990-12-25"],
                ["2000-01-01"]
            ],
            formula: "=YEAR(A2)",
            result: "2025"
        },
        tags: ["날짜", "연도", "시간추출"]
    },
    {
        name: "MONTH",
        category: "date",
        difficulty: "easy",
        popular: true,
        description: "날짜에서 월을 추출합니다. 월별 분석이나 계절별 데이터 분류에 사용됩니다.",
        syntax: "=MONTH(날짜)",
        example: {
            data: [
                ["A"],
                ["날짜"],
                ["2025-05-26"],
                ["2025-12-25"],
                ["2025-01-01"]
            ],
            formula: "=MONTH(A2)",
            result: "5"
        },
        tags: ["날짜", "월", "시간추출"]
    },
    {
        name: "DAY",
        category: "date",
        difficulty: "easy",
        popular: true,
        description: "날짜에서 일을 추출합니다. 일별 분석이나 특정 날짜 계산에 사용됩니다.",
        syntax: "=DAY(날짜)",
        example: {
            data: [
                ["A"],
                ["날짜"],
                ["2025-05-26"],
                ["2025-12-25"],
                ["2025-01-01"]
            ],
            formula: "=DAY(A2)",
            result: "26"
        },
        tags: ["날짜", "일", "시간추출"]
    },
    {
        name: "WEEKDAY",
        category: "date",
        difficulty: "medium",
        popular: false,
        description: "날짜의 요일을 숫자로 반환합니다. 요일별 분석이나 근무일 계산에 유용합니다.",
        syntax: "=WEEKDAY(날짜, [유형])",
        example: {
            data: [
                ["A"],
                ["날짜"],
                ["2025-05-26"],
                ["2025-05-27"],
                ["2025-05-28"]
            ],
            formula: "=WEEKDAY(A2,2)",
            result: "1"
        },
        tags: ["날짜", "요일", "주간분석"]
    },
    {
        name: "NETWORKDAYS",
        category: "date",
        difficulty: "medium",
        popular: false,
        description: "두 날짜 사이의 근무일 수를 계산합니다. 휴일을 제외한 실제 업무일 계산에 필수입니다.",
        syntax: "=NETWORKDAYS(시작날짜, 종료날짜, [휴일])",
        example: {
            data: [
                ["A", "B"],
                ["시작일", "종료일"],
                ["2025-05-01", "2025-05-31"],
                ["2025-06-01", "2025-06-30"]
            ],
            formula: "=NETWORKDAYS(A2,B2)",
            result: "22"
        },
        tags: ["날짜", "근무일", "업무계획"]
    },
    {
        name: "EOMONTH",
        category: "date",
        difficulty: "medium",
        popular: false,
        description: "지정한 날짜로부터 몇 개월 후의 월말 날짜를 반환합니다. 월말 마감일 계산에 유용합니다.",
        syntax: "=EOMONTH(시작날짜, 개월수)",
        example: {
            data: [
                ["A"],
                ["기준일"],
                ["2025-05-15"],
                ["2025-03-10"]
            ],
            formula: "=EOMONTH(A2,0)",
            result: "2025-05-31",
            additionalFormula: "=EOMONTH(A2,1)",
            additionalResult: "2025-06-30"
        },
        tags: ["날짜", "월말", "마감일"]
    },
    {
        name: "PMT",
        category: "advanced",
        difficulty: "hard",
        popular: false,
        description: "대출의 월 상환액을 계산합니다. 금융 계산이나 투자 분석에 사용됩니다.",
        syntax: "=PMT(이율, 기간, 현재가치, [미래가치], [지불유형])",
        example: {
            data: [
                ["A", "B", "C"],
                ["연이율", "기간(년)", "대출금액"],
                ["5%", "30", "200000000"]
            ],
            formula: "=PMT(A2/12,B2*12,-C2)",
            result: "1073643"
        },
        tags: ["금융", "대출", "월납입액"]
    },
    {
        name: "FV",
        category: "advanced",
        difficulty: "hard",
        popular: false,
        description: "투자의 미래가치를 계산합니다. 적금이나 투자 계획 수립에 사용됩니다.",
        syntax: "=FV(이율, 기간, 납입액, [현재가치], [지불유형])",
        example: {
            data: [
                ["A", "B", "C"],
                ["연이율", "기간(년)", "월납입액"],
                ["3%", "10", "500000"]
            ],
            formula: "=FV(A2/12,B2*12,-C2)",
            result: "69756321"
        },
        tags: ["금융", "투자", "미래가치"]
    },
    {
        name: "PV",
        category: "advanced",
        difficulty: "hard",
        popular: false,
        description: "미래 현금흐름의 현재가치를 계산합니다. 투자 타당성 분석에 사용됩니다.",
        syntax: "=PV(이율, 기간, 납입액, [미래가치], [지불유형])",
        example: {
            data: [
                ["A", "B", "C"],
                ["연이율", "기간(년)", "연금액"],
                ["4%", "20", "10000000"]
            ],
            formula: "=PV(A2,B2,-C2)",
            result: "135903504"
        },
        tags: ["금융", "현재가치", "투자분석"]
    },
    {
        name: "RANK",
        category: "basic",
        difficulty: "medium",
        popular: true,
        description: "값의 순위를 반환합니다. 성과 평가나 순위 분석에 자주 사용됩니다.",
        syntax: "=RANK(값, 참조배열, [순서])",
        example: {
            data: [
                ["A", "B"],
                ["직원", "점수"],
                ["김철수", "85"],
                ["이영희", "92"],
                ["박민수", "78"],
                ["최정아", "88"]
            ],
            formula: "=RANK(B2,B$2:B$5,0)",
            result: "3"
        },
        tags: ["순위", "랭킹", "성과평가"]
    },
    {
        name: "PERCENTILE",
        category: "basic",
        difficulty: "medium",
        popular: false,
        description: "데이터에서 지정한 백분위수에 해당하는 값을 반환합니다. 통계 분석에 사용됩니다.",
        syntax: "=PERCENTILE(배열, 백분위수)",
        example: {
            data: [
                ["A"],
                ["점수"],
                ["65"], ["78"], ["82"], ["85"], 
                ["88"], ["92"], ["95"], ["98"]
            ],
            formula: "=PERCENTILE(A2:A9,0.9)",
            result: "96.1"
        },
        tags: ["통계", "백분위", "분포분석"]
    },
    {
        name: "STDEV",
        category: "basic",
        difficulty: "medium",
        popular: false,
        description: "표본의 표준편차를 계산합니다. 데이터의 산포도나 변동성 분석에 사용됩니다.",
        syntax: "=STDEV(숫자1, [숫자2, ...])",
        example: {
            data: [
                ["A"],
                ["점수"],
                ["85"], ["90"], ["78"], ["92"], ["88"]
            ],
            formula: "=STDEV(A2:A6)",
            result: "5.39"
        },
        tags: ["통계", "표준편차", "변동성"]
    },
    {
        name: "CORREL",
        category: "advanced",
        difficulty: "hard",
        popular: false,
        description: "두 데이터 집합 간의 상관계수를 계산합니다. 변수 간 관계 분석에 사용됩니다.",
        syntax: "=CORREL(배열1, 배열2)",
        example: {
            data: [
                ["A", "B"],
                ["광고비", "매출"],
                ["100", "500"],
                ["150", "650"],
                ["200", "800"],
                ["120", "580"]
            ],
            formula: "=CORREL(A2:A5,B2:B5)",
            result: "0.99"
        },
        tags: ["통계", "상관관계", "데이터분석"]
    },
    {
        name: "TRANSPOSE",
        category: "advanced",
        difficulty: "medium",
        popular: false,
        description: "배열의 행과 열을 바꿉니다. 데이터 구조 변환에 유용합니다.",
        syntax: "=TRANSPOSE(배열)",
        example: {
            data: [
                ["A", "B", "C"],
                ["1월", "2월", "3월"],
                ["100", "120", "110"]
            ],
            formula: "=TRANSPOSE(A1:C2)",
            result: "행열 전환됨"
        },
        tags: ["배열", "전치", "구조변환"]
    },
    {
        name: "CHOOSE",
        category: "logical",
        difficulty: "medium",
        popular: false,
        description: "인덱스 번호에 따라 값 목록에서 선택하여 반환합니다. 조건부 선택에 유용합니다.",
        syntax: "=CHOOSE(인덱스번호, 값1, [값2, ...])",
        example: {
            data: [
                ["A"],
                ["점수"],
                ["1"], ["2"], ["3"], ["4"]
            ],
            formula: "=CHOOSE(A2,\"나쁨\",\"보통\",\"좋음\",\"우수\")",
            result: "나쁨"
        },
        tags: ["선택", "조건부", "인덱스"]
    },
    {
        name: "INDIRECT",
        category: "advanced",
        difficulty: "hard",
        popular: false,
        description: "텍스트 문자열로 지정된 참조를 반환합니다. 동적 참조 생성에 사용됩니다.",
        syntax: "=INDIRECT(참조텍스트, [A1스타일])",
        example: {
            data: [
                ["A", "B"],
                ["시트명", "셀주소"],
                ["Sheet1", "A1"],
                ["Data", "B5"]
            ],
            formula: "=INDIRECT(A2&\"!\"&B2)",
            result: "동적참조값"
        },
        tags: ["참조", "동적", "고급기능"]
    },
    {
        name: "OFFSET",
        category: "advanced",
        difficulty: "hard",
        popular: false,
        description: "기준 셀에서 지정한 행/열만큼 이동한 위치의 값을 반환합니다. 동적 범위 설정에 사용됩니다.",
        syntax: "=OFFSET(기준셀, 행수, 열수, [높이], [너비])",
        example: {
            data: [
                ["A", "B", "C"],
                ["", "1월", "2월"],
                ["매출", "100", "120"],
                ["비용", "80", "90"]
            ],
            formula: "=OFFSET(A1,2,1)",
            result: "100"
        },
        tags: ["참조", "오프셋", "동적범위"]
    },
    {
        name: "HYPERLINK",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "클릭 가능한 하이퍼링크를 생성합니다. 문서 내 링크나 웹사이트 연결에 사용됩니다.",
        syntax: "=HYPERLINK(링크위치, [표시텍스트])",
        example: {
            data: [
                ["A"],
                ["URL"],
                ["https://www.google.com"],
                ["https://www.naver.com"]
            ],
            formula: "=HYPERLINK(A2,\"구글로 이동\")",
            result: "구글로 이동"
        },
        tags: ["링크", "하이퍼링크", "연결"]
    },
    {
        name: "CLEAN",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "텍스트에서 출력할 수 없는 문자를 제거합니다. 데이터 정리에 유용합니다.",
        syntax: "=CLEAN(텍스트)",
        example: {
            data: [
                ["A"],
                ["더러운텍스트"],
                ["Hello\\nWorld"],
                ["Data\\tValue"]
            ],
            formula: "=CLEAN(A2)",
            result: "HelloWorld"
        },
        tags: ["텍스트", "정리", "특수문자제거"]
    },
    {
        name: "PROPER",
        category: "text",
        difficulty: "easy",
        popular: false,
        description: "각 단어의 첫 글자를 대문자로 변환합니다. 이름이나 제목 정리에 사용됩니다.",
        syntax: "=PROPER(텍스트)",
        example: {
            data: [
                ["A"],
                ["이름"],
                ["john smith"],
                ["mary JOHNSON"],
                ["david lee"]
            ],
            formula: "=PROPER(A2)",
            result: "John Smith"
        },
        tags: ["텍스트", "대소문자", "제목형식"]
    },
    {
        name: "COUNTA",
        category: "basic",
        difficulty: "easy",
        popular: true,
        description: "공백이 아닌 셀의 개수를 셉니다. 데이터 입력 현황 파악에 유용합니다.",
        syntax: "=COUNTA(값1, [값2, ...])",
        example: {
            data: [
                ["A"],
                ["데이터"],
                ["사과"], [""], ["바나나"], ["오렌지"], [""]
            ],
            formula: "=COUNTA(A2:A6)",
            result: "3"
        },
        tags: ["개수", "공백제외", "데이터현황"]
    },
    {
        name: "COUNTBLANK",
        category: "basic",
        difficulty: "easy",
        popular: false,
        description: "빈 셀의 개수를 셉니다. 미입력 데이터 현황 파악에 사용됩니다.",
        syntax: "=COUNTBLANK(범위)",
        example: {
            data: [
                ["A"],
                ["데이터"],
                ["사과"], [""], ["바나나"], [""], ["오렌지"]
            ],
            formula: "=COUNTBLANK(A2:A6)",
            result: "2"
        },
        tags: ["개수", "빈셀", "미입력현황"]
    }
];

// 카테고리별 정보
const categories = {
    basic: { name: "기본 함수", icon: "📈", difficulty: "easy" },
    lookup: { name: "조회/참조", icon: "🔍", difficulty: "medium" },
    text: { name: "텍스트 함수", icon: "📝", difficulty: "easy" },
    date: { name: "날짜/시간", icon: "📅", difficulty: "medium" },
    logical: { name: "논리 함수", icon: "🤔", difficulty: "medium" },
    advanced: { name: "고급 함수", icon: "🧠", difficulty: "hard" }
};

// 난이도별 정보
const difficulties = {
    easy: { name: "쉬움", color: "#28a745" },
    medium: { name: "보통", color: "#ffc107" },
    hard: { name: "어려움", color: "#dc3545" }
};
                