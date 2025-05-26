// 메인 애플리케이션 로직
class ExcelFunctionApp {
    constructor() {
        this.currentMode = 'functions';
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentSearchQuery = '';
        this.filteredFunctions = [...excelFunctions];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderNavigation();
        this.renderContent();
        this.updateStats();
    }
    
    setupEventListeners() {
        // 모드 전환 탭
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.switchMode(tab.dataset.mode);
            });
        });
        
        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
            
            if (e.key === '1' && !e.ctrlKey && !e.altKey) {
                this.switchMode('functions');
                document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                const tab = document.querySelector('[data-mode="functions"]');
                if (tab) tab.classList.add('active');
            }
            
            if (e.key === '2' && !e.ctrlKey && !e.altKey) {
                this.switchMode('scenarios');
                document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                const tab = document.querySelector('[data-mode="scenarios"]');
                if (tab) tab.classList.add('active');
            }
        });
    }
    
    setupSearchListener() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.currentSearchQuery = e.target.value;
                    if (this.currentMode === 'functions') {
                        this.applyFilters();
                    } else {
                        this.searchScenarios();
                    }
                }, 300);
            });
        }
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        this.currentSearchQuery = '';
        this.renderNavigation();
        this.renderContent();
        this.updateStats();
        console.log(`모드 전환: ${mode}`);
    }
    
    renderNavigation() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        
        if (this.currentMode === 'functions') {
            this.renderFunctionsNav(sidebar);
        } else {
            this.renderScenariosNav(sidebar);
        }
    }
    
    renderFunctionsNav(sidebar) {
        sidebar.innerHTML = `
            <div class="logo">
                <div class="logo-icon">📊</div>
                <div class="logo-text">Excel Hub</div>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active" data-category="all">
                        <span class="nav-icon">🏠</span>전체 함수
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-category="basic">
                        <span class="nav-icon">📈</span>기본 함수
                        <span class="difficulty-badge easy">쉬움</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-category="lookup">
                        <span class="nav-icon">🔍</span>조회/참조
                        <span class="difficulty-badge medium">보통</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-category="text">
                        <span class="nav-icon">📝</span>텍스트 함수
                        <span class="difficulty-badge easy">쉬움</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-category="date">
                        <span class="nav-icon">📅</span>날짜/시간
                        <span class="difficulty-badge medium">보통</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-category="logical">
                        <span class="nav-icon">🤔</span>논리 함수
                        <span class="difficulty-badge medium">보통</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" data-category="advanced">
                        <span class="nav-icon">🧠</span>고급 함수
                        <span class="difficulty-badge hard">어려움</span>
                    </a>
                </li>
            </ul>
        `;
        this.setupFunctionsNavListeners();
    }
    
    renderScenariosNav(sidebar) {
        if (typeof workScenarios === 'undefined') {
            sidebar.innerHTML = '<div style="padding: 20px; color: #ff6b6b;">시나리오 로딩 중...</div>';
            return;
        }
        
        const menuItems = workScenarios.map(scenario => `
            <li class="nav-item">
                <a href="#" class="nav-link" data-scenario="${scenario.id}">
                    <span class="nav-icon">${scenario.icon}</span>${scenario.name}
                    <span class="difficulty-badge ${scenario.difficulty}">
                        ${scenarioDifficulties && scenarioDifficulties[scenario.difficulty] ? scenarioDifficulties[scenario.difficulty].name : scenario.difficulty}
                    </span>
                </a>
            </li>
        `).join('');
        
        sidebar.innerHTML = `
            <div class="logo">
                <div class="logo-icon">💼</div>
                <div class="logo-text">업무 시나리오</div>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active">
                        <span class="nav-icon">📋</span>전체 시나리오
                    </a>
                </li>
                ${menuItems}
            </ul>
        `;
        this.setupScenariosNavListeners();
    }
    
    setupFunctionsNavListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                this.currentCategory = link.dataset.category || 'all';
                this.applyFilters();
            });
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.applyFilters();
            });
        });
    }
    
    setupScenariosNavListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const scenarioId = link.dataset.scenario;
                if (scenarioId) {
                    this.showScenarioDetail(scenarioId);
                } else {
                    this.showAllScenarios();
                }
            });
        });
    }
    
    renderContent() {
        if (this.currentMode === 'functions') {
            this.renderFunctionsContent();
        } else {
            this.renderScenariosContent();
        }
    }
    
    renderFunctionsContent() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="header">
                <div class="welcome-section">
                    <span class="welcome-icon">📊</span>
                    <h1 class="welcome-text">직장인 필수 엑셀 함수</h1>
                </div>
            </div>
            
            <div class="search-section">
                <input type="text" class="search-box" placeholder="함수명이나 기능으로 검색하세요..." id="searchInput">
                <button class="filter-btn active" data-filter="all">전체</button>
                <button class="filter-btn" data-filter="popular">인기</button>
                <button class="filter-btn" data-filter="easy">쉬움</button>
            </div>
            
            <div class="functions-grid" id="functionsGrid"></div>
            
            <div class="stats-section">
                <div class="stat-card">
                    <div class="stat-value" id="totalFunctions">0</div>
                    <div class="stat-label">총 함수 개수</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="displayedFunctions">0</div>
                    <div class="stat-label">표시된 함수</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="popularFunctions">0</div>
                    <div class="stat-label">인기 함수</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="easyFunctions">0</div>
                    <div class="stat-label">쉬운 함수</div>
                </div>
            </div>
        `;
        
        this.setupSearchListener();
        this.setupFunctionsNavListeners();
        this.renderFunctions();
    }
    
    renderScenariosContent() {
        this.showAllScenarios();
    }
    
    showAllScenarios() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        if (typeof workScenarios === 'undefined') {
            mainContent.innerHTML = '<div style="padding: 50px; text-align: center; color: #ff6b6b;">시나리오 데이터 로딩 실패</div>';
            return;
        }
        
        const scenarioCards = workScenarios.map(scenario => `
            <div class="scenario-card" data-scenario="${scenario.id}">
                <div class="scenario-header">
                    <div class="scenario-icon">${scenario.icon}</div>
                    <div>
                        <div class="scenario-title">${scenario.name}</div>
                        <div class="scenario-subtitle">${scenario.subtitle || ''}</div>
                    </div>
                </div>
                <div class="scenario-description">${scenario.description}</div>
                <div class="scenario-functions">
                    ${scenario.functions ? scenario.functions.slice(0, 4).map(func => 
                        `<span class="function-tag">${func}</span>`
                    ).join('') : ''}
                </div>
                <div class="scenario-meta">
                    <span>📚 ${scenario.functionCount || 0}개 함수</span>
                    <span>⏱️ ${scenario.estimatedTime || ''}</span>
                    <span class="scenario-difficulty ${scenario.difficulty}">
                        ${scenarioDifficulties && scenarioDifficulties[scenario.difficulty] ? scenarioDifficulties[scenario.difficulty].name : scenario.difficulty}
                    </span>
                </div>
            </div>
        `).join('');
        
        mainContent.innerHTML = `
            <div class="header">
                <div class="welcome-section">
                    <span class="welcome-icon">💼</span>
                    <h1 class="welcome-text">업무 시나리오별 엑셀 활용</h1>
                </div>
            </div>
            
            <div class="search-section">
                <input type="text" class="search-box" placeholder="시나리오를 검색하세요..." id="searchInput">
            </div>
            
            <div class="functions-grid">${scenarioCards}</div>
            
            <div class="stats-section">
                <div class="stat-card">
                    <div class="stat-value">${workScenarios.length}</div>
                    <div class="stat-label">총 시나리오</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${workScenarios.filter(s => s.difficulty === 'easy').length}</div>
                    <div class="stat-label">쉬운 시나리오</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${workScenarios.filter(s => s.category === 'gamedev').length}</div>
                    <div class="stat-label">게임개발</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${workScenarios.reduce((sum, s) => sum + (s.functionCount || 0), 0)}</div>
                    <div class="stat-label">총 예제 수</div>
                </div>
            </div>
        `;
        
        document.querySelectorAll('.scenario-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showScenarioDetail(card.dataset.scenario);
            });
        });
        
        this.setupSearchListener();
    }
    
    showScenarioDetail(scenarioId) {
        let scenarioData = null;
        
        if (scenarioId === 'salary_calc' && typeof salaryCalcScenario !== 'undefined') {
            scenarioData = salaryCalcScenario;
        } else if (scenarioId === 'game_dev_data' && typeof gameDevDataScenario !== 'undefined') {
            scenarioData = gameDevDataScenario;
        } else if (scenarioId === 'inventory_mgmt' && typeof inventoryMgmtScenarioComplete !== 'undefined') {
            scenarioData = inventoryMgmtScenarioComplete;
        } else {
            this.showComingSoon(scenarioId);
            return;
        }
        
        const mainContent = document.querySelector('.main-content');
        if (!mainContent || !scenarioData) return;
        
        const stepsHtml = scenarioData.steps ? scenarioData.steps.map(step => `
            <div class="step-guide">
                <div class="step-title">
                    <div class="step-number">${step.step}</div>${step.title}
                </div>
                <div class="step-content">${step.description}</div>
                ${step.example ? `
                    <div class="step-formula">${step.example.formula}</div>
                    <div class="step-result">결과: ${step.example.result}</div>
                    <div style="margin-top: 10px; color: #a0a0a0; font-size: 13px;">${step.example.explanation}</div>
                ` : ''}
            </div>
        `).join('') : '';
        
        const functionsHtml = scenarioData.relatedFunctions ? scenarioData.relatedFunctions.map(func => `
            <div class="function-card" style="margin-bottom: 15px;">
                <div class="function-name" style="font-size: 18px; margin-bottom: 8px;">${func.name}</div>
                <div class="function-description" style="margin-bottom: 10px;">${func.description}</div>
                <div class="syntax-box">${func.formula}</div>
            </div>
        `).join('') : '';
        
        const scenario = workScenarios.find(s => s.id === scenarioId);
        
        mainContent.innerHTML = `
            <div class="header">
                <div class="welcome-section">
                    <span class="welcome-icon">${scenario ? scenario.icon : '💼'}</span>
                    <h1 class="welcome-text">${scenarioData.title}</h1>
                </div>
                <button onclick="window.app.showAllScenarios()" style="
                    background: rgba(40, 167, 69, 0.2);
                    border: 1px solid #28a745;
                    color: #28a745;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                ">← 시나리오 목록</button>
            </div>
            
            <div style="background: rgba(30, 30, 50, 0.6); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #28a745; margin-bottom: 10px;">📋 시나리오 개요</h3>
                <p style="color: #e0e0e0; line-height: 1.6;">${scenarioData.description}</p>
            </div>
            
            <h3 style="color: #ffffff; margin-bottom: 20px;">📚 단계별 가이드</h3>
            ${stepsHtml}
            
            <h3 style="color: #ffffff; margin: 40px 0 20px 0;">🔧 관련 함수들</h3>
            <div class="functions-grid">${functionsHtml}</div>
        `;
    }
    
    showComingSoon(scenarioId) {
        const scenario = workScenarios.find(s => s.id === scenarioId);
        if (!scenario) return;
        
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="header">
                <div class="welcome-section">
                    <span class="welcome-icon">${scenario.icon}</span>
                    <h1 class="welcome-text">${scenario.name}</h1>
                </div>
                <button onclick="window.app.showAllScenarios()" style="
                    background: rgba(40, 167, 69, 0.2);
                    border: 1px solid #28a745;
                    color: #28a745;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                ">← 시나리오 목록</button>
            </div>
            
            <div style="text-align: center; padding: 80px 20px; color: #a0a0a0;">
                <div style="font-size: 64px; margin-bottom: 20px;">🚧</div>
                <h2 style="color: #ffffff; margin-bottom: 15px;">준비 중입니다</h2>
                <p style="margin-bottom: 20px;">${scenario.name} 시나리오는 현재 개발 중입니다.</p>
            </div>
        `;
    }
    
    searchScenarios() {
        if (!this.currentSearchQuery || typeof workScenarios === 'undefined') {
            this.showAllScenarios();
            return;
        }
        
        const filteredScenarios = workScenarios.filter(scenario => {
            const query = this.currentSearchQuery.toLowerCase();
            return scenario.name.toLowerCase().includes(query) ||
                   scenario.description.toLowerCase().includes(query);
        });
        
        if (filteredScenarios.length === 0) {
            const grid = document.querySelector('.functions-grid');
            if (grid) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #a0a0a0;">
                        <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                        <h3 style="color: #ffffff; margin-bottom: 10px;">검색 결과가 없습니다</h3>
                        <p>"${this.currentSearchQuery}"에 해당하는 시나리오를 찾을 수 없습니다.</p>
                    </div>
                `;
            }
        }
    }
    
    applyFilters() {
        if (this.currentMode !== 'functions') return;
        
        let functions = [...excelFunctions];
        
        if (typeof filterByCategory === 'function') {
            functions = filterByCategory(functions, this.currentCategory);
        }
        
        if (this.currentSearchQuery && typeof searchFunctions === 'function') {
            functions = searchFunctions(this.currentSearchQuery);
            if (this.currentCategory !== 'all' && typeof filterByCategory === 'function') {
                functions = filterByCategory(functions, this.currentCategory);
            }
        }
        
        if (typeof filterFunctions === 'function') {
            functions = filterFunctions(functions, this.currentFilter);
        }
        
        this.filteredFunctions = functions;
        this.renderFunctions();
        this.updateStats();
    }
    
    renderFunctions() {
        const grid = document.getElementById('functionsGrid');
        if (!grid || !this.filteredFunctions.length) return;
        
        if (typeof createFunctionCard === 'function') {
            const html = this.filteredFunctions.map(func => createFunctionCard(func)).join('');
            grid.innerHTML = html;
        }
    }
    
    updateStats() {
        if (this.currentMode !== 'functions') return;
        
        let stats = { total: 0, popular: 0, easy: 0 };
        
        if (typeof calculateStats === 'function') {
            stats = calculateStats();
        } else if (typeof excelFunctions !== 'undefined') {
            // 각각 별도로 계산
            const totalCount = excelFunctions.length;
            const popularCount = excelFunctions.filter(func => func.popular).length;
            const easyCount = excelFunctions.filter(func => func.difficulty === 'easy').length;
            
            stats = {
                total: totalCount,
                popular: popularCount,
                easy: easyCount
            };
        }
        
        this.animateNumber('totalFunctions', stats.total);
        this.animateNumber('displayedFunctions', this.filteredFunctions.length);
        this.animateNumber('popularFunctions', stats.popular);
        this.animateNumber('easyFunctions', stats.easy);
    }
    
    animateNumber(elementId, targetNumber) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const currentNumber = parseInt(element.textContent) || 0;
        const step = Math.ceil(Math.abs(targetNumber - currentNumber) / 10);
        const increment = targetNumber > currentNumber ? step : -step;
        
        let current = currentNumber;
        const timer = setInterval(() => {
            current += increment;
            
            if ((increment > 0 && current >= targetNumber) || 
                (increment < 0 && current <= targetNumber)) {
                current = targetNumber;
                clearInterval(timer);
            }
            
            element.textContent = current;
        }, 50);
    }
    
    resetFilters() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentSearchQuery = '';
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            }
        });
        
        if (this.currentMode === 'functions') {
            this.applyFilters();
        } else {
            this.showAllScenarios();
        }
    }
}

// 전역 변수
window.app = null;

// DOM 로드 완료 후 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.app = new ExcelFunctionApp();
        console.log('🎉 Excel Functions Hub 로드 완료!');
    } catch (error) {
        console.error('앱 초기화 오류:', error);
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 100px 20px; color: #ff6b6b;">
                    <h2>오류가 발생했습니다</h2>
                    <p>페이지를 새로고침해주세요.</p>
                    <button onclick="location.reload()" style="
                        background: #ff6b6b; color: white; border: none; 
                        padding: 12px 24px; border-radius: 8px; cursor: pointer;
                    ">새로고침</button>
                </div>
            `;
        }
    }
});

window.addEventListener('error', (e) => {
    console.error('전역 오류:', e.error);
});