// 2026年政策文件汇编 - 主应用

// DOM 元素
const pages = {
    home: document.getElementById('home-page'),
    detail: document.getElementById('detail-page'),
    search: document.getElementById('search-page')
};

const elements = {
    policyList: document.getElementById('policy-list'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    searchResultCount: document.getElementById('search-result-count'),
    detailTitle: document.getElementById('detail-title'),
    textContent: document.getElementById('text-content'),
    scanContent: document.getElementById('scan-content'),
    pdfFrame: document.getElementById('pdf-frame'),
    textViewBtn: document.getElementById('text-view-btn'),
    scanViewBtn: document.getElementById('scan-view-btn'),
    backBtn: document.getElementById('back-btn'),
    searchBackBtn: document.getElementById('search-back-btn'),
    searchPageInput: document.getElementById('search-page-input'),
    searchPageBtn: document.getElementById('search-page-btn'),
    searchResults: document.getElementById('search-results'),
    searchStats: document.getElementById('search-stats')
};

// PDF图片缓存
let pdfManifest = null;
let currentPdfImages = [];

// 当前状态
let currentPolicy = null;
let currentView = 'text';

// 滚动位置记忆
// 详情页: { policyId: { text: scrollY, scan: scrollY } }
let scrollPositions = {};
// 主页滚动位置
let homeScrollPosition = 0;

// 搜索索引构建状态
let isSearchIndexReady = false;

// 初始化
async function init() {
    renderPolicyList();
    setupEventListeners();
    
    // 构建搜索索引
    await buildSearchIndex();
    isSearchIndexReady = true;
    
    // 检查URL状态，恢复页面
    restorePageState();
}

// 恢复页面状态（处理刷新或直接访问URL的情况）
function restorePageState() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#policy-')) {
        // 直接访问政策详情页
        const policyId = parseInt(hash.replace('#policy-', ''));
        if (policyId && policyData.find(p => p.id === policyId)) {
            openPolicy(policyId);
        }
    } else if (hash.startsWith('#search-')) {
        // 直接访问搜索结果页
        const keyword = decodeURIComponent(hash.replace('#search-', ''));
        if (keyword) {
            // 等待搜索索引构建完成
            const checkAndSearch = () => {
                if (isSearchIndexReady) {
                    performSearch(keyword);
                } else {
                    setTimeout(checkAndSearch, 100);
                }
            };
            checkAndSearch();
        }
    }
}

// 渲染政策列表
function renderPolicyList() {
    elements.policyList.innerHTML = policyData.map(policy => `
        <div class="policy-card" data-id="${policy.id}" onclick="openPolicy(${policy.id})">
            <div class="policy-number">${String(policy.id).padStart(2, '0')}</div>
            <div class="policy-info">
                <div class="policy-title">${policy.title}</div>
                <div class="policy-meta">
                    <span>${policy.category}</span>
                </div>
            </div>
            <div class="policy-badges">
                ${policy.hasWord ? `<span class="badge badge-word">${policy.isExcel ? '表格' : '文字版'}</span>` : '<span class="badge badge-missing">无文字版</span>'}
                ${policy.hasPdf ? '<span class="badge badge-pdf">扫描版</span>' : '<span class="badge badge-missing">无扫描版</span>'}
            </div>
        </div>
    `).join('');
}

// 打开政策详情
async function openPolicy(id) {
    const policy = policyData.find(p => p.id === id);
    if (!policy) return;
    
    // 保存主页滚动位置
    homeScrollPosition = window.scrollY;
    
    // 检查是否是重新进入同一文件
    const isReenteringSamePolicy = currentPolicy && currentPolicy.id === policy.id;
    
    currentPolicy = policy;
    elements.detailTitle.textContent = policy.title;
    
    // 重置视图
    currentView = policy.hasWord ? 'text' : 'scan';
    updateViewToggle();
    
    // 加载内容
    await loadPolicyContent(policy);
    
    // 切换页面
    showPage('detail');
    
    // 如果不是重新进入同一文件，或者是首次进入，则滚动到顶部
    // 重新进入同一文件时，保持之前的滚动位置记忆
    if (!isReenteringSamePolicy) {
        // 首次进入文件，滚动到顶部
        window.scrollTo(0, 0);
        // 清除该文件的滚动位置记忆（如果有）
        if (scrollPositions[policy.id]) {
            delete scrollPositions[policy.id];
        }
    } else {
        // 重新进入同一文件，恢复当前视图的滚动位置
        const savedPosition = scrollPositions[policy.id]?.[currentView];
        if (savedPosition !== undefined) {
            setTimeout(() => {
                window.scrollTo(0, savedPosition);
            }, 0);
        }
    }
    
    // 更新URL（用于刷新后保持状态）
    history.pushState({ page: 'detail', id: id }, '', `#policy-${id}`);
}

// 加载政策内容
async function loadPolicyContent(policy) {
    // 加载文字版
    if (policy.hasWord) {
        try {
            const response = await fetch(`documents/${policy.id}.html`);
            if (response.ok) {
                const html = await response.text();
                elements.textContent.innerHTML = html;
                // 修正图片路径（HTML片段中路径是相对于documents/目录的，需加前缀）
                elements.textContent.querySelectorAll('img').forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http') && !src.startsWith('documents/')) {
                        img.setAttribute('src', 'documents/' + src);
                    }
                });
            } else {
                elements.textContent.innerHTML = `
                    <div class="empty-state">
                        <h3>暂无文字版内容</h3>
                        <p>该文件暂无文字版，请查看扫描版</p>
                    </div>
                `;
            }
        } catch (e) {
            elements.textContent.innerHTML = `
                <div class="empty-state">
                    <h3>加载失败</h3>
                    <p>无法加载文字版内容，请查看扫描版</p>
                </div>
            `;
        }
    } else {
        elements.textContent.innerHTML = `
            <div class="empty-state">
                <h3>暂无文字版</h3>
                <p>该文件暂无文字版，请查看扫描版</p>
            </div>
        `;
    }
    
    // 加载PDF扫描版（图片形式）
    if (policy.hasPdf) {
        loadPdfImages(policy, elements.scanContent);
    } else {
        elements.scanContent.innerHTML = `
            <div class="empty-state">
                <h3>暂无扫描版</h3>
                <p>该文件暂无PDF扫描版</p>
            </div>
        `;
    }
}

// 加载PDF图片
async function loadPdfImages(policy, container) {
    // 获取适合的图片尺寸
    const getOptimalSize = () => {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    };
    
    const size = getOptimalSize();
    const pdfName = policy.pdfFile.replace('.pdf', '');
    
    // 显示加载中
    container.innerHTML = `
        <div class="pdf-images-container" style="padding: 20px; background: #f5f5f5; min-height: 400px;">
            <div class="pdf-loading" style="text-align: center; padding: 60px 20px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">📄</div>
                <div>正在加载扫描版...</div>
                <div style="font-size: 12px; margin-top: 10px; color: #999;">使用${size === 'mobile' ? '手机' : size === 'tablet' ? '平板' : '桌面'}优化画质</div>
            </div>
        </div>
    `;
    
    try {
        // 加载manifest（如果还没加载）
        if (!pdfManifest) {
            const response = await fetch('pdf-images/manifest.json');
            if (response.ok) {
                pdfManifest = await response.json();
            }
        }
        
        // 获取PDF信息
        const pdfInfo = pdfManifest?.pdfs?.[pdfName];
        const totalPages = pdfInfo?.pages || 1;
        
        // 构建图片HTML
        let imagesHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageNum = String(i).padStart(3, '0');
            const imagePath = `pdf-images/${pdfName}/${size}/page-${pageNum}.webp`;
            
            imagesHtml += `
                <div class="pdf-page-wrapper" style="margin-bottom: 20px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden;">
                    <img src="${imagePath}" 
                         alt="第${i}页" 
                         style="width: 100%; height: auto; display: block;"
                         loading="${i <= 2 ? 'eager' : 'lazy'}">
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="pdf-images-container" style="padding: 20px; background: #f5f5f5;">
                ${imagesHtml}
                <div class="pdf-footer" style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                    共 ${totalPages} 页 | 
                    <a href="pdfs/${encodeURIComponent(policy.pdfFile)}" download style="color: #1976d2; text-decoration: none;">下载原PDF</a>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('加载PDF图片失败:', error);
        // 降级到原始PDF
        container.innerHTML = `
            <div class="pdf-container" style="width:100%; height:calc(100vh - var(--header-height) - 3rem); overflow:auto; -webkit-overflow-scrolling: touch; background:#f5f5f5;">
                <iframe id="pdf-iframe-${policy.id}" src="pdfs/${encodeURIComponent(policy.pdfFile)}" frameborder="0" style="width:100%; height:100%; border:none;" onerror="this.parentElement.innerHTML='<div style=\\'padding:40px;text-align:center;color:#666;\\'><h3>PDF加载失败</h3><p>请尝试<a href=\\'pdfs/${encodeURIComponent(policy.pdfFile)}\\' download style=\\'color:#1976d2;\\'>下载PDF文件</a>查看</p></div>'"></iframe>
            </div>
        `;
        
        // 添加iframe加载超时检测
        setTimeout(() => {
            const iframe = document.getElementById(`pdf-iframe-${policy.id}`);
            if (iframe) {
                // 检查iframe是否加载成功（通过检查内容是否为空）
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                        // iframe加载失败，显示下载链接
                        container.innerHTML = `
                            <div style="padding: 40px; text-align: center; color: #666;">
                                <h3>PDF预览加载失败</h3>
                                <p style="margin-top: 16px;">可能是浏览器安全设置阻止了PDF预览</p>
                                <p style="margin-top: 8px;">
                                    <a href="pdfs/${encodeURIComponent(policy.pdfFile)}" download 
                                       style="display: inline-block; padding: 12px 24px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px; margin-top: 16px;">
                                        下载PDF文件查看
                                    </a>
                                </p>
                            </div>
                        `;
                    }
                } catch (e) {
                    // 跨域或安全限制，无法检测，保持原样
                }
            }
        }, 5000); // 5秒后检测
    }
}

// 更新视图切换按钮状态
function updateViewToggle() {
    if (currentView === 'text') {
        elements.textViewBtn.classList.add('active');
        elements.scanViewBtn.classList.remove('active');
        elements.textContent.classList.add('active');
        elements.scanContent.classList.remove('active');
    } else {
        elements.textViewBtn.classList.remove('active');
        elements.scanViewBtn.classList.add('active');
        elements.textContent.classList.remove('active');
        elements.scanContent.classList.add('active');
    }
    
    // 如果没有文字版，禁用文字版按钮
    if (!currentPolicy || !currentPolicy.hasWord) {
        elements.textViewBtn.disabled = true;
        elements.textViewBtn.style.opacity = '0.5';
        elements.textViewBtn.style.cursor = 'not-allowed';
    } else {
        elements.textViewBtn.disabled = false;
        elements.textViewBtn.style.opacity = '1';
        elements.textViewBtn.style.cursor = 'pointer';
    }
    
    // 如果没有PDF，禁用扫描版按钮
    if (!currentPolicy || !currentPolicy.hasPdf) {
        elements.scanViewBtn.disabled = true;
        elements.scanViewBtn.style.opacity = '0.5';
        elements.scanViewBtn.style.cursor = 'not-allowed';
    } else {
        elements.scanViewBtn.disabled = false;
        elements.scanViewBtn.style.opacity = '1';
        elements.scanViewBtn.style.cursor = 'pointer';
    }
    
}

// 切换视图
function switchView(view) {
    if (view === 'text' && (!currentPolicy || !currentPolicy.hasWord)) return;
    if (view === 'scan' && (!currentPolicy || !currentPolicy.hasPdf)) return;
    
    // 保存当前视图的滚动位置
    if (currentPolicy) {
        const policyId = currentPolicy.id;
        if (!scrollPositions[policyId]) {
            scrollPositions[policyId] = {};
        }
        scrollPositions[policyId][currentView] = window.scrollY;
    }
    
    currentView = view;
    updateViewToggle();
    
    // 恢复目标视图的滚动位置（如果有记录）
    if (currentPolicy) {
        const policyId = currentPolicy.id;
        const savedPosition = scrollPositions[policyId]?.[view];
        if (savedPosition !== undefined) {
            // 使用 setTimeout 确保 DOM 更新后再滚动
            setTimeout(() => {
                window.scrollTo(0, savedPosition);
            }, 0);
        } else {
            // 没有记录则滚动到顶部
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        }
    }
}

// 显示页面
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
    
    // 不自动滚动，滚动位置由调用者控制
    // 主页滚动位置在 goHome 中恢复
    // 详情页滚动位置在 openPolicy 中恢复
}

// 返回主页
function goHome() {
    // 保存当前文件的滚动位置（如果用户在详情页）
    if (currentPolicy && currentView) {
        const policyId = currentPolicy.id;
        if (!scrollPositions[policyId]) {
            scrollPositions[policyId] = {};
        }
        scrollPositions[policyId][currentView] = window.scrollY;
    }
    
    // 清除当前文件引用（这样下次进入会重新初始化）
    currentPolicy = null;
    
    showPage('home');
    
    // 恢复主页滚动位置
    setTimeout(() => {
        window.scrollTo(0, homeScrollPosition);
    }, 0);
    
    history.pushState({ page: 'home' }, '', '#');
}

// 执行搜索
function performSearch(keyword, showResultsPage = true) {
    if (!keyword || keyword.trim() === '') {
        if (showResultsPage) {
            goHome();
        }
        return;
    }
    
    // 检查搜索索引是否准备好
    if (!isSearchIndexReady) {
        if (showResultsPage) {
            elements.searchStats.innerHTML = '正在加载搜索索引，请稍候...';
            showPage('search');
            // 延迟重试
            setTimeout(() => performSearch(keyword, showResultsPage), 500);
        }
        return;
    }
    
    const results = searchDocuments(keyword);
    
    if (showResultsPage) {
        // 更新搜索页面
        elements.searchPageInput.value = keyword;
        elements.searchStats.innerHTML = `找到 ${results.length} 个结果，关键词："${keyword}"`;
        
        if (results.length === 0) {
            elements.searchResults.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>未找到结果</h3>
                    <p>请尝试其他关键词</p>
                </div>
            `;
        } else {
            elements.searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="openPolicy(${result.policy.id}); hideSearchPage();">
                    <div class="search-result-title">
                        ${highlightText(result.policy.title, keyword)}
                    </div>
                    <div class="search-result-snippet">
                        ${result.snippets.length > 0 ? highlightText(result.snippets[0], keyword) : result.policy.category}
                    </div>
                </div>
            `).join('');
        }
        
        showPage('search');
        history.pushState({ page: 'search', keyword: keyword }, '', `#search-${encodeURIComponent(keyword)}`);
    } else {
        // 更新主页搜索提示
        if (results.length > 0) {
            elements.searchResultCount.textContent = `找到 ${results.length} 个结果`;
            elements.searchResultCount.classList.remove('hidden');
        } else {
            elements.searchResultCount.classList.add('hidden');
        }
    }
}

// 高亮搜索关键词
function highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// 转义正则特殊字符
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 隐藏搜索页面
function hideSearchPage() {
    // 这个方法在点击搜索结果后调用
}



// 设置事件监听
function setupEventListeners() {
    // 搜索框
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(elements.searchInput.value);
        }
    });
    
    elements.searchBtn.addEventListener('click', () => {
        performSearch(elements.searchInput.value);
    });
    
    // 搜索页面搜索框
    elements.searchPageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(elements.searchPageInput.value);
        }
    });
    
    elements.searchPageBtn.addEventListener('click', () => {
        performSearch(elements.searchPageInput.value);
    });
    
    // 返回按钮
    elements.backBtn.addEventListener('click', goHome);
    elements.searchBackBtn.addEventListener('click', goHome);
    
    // 视图切换
    elements.textViewBtn.addEventListener('click', () => switchView('text'));
    elements.scanViewBtn.addEventListener('click', () => switchView('scan'));
    
    // 浏览器返回按钮
    window.addEventListener('popstate', (e) => {
        if (e.state) {
            if (e.state.page === 'home') {
                // 使用 goHome 恢复滚动位置
                goHome();
            } else if (e.state.page === 'detail' && e.state.id) {
                openPolicy(e.state.id);
            } else if (e.state.page === 'search' && e.state.keyword) {
                performSearch(e.state.keyword);
            }
        } else {
            goHome();
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // ESC 返回主页
        if (e.key === 'Escape') {
            const activePage = document.querySelector('.page.active');
            if (activePage && activePage.id !== 'home-page') {
                goHome();
            }
        }
        
        // / 聚焦搜索框
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            const activePage = document.querySelector('.page.active');
            if (activePage) {
                const searchInput = activePage.querySelector('input[type="text"]');
                if (searchInput) searchInput.focus();
            }
        }
        
        // Ctrl/Cmd + +/- 调整字体大小
    });
    
    // 屏幕尺寸变化时重新加载PDF图片（如果当前在扫描版视图）
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (currentView === 'scan' && currentPolicy && currentPolicy.hasPdf) {
                loadPdfImages(currentPolicy, elements.scanContent);
            }
        }, 500); // 防抖500ms
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
