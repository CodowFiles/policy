// 2026年政策文件数据
const policyData = [
    {
        id: 1,
        title: "2026年翻牌店政策与提成方案",
        wordFile: "2026年翻牌店政策与提成方案.xlsx",
        pdfFile: null,
        category: "激励方案",
        hasWord: true,
        hasPdf: false,
        isExcel: true
    },
    {
        id: 2,
        title: "2026年限时新开店政策及提成",
        wordFile: "2026限时新开店政策及提成.xlsx",
        pdfFile: null,
        category: "激励方案",
        hasWord: true,
        hasPdf: false,
        isExcel: true
    },
    {
        id: 3,
        title: "2026年新可多标准店紧密型加盟模式3.0",
        wordFile: "2026年新可多标准店紧密型加盟模式3.0版（定）.docx",
        pdfFile: "ZC-2026年新可多标准店紧密型加盟模式3.0版.pdf",
        category: "加盟政策",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 4,
        title: "2026年新可多鲜食店紧密型加盟模式3.0",
        wordFile: "2026年新可多鲜食店紧密型加盟模式3.0版（定）.docx",
        pdfFile: "ZC-2026年新可多鲜食店紧密型加盟模式3.0版.pdf",
        category: "加盟政策",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 5,
        title: "可多新开带铺加盟方案3.0",
        wordFile: "2026年可多新开带铺加盟方案3.0.docx",
        pdfFile: "JL-2026年可多新开带铺加盟方案3.0.pdf",
        category: "加盟政策",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 6,
        title: "可多新开店加盟优惠政策3.0",
        wordFile: "2026年可多新开店加盟优惠政策3.0.docx",
        pdfFile: "JL-2026年可多新开店加盟优惠政策3.0.pdf",
        category: "加盟政策",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 7,
        title: "新开门店首年异动处理方案2.0",
        wordFile: "2026年新开门店首年异动处理方案2.0.docx",
        pdfFile: "JL-2026年新开门店首年异动处理方案2.0.pdf",
        category: "门店管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 8,
        title: "门店迁址方案3.0",
        wordFile: "2026年门店迁址方案3.0.docx",
        pdfFile: "JL-2026年门店迁址方案3.0.pdf",
        category: "门店管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 9,
        title: "市场开发部本埠外埠区域划分规定2.0",
        wordFile: "2026年市场开发部本埠外埠区域划分规定2.0.docx",
        pdfFile: "ZC-2026年市场开发部本埠外埠区域划分规定2.0.pdf",
        category: "区域管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 10,
        title: "关于外埠市场开发设备支持方案2.0",
        wordFile: "2026年关于外埠市场开发设备支持方案2.0.docx",
        pdfFile: "JL-2026年关于外埠市场开发设备支持方案2.0.pdf",
        category: "支持方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 11,
        title: "市场开发部原东部战区方案1.0",
        wordFile: "2026年市场开发部原东部战区激励方案1.0.docx",
        pdfFile: "JL-2026年市场开发部原东部战区新规划方案1.0.pdf",
        category: "激励方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 12,
        title: "市场开发部光谷东片区阶段性激励方案1.0",
        wordFile: "2026年市场开发部光谷东片区激励方案1.0.docx",
        pdfFile: "JL-2026年市场开发部光谷东片区阶段性激励方案1.0.pdf",
        category: "激励方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 13,
        title: "市场开发部开店阶段达成激励方案2.0",
        wordFile: "2026年市场开发部开店阶段达成激励政策2.0（定）.docx",
        pdfFile: "JL-2026年市场开发部开店阶段达成激励方案2.0.pdf",
        category: "激励方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 14,
        title: "市场开发部新人培养期激励方案2.0",
        wordFile: "2026年市场开发部新人培养期激励政策2.0（定）.docx",
        pdfFile: "JL-2026年市场开发部新人培养期激励方案2.0.pdf",
        category: "激励方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 15,
        title: "2026年开发人员晋升降级内控标准优化3.0",
        wordFile: "2026年开发人员晋升降级内控标准优化3.0.docx",
        pdfFile: "JL-2026年开发人员晋升降级内控标准优化3.0.pdf",
        category: "人员管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 16,
        title: "2026年市场开发部开发员绩效标准及评比规则1.0",
        wordFile: "2026市场开发部开发员绩效标准及评比规则1.0.docx",
        pdfFile: "JL-2026市场开发部开发员绩效标准及评比规则1.0.pdf",
        category: "绩效管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 17,
        title: "市场开发部开店提成方案2.0",
        wordFile: null,
        pdfFile: "JL-2026年市场开发部开店提成方案2.0.pdf",
        category: "激励方案",
        hasWord: false,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 18,
        title: "市场开发部历史开店提成方案2.0",
        wordFile: "2026年市场开发部历史开店提成方案2.0（定）.docx",
        pdfFile: "JL-2026年市场开发部历史开店提成方案2.0.pdf",
        category: "激励方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 19,
        title: "场地评估流程标准4.0",
        wordFile: "2026年场地评估的流程标准4.0.docx",
        pdfFile: "JL-2026年可多场地评估流程标准4.0.pdf",
        category: "流程标准",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 20,
        title: "可多全民开发奖励方案4.0",
        wordFile: "2026年可多全民开发奖励方案4.0.docx",
        pdfFile: "JL-2026年可多全民开发奖励方案4.0.pdf",
        category: "激励方案",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 21,
        title: "招投标方案2.0",
        wordFile: "2026年招投标方案2.0.docx",
        pdfFile: "JL-2026年招投标方案2.0.pdf",
        category: "招投标",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 22,
        title: "市场开发部招标项目办理流程2.0",
        wordFile: "2026年市场开发部招标项目办理流程2.0.docx",
        pdfFile: "ZC-2026年市场开发部招标项目办理流程2.0.pdf",
        category: "招投标",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 23,
        title: "市场开发部黄区培训及会议机制3.0",
        wordFile: "2026年市场开发部黄区培训及会议机制优化3.0.docx",
        pdfFile: "ZC-2026年市场开发部黄区人员培训机制3.0.pdf",
        category: "培训管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 24,
        title: "市场开发部各岗位参会管理细则1.0",
        wordFile: "2026年市场开发部各岗位参会管理细则1.0.docx",
        pdfFile: "ZC-2026年市场开发部各岗位参会管理细则1.0.pdf",
        category: "会议管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 25,
        title: "市场开发部会议管理机制2.0",
        wordFile: "2026年市场开发部会议管理机制2.0.docx",
        pdfFile: "ZC-2026年市场开发部会议管理机制2.0.pdf",
        category: "会议管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 26,
        title: "2026年市场开发部开发评级方案1.0",
        wordFile: "2026年市场开发部开发评级方案1.0.docx",
        pdfFile: "ZC-2026年市场开发部开发评级方案1.0.pdf",
        category: "评级管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 27,
        title: "可多市场开发部招聘标准及要求2.0",
        wordFile: "2026年可多市场开发部招聘标准及要求2.0.docx",
        pdfFile: "ZC-2026年可多市场开发部招聘标准及要求2.0.pdf",
        category: "人员管理",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 28,
        title: "可多员工加盟开店指导方案2.0",
        wordFile: "2026年可多员工加盟开店指导方案2.0.docx",
        pdfFile: "ZC-2026年可多员工加盟开店指导方案2.0.pdf",
        category: "加盟政策",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 29,
        title: "可多加盟意向定金缴纳标准2.0",
        wordFile: "2026年可多加盟意向定金缴纳标准2.0.docx",
        pdfFile: "ZC-2026年可多加盟意向定金缴纳标准2.0.pdf",
        category: "加盟政策",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    },
    {
        id: 30,
        title: "大客户服务方案1.0",
        wordFile: "2026年大客户服务方案1.0.docx",
        pdfFile: null,
        category: "客户服务",
        hasWord: true,
        hasPdf: false,
        isExcel: false
    },
    {
        id: 31,
        title: "可多优质加盟商访谈方案1.0",
        wordFile: "2026年可多优质加盟商访谈方案1.0.docx",
        pdfFile: "ZC-2026年可多优质加盟商访谈方案1.0.pdf",
        category: "客户服务",
        hasWord: true,
        hasPdf: true,
        isExcel: false
    }
];

// 文件内容索引（用于全文搜索）
const documentIndex = {};

// 初始化搜索索引
async function buildSearchIndex() {
    for (const policy of policyData) {
        if (policy.hasWord) {
            try {
                const response = await fetch(`documents/${policy.id}.html`);
                if (response.ok) {
                    const html = await response.text();
                    // 提取纯文本
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const text = tempDiv.textContent || tempDiv.innerText || '';
                    documentIndex[policy.id] = {
                        title: policy.title,
                        content: text.toLowerCase(),
                        html: html
                    };
                }
            } catch (e) {
                console.warn(`无法加载文档 ${policy.id}:`, e);
            }
        }
    }
}

// 搜索功能
function searchDocuments(keyword) {
    if (!keyword || keyword.trim() === '') {
        return [];
    }
    
    const searchTerm = keyword.toLowerCase().trim();
    const results = [];
    
    for (const [id, doc] of Object.entries(documentIndex)) {
        const policy = policyData.find(p => p.id === parseInt(id));
        if (!policy) continue;
        
        const titleMatch = doc.title.toLowerCase().includes(searchTerm);
        const contentMatch = doc.content.includes(searchTerm);
        
        if (titleMatch || contentMatch) {
            // 找到匹配片段
            let snippets = [];
            if (contentMatch) {
                const index = doc.content.indexOf(searchTerm);
                const start = Math.max(0, index - 50);
                const end = Math.min(doc.content.length, index + searchTerm.length + 100);
                let snippet = doc.content.substring(start, end);
                if (start > 0) snippet = '...' + snippet;
                if (end < doc.content.length) snippet = snippet + '...';
                snippets.push(snippet);
            }
            
            results.push({
                policy: policy,
                titleMatch: titleMatch,
                snippets: snippets,
                relevance: titleMatch ? 2 : 1
            });
        }
    }
    
    // 按相关度排序
    results.sort((a, b) => b.relevance - a.relevance);
    
    return results;
}

// 获取政策文件路径
function getWordPath(policy) {
    if (!policy.hasWord) return null;
    return policy.isExcel ? 
        `word源文件/${policy.wordFile}` : 
        `documents/${policy.id}.html`;
}

function getPdfPath(policy) {
    if (!policy.hasPdf) return null;
    return `pdfs/${policy.pdfFile}`;
}
