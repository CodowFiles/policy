/**
 * 移动端表格优化 - 将复杂表格转为简化视图
 */

function optimizeTablesForMobile() {
    // 只在移动端执行
    if (window.innerWidth > 768) return;
    
    const tables = document.querySelectorAll('.excel-table, .doc-table');
    
    tables.forEach(table => {
        // 如果已经处理过，跳过
        if (table.dataset.mobileOptimized) return;
        
        const wrapper = table.closest('.table-wrapper');
        if (!wrapper) return;
        
        // 创建简化视图按钮
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-table-toggle';
        toggleBtn.innerHTML = '📊 切换简化视图';
        toggleBtn.style.cssText = `
            display: block;
            width: 100%;
            padding: 12px;
            margin-bottom: 10px;
            background: #1976d2;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
        `;
        
        // 创建简化视图容器
        const simpleView = document.createElement('div');
        simpleView.className = 'mobile-simple-view';
        simpleView.style.cssText = `
            display: none;
            font-size: 14px;
            line-height: 1.6;
        `;
        
        // 提取表格数据并生成简化视图
        const rows = table.querySelectorAll('tr');
        let simpleContent = '';
        
        rows.forEach((row, index) => {
            if (index === 0) return; // 跳过标题行
            
            const cells = row.querySelectorAll('td, th');
            if (cells.length < 2) return;
            
            const label = cells[0].textContent.trim();
            const values = Array.from(cells).slice(1).map(c => c.textContent.trim()).filter(v => v);
            
            if (label && values.length > 0) {
                simpleContent += `
                    <div style="margin-bottom: 16px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-weight: 600; color: #1976d2; margin-bottom: 8px; font-size: 13px;">${label}</div>
                        <div style="color: #333;">${values.join('<br>')}</div>
                    </div>
                `;
            }
        });
        
        simpleView.innerHTML = simpleContent || '<div style="padding: 20px; text-align: center; color: #999;">暂无数据</div>';
        
        // 切换功能
        let isSimpleView = false;
        toggleBtn.addEventListener('click', () => {
            isSimpleView = !isSimpleView;
            if (isSimpleView) {
                wrapper.style.display = 'none';
                simpleView.style.display = 'block';
                toggleBtn.innerHTML = '📋 显示完整表格';
                toggleBtn.style.background = '#666';
            } else {
                wrapper.style.display = 'block';
                simpleView.style.display = 'none';
                toggleBtn.innerHTML = '📊 切换简化视图';
                toggleBtn.style.background = '#1976d2';
            }
        });
        
        // 插入到DOM - 在table-wrapper之前插入
        wrapper.parentNode.insertBefore(toggleBtn, wrapper);
        wrapper.parentNode.insertBefore(simpleView, wrapper);
        
        table.dataset.mobileOptimized = 'true';
    });
}

// 导出函数供外部调用
window.optimizeTablesForMobile = optimizeTablesForMobile;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 延迟执行，确保表格已渲染
    setTimeout(optimizeTablesForMobile, 500);
});
