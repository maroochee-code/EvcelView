// 함수 카드 생성 관련 유틸리티 함수들

/**
 * 데이터 테이블 HTML 생성
 */
function createDataTable(data) {
    if (!data || !Array.isArray(data)) return '';
    
    let html = '<table class="data-table">';
    
    data.forEach((row, index) => {
        html += '<tr>';
        row.forEach(cell => {
            const tag = index === 0 ? 'th' : 'td';
            html += `<${tag}>${cell}</${tag}>`;
        });
        html += '</tr>';
    });
    
    html += '</table>';
    return html;
}

/**
 * 태그 HTML 생성
 */
function createTags(tags) {
    if (!tags || !Array.isArray(tags)) return '';
    
    return tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
}

/**
 * 난이도 배지 생성
 */
function createDifficultyBadge(difficulty) {
    const difficultyInfo = difficulties[difficulty];
    if (!difficultyInfo) return '';
    
    return `<div class="difficulty-badge ${difficulty}">${difficultyInfo.name}</div>`;
}

/**
 * 함수 카드 HTML 생성
 */
function createFunctionCard(func) {
    const difficultyBadge = createDifficultyBadge(func.difficulty);
    const dataTable = createDataTable(func.example.data);
    const tags = createTags(func.tags);
    
    // 추가 예제가 있는 경우 처리
    let additionalExample = '';
    if (func.example.additionalFormula) {
        additionalExample = `
            <br>
            <div class="syntax-box">${func.example.additionalFormula}</div>
            <div class="result-text">결과: ${func.example.additionalResult}</div>
        `;
    }
    
    return `
        <div class="function-card" 
             data-category="${func.category}" 
             data-difficulty="${func.difficulty}" 
             data-popular="${func.popular}">
            <div class="function-header">
                <div>
                    <div class="function-name">${func.name}</div>
                    ${difficultyBadge}
                </div>
            </div>
            <div class="function-description">
                ${func.description}
            </div>
            
            <div class="syntax-section">
                <div class="section-title">📋 문법</div>
                <div class="syntax-box">${func.syntax}</div>
            </div>

            <div class="example-section">
                <div class="section-title">💡 예제</div>
                <div class="example-grid">
                    <div class="example-data">
                        <strong>📊 데이터</strong>
                        ${dataTable}
                    </div>
                    <div class="example-result">
                        <strong>✅ 수식 & 결과</strong><br>
                        <div class="syntax-box">${func.example.formula}</div>
                        <div class="result-text">결과: ${func.example.result}</div>
                        ${additionalExample}
                    </div>
                </div>
                <button class="copy-btn" onclick="copyToClipboard('${func.example.formula}')">수식 복사</button>
            </div>

            <div class="tags">
                ${tags}
            </div>
        </div>
    `;
}

/**
 * 클립보드에 텍스트 복사
 */
function copyToClipboard(text) {
    // 특수문자 이스케이프 처리
    const cleanText = text.replace(/\\"/g, '"');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cleanText).then(() => {
            showNotification('수식이 클립보드에 복사되었습니다!', 'success');
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            fallbackCopyToClipboard(cleanText);
        });
    } else {
        fallbackCopyToClipboard(cleanText);
    }
}

/**
 * 클립보드 복사 대체 방법
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('수식이 클립보드에 복사되었습니다!', 'success');
    } catch (err) {
        console.error('클립보드 복사 실패:', err);
        showNotification('복사에 실패했습니다. 수동으로 복사해주세요.', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * 알림 표시
 */
function showNotification(message, type = 'info') {
    // 기존 알림이 있다면 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 스타일 적용
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    });
    
    // 타입별 배경색
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * 검색 기능
 */
function searchFunctions(query) {
    if (!query) return excelFunctions;
    
    const lowerQuery = query.toLowerCase();
    return excelFunctions.filter(func => {
        return func.name.toLowerCase().includes(lowerQuery) ||
               func.description.toLowerCase().includes(lowerQuery) ||
               func.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    });
}

/**
 * 필터링 기능
 */
function filterFunctions(functions, filterType) {
    switch (filterType) {
        case 'popular':
            return functions.filter(func => func.popular);
        case 'easy':
            return functions.filter(func => func.difficulty === 'easy');
        case 'medium':
            return functions.filter(func => func.difficulty === 'medium');
        case 'hard':
            return functions.filter(func => func.difficulty === 'hard');
        case 'all':
        default:
            return functions;
    }
}

/**
 * 카테고리별 필터링
 */
function filterByCategory(functions, category) {
    if (!category || category === 'all') return functions;
    return functions.filter(func => func.category === category);
}

/**
 * 통계 계산
 */
function calculateStats(functions = excelFunctions) {
    return {
        total: functions.length,
        popular: functions.filter(func => func.popular).length,
        easy: functions.filter(func => func.difficulty === 'easy').length,
        medium: functions.filter(func => func.difficulty === 'medium').length,
        hard: functions.filter(func => func.difficulty === 'hard').length,
        byCategory: Object.keys(categories).reduce((acc, category) => {
            acc[category] = functions.filter(func => func.category === category).length;
            return acc;
        }, {})
    };
}

/**
 * 랜덤 함수 추천
 */
function getRandomFunctions(count = 3) {
    const shuffled = [...excelFunctions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * 인기 함수 가져오기
 */
function getPopularFunctions() {
    return excelFunctions.filter(func => func.popular);
}

/**
 * 카테고리별 함수 개수 가져오기
 */
function getFunctionCountByCategory() {
    return Object.keys(categories).reduce((acc, category) => {
        acc[category] = excelFunctions.filter(func => func.category === category).length;
        return acc;
    }, {});
}