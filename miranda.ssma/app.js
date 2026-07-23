// App State
let currentCompanyIndex = 0;
let activeTab = 'dashboard';
let CONTRACTORS = [];

// Initialize Dashboard
window.onload = function() {
  if (typeof AUDIT_DATA === 'undefined') {
    console.error("data.js not loaded!");
    return;
  }
  CONTRACTORS = AUDIT_DATA.filter(c => c.id !== 'fazenda_verginia');
  
  // Show Splash screen and wait for user to click
  // The enter button handles hiding it.

  // Initialize Views
  renderDashboard();
  renderStrategicAnalysis();
  populateCompanyDropdown();
  renderCompanyDetail(currentCompanyIndex);
  renderFazenda(); // Initialize fazenda
  
  // Set default tab
  switchTab('dashboard');
};

function enterDashboard() {
  const splash = document.getElementById('splash-screen');
  splash.style.opacity = '0';
  setTimeout(() => {
    splash.style.display = 'none';
  }, 500);
}

function goHome() {
  const splash = document.getElementById('splash-screen');
  splash.style.display = 'flex';
  setTimeout(() => {
    splash.style.opacity = '1';
  }, 10);
}

// Tab switcher
function switchTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(`tab-${tabName}`).classList.add('active');
  
  const printTitle = document.querySelector('.print-main-title');
  if (tabName === 'dashboard') {
    document.getElementById('btn-tab-dashboard').classList.add('active');
    const titleText = "Visão Geral de SSMA";
    document.getElementById('main-title').innerText = titleText;
    if (printTitle) printTitle.innerText = titleText;
  } else if (tabName === 'strategic') {
    document.getElementById('btn-tab-strategic').classList.add('active');
    const titleText = "Análise Estratégica";
    document.getElementById('main-title').innerText = titleText;
    if (printTitle) printTitle.innerText = titleText;
  } else if (tabName === 'companies') {
    document.getElementById('btn-tab-companies').classList.add('active');
    const company = CONTRACTORS[currentCompanyIndex];
    const titleText = "Auditoria Individual - " + company.name;
    document.getElementById('main-title').innerText = titleText;
    if (printTitle) printTitle.innerText = titleText;
  } else if (tabName === 'fazenda') {
    document.getElementById('btn-tab-fazenda').classList.add('active');
    const titleText = "Auditoria - Fazenda Santa Verginia";
    document.getElementById('main-title').innerText = titleText;
    if (printTitle) printTitle.innerText = titleText;
  } else if (tabName === 'help') {
    const titleText = "Metodologia & Entendimento de Dados";
    document.getElementById('main-title').innerText = titleText;
    if (printTitle) printTitle.innerText = titleText;
  }
}

// Populate dropdown selection of companies
function populateCompanyDropdown() {
  const select = document.getElementById('company-select');
  if (!select) return;
  select.innerHTML = "";
  
  CONTRACTORS.forEach((company, idx) => {
    const lastVisit = company.visitas[company.visitas.length - 1];
    const option = document.createElement('option');
    option.value = idx;
    option.text = `${company.name} (${lastVisit.scores.global}%)`;
    select.appendChild(option);
  });
}

// Select specific company
function selectCompany(index) {
  currentCompanyIndex = index;
  renderCompanyDetail(index);
  switchTab('companies');
  
  // Update dropdown selection if it exists
  const dropdown = document.getElementById('company-select');
  if (dropdown) {
    dropdown.value = index;
  }
}

// Carousel navigation
function navigateCarousel(direction) {
  let newIdx = currentCompanyIndex + direction;
  if (newIdx < 0) newIdx = CONTRACTORS.length - 1;
  if (newIdx >= CONTRACTORS.length) newIdx = 0;
  
  selectCompany(newIdx);
}

// Helper to get latest scores
function getLatestScore(company) {
  return company.visitas[company.visitas.length - 1].scores;
}

// Render Dashboard Tab Content
function renderDashboard() {
  // Set stats
  document.getElementById('stat-total-companies').innerText = CONTRACTORS.length;
  
  let sumDoc = 0, sumEst = 0, sumComp = 0, critCount = 0;
  CONTRACTORS.forEach(c => {
    const scores = getLatestScore(c);
    sumDoc += scores.documental;
    sumEst += scores.estrutural;
    sumComp += scores.comportamental;
    if (c.criticidade === "Crítico") critCount++;
  });
  
  const avgDoc = Math.round(sumDoc / CONTRACTORS.length);
  const avgEst = Math.round(sumEst / CONTRACTORS.length);
  const avgComp = Math.round(sumComp / CONTRACTORS.length);
  
  document.getElementById('stat-avg-documental').innerText = avgDoc + "%";
  document.getElementById('stat-avg-estrutural').innerText = avgEst + "%";
  document.getElementById('stat-avg-comportamental').innerText = avgComp + "%";
  document.getElementById('stat-critical-count').innerText = critCount;

  // Comparative Table
  const tableBody = document.getElementById('comparative-table-body');
  tableBody.innerHTML = "";
  
  CONTRACTORS.forEach((c, idx) => {
    const scores = getLatestScore(c);
    const row = document.createElement('tr');
    
    let criticBadge = `<span class="badge-pill bg-critico">Crítico</span>`;
    if (scores.global >= 80) criticBadge = `<span class="badge-pill bg-ok">Regular</span>`;
    else if (scores.global >= 60) criticBadge = `<span class="badge-pill bg-moderado">Moderado</span>`;
    else if (scores.global >= 40) criticBadge = `<span class="badge-pill bg-grave">Grave</span>`;
    
    row.innerHTML = `
      <td><strong>${c.name}</strong><br><small class="text-muted">${c.razaoSocial}</small></td>
      <td>${c.ramo}</td>
      <td>
        <div class="percentage-bar-container">
          <div class="percentage-bar" style="width: ${scores.documental}%; background-color: #1b2c59;"></div>
          <span>${scores.documental}%</span>
        </div>
      </td>
      <td>
        <div class="percentage-bar-container">
          <div class="percentage-bar" style="width: ${scores.estrutural}%; background-color: #d4a359;"></div>
          <span>${scores.estrutural}%</span>
        </div>
      </td>
      <td>
        <div class="percentage-bar-container">
          <div class="percentage-bar" style="width: ${scores.comportamental}%; background-color: #177542;"></div>
          <span>${scores.comportamental}%</span>
        </div>
      </td>
      <td>
        <div class="global-progress-wrapper">
          <span class="global-score-text">${scores.global}%</span>
          <div class="global-bar-outer">
            <div class="global-bar-inner" style="width: ${scores.global}%;"></div>
          </div>
        </div>
      </td>
      <td>${criticBadge}</td>
      <td class="no-print">
        <button class="action-view-btn" onclick="selectCompany(${idx})">Ver Detalhes</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Render Bar Comparison Chart (SVG inside JS)
  const chartContainer = document.getElementById('bar-chart');
  chartContainer.innerHTML = "";
  
  let svgContent = `
    <svg viewBox="0 0 800 350" class="comparison-svg-chart" width="100%">
      <!-- Grid Lines -->
      <line x1="50" y1="50" x2="780" y2="50" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
      <line x1="50" y1="125" x2="780" y2="125" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
      <line x1="50" y1="200" x2="780" y2="200" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
      <line x1="50" y1="275" x2="780" y2="275" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
      <line x1="50" y1="300" x2="780" y2="300" stroke="#ccc" stroke-width="1.5" />
      
      <!-- Y-Axis Labels -->
      <text x="40" y="55" class="chart-axis-text" text-anchor="end">100%</text>
      <text x="40" y="130" class="chart-axis-text" text-anchor="end">70%</text>
      <text x="40" y="205" class="chart-axis-text" text-anchor="end">40%</text>
      <text x="40" y="280" class="chart-axis-text" text-anchor="end">10%</text>
  `;

  const startX = 75;
  const spacingX = 85;
  const chartHeight = 250; 
  const baseLineY = 300; 

  CONTRACTORS.forEach((c, idx) => {
    const scores = getLatestScore(c);
    const currentX = startX + (idx * spacingX);
    
    const docH = Math.max(2, (scores.documental / 100) * chartHeight);
    const docY = baseLineY - docH;
    
    const estH = Math.max(2, (scores.estrutural / 100) * chartHeight);
    const estY = baseLineY - estH;
    
    const compH = Math.max(2, (scores.comportamental / 100) * chartHeight);
    const compY = baseLineY - compH;

    const animDelay = idx * 0.1;

    svgContent += `
      <g class="chart-bar-group" onclick="selectCompany(${idx})">
        <rect x="${currentX}" y="${docY}" width="16" height="${docH}" fill="#1b2c59" rx="3" class="chart-rect" style="animation-delay: ${animDelay}s" />
        <text x="${currentX + 8}" y="${docY - 6}" font-size="8px" font-weight="700" fill="#1b2c59" text-anchor="middle" class="chart-text-anim" style="animation-delay: ${animDelay + 0.3}s">${scores.documental}%</text>

        <rect x="${currentX + 18}" y="${estY}" width="16" height="${estH}" fill="#d4a359" rx="3" class="chart-rect" style="animation-delay: ${animDelay + 0.1}s" />
        <text x="${currentX + 26}" y="${estY - 6}" font-size="8px" font-weight="700" fill="#d4a359" text-anchor="middle" class="chart-text-anim" style="animation-delay: ${animDelay + 0.4}s">${scores.estrutural}%</text>

        <rect x="${currentX + 36}" y="${compY}" width="16" height="${compH}" fill="#177542" rx="3" class="chart-rect" style="animation-delay: ${animDelay + 0.2}s" />
        <text x="${currentX + 44}" y="${compY - 6}" font-size="8px" font-weight="700" fill="#177542" text-anchor="middle" class="chart-text-anim" style="animation-delay: ${animDelay + 0.5}s">${scores.comportamental}%</text>
        
        <text x="${currentX + 26}" y="322" class="chart-label-text" text-anchor="middle">${c.name.split(' ')[0]}</text>
      </g>
    `;
  });

  svgContent += `</svg>`;
  chartContainer.innerHTML = svgContent;

  // Render Global Compliance Ranking Chart (Horizontal bars)
  const rankingContainer = document.getElementById('ranking-chart');
  if (rankingContainer) {
    rankingContainer.innerHTML = "";
    
    const rankedData = [...CONTRACTORS].sort((a, b) => getLatestScore(b).global - getLatestScore(a).global);
    
    let rankingSvg = `
      <svg viewBox="0 0 800 420" class="ranking-svg-chart" width="100%">
        <line x1="180" y1="20" x2="180" y2="380" stroke="#ccc" stroke-width="1.5" />
        <line x1="315" y1="20" x2="315" y2="380" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
        <line x1="450" y1="20" x2="450" y2="380" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
        <line x1="585" y1="20" x2="585" y2="380" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
        <line x1="720" y1="20" x2="720" y2="380" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
        
        <text x="180" y="400" class="chart-axis-text" text-anchor="middle">0%</text>
        <text x="315" y="400" class="chart-axis-text" text-anchor="middle">25%</text>
        <text x="450" y="400" class="chart-axis-text" text-anchor="middle">50%</text>
        <text x="585" y="400" class="chart-axis-text" text-anchor="middle">75%</text>
        <text x="720" y="400" class="chart-axis-text" text-anchor="middle">100%</text>
    `;
    
    const rowHeight = 40;
    const chartLeftX = 180;
    const chartWidth = 540; 
    const startY = 30;
    
    rankedData.forEach((c, idx) => {
      const currentY = startY + (idx * rowHeight);
      const scores = getLatestScore(c);
      const barW = (scores.global / 100) * chartWidth;
      
      let color = "#177542"; // Green (Regular >= 80)
      if (scores.global < 40) color = "#d9534f"; // Red (Crítico)
      else if (scores.global < 60) color = "#d4a359"; // Yellow (Grave)
      else if (scores.global < 80) color = "#1b2c59"; // Navy (Moderado)
      
      const originalIdx = CONTRACTORS.findIndex(item => item.id === c.id);
      
      rankingSvg += `
        <g class="chart-bar-group" onclick="selectCompany(${originalIdx})">
          <text x="${chartLeftX - 15}" y="${currentY + 14}" class="chart-label-text" text-anchor="end" font-size="11px" font-weight="600" fill="#1f2937">${c.name}</text>
          <rect x="${chartLeftX}" y="${currentY}" width="${chartWidth}" height="18" fill="#f3f4f6" rx="4" />
          <rect x="${chartLeftX}" y="${currentY}" width="${barW}" height="18" fill="${color}" rx="4" class="chart-rect" />
          <text x="${chartLeftX + barW + 10}" y="${currentY + 14}" class="chart-val-text" font-size="11px" font-weight="700" fill="#1f2937">${scores.global}%</text>
        </g>
      `;
    });
    
    rankingSvg += `</svg>`;
    rankingContainer.innerHTML = rankingSvg;
  }

  // Criticality Distribution Lists
  const overviewList = document.getElementById('criticality-overview-list');
  overviewList.innerHTML = "";
  
  const counts = { "Crítico": 0, "Grave": 0, "Moderado": 0, "Regular": 0 };
  CONTRACTORS.forEach(c => { counts[c.criticidade] = (counts[c.criticidade] || 0) + 1; });
  
  const levels = [
    { name: "Crítico", count: counts["Crítico"], color: "#d9534f", bg: "rgba(217, 83, 79, 0.15)", desc: "Exige paralisação imediata ou ações corretivas nas próximas 24h por risco grave de acidentes." },
    { name: "Grave", count: counts["Grave"], color: "#f0ad4e", bg: "rgba(240, 173, 78, 0.15)", desc: "Desconformidades importantes de PGR/PCMSO, ASO ou EPI. Correção recomendada em até 15 dias." },
    { name: "Moderado", count: counts["Moderado"], color: "#5bc0de", bg: "rgba(91, 192, 222, 0.15)", desc: "Falhas administrativas, de sinalização ou organização de canteiros. Correção em até 30 dias." },
    { name: "Regular", count: counts["Regular"], color: "#177542", bg: "rgba(23, 117, 66, 0.15)", desc: "Alto índice de conformidade com poucas ou nenhuma recomendação corretiva pendente." }
  ];

  levels.forEach(lvl => {
    const item = document.createElement('div');
    item.className = "criticality-item";
    item.style.borderLeftColor = lvl.color;
    item.innerHTML = `
      <div class="crit-header">
        <span class="crit-title" style="color: ${lvl.color};">${lvl.name}</span>
        <span class="crit-badge-count" style="background-color: ${lvl.color};">${lvl.count}</span>
      </div>
      <p class="crit-desc">${lvl.desc}</p>
    `;
    overviewList.appendChild(item);
  });
}

function renderStrategicAnalysis() {
  const container = document.getElementById('strategic-analysis-render');
  if(!container) return;

  let maxVisits = 1;
  let totalLatestGlobal = 0;
  let criticidadeCounts = { 'Regular': 0, 'Moderado': 0, 'Grave': 0, 'Crítico': 0 };

  CONTRACTORS.forEach(c => {
    if (c.visitas.length > maxVisits) maxVisits = c.visitas.length;
    
    // For the Gauge and Distribution
    const latestScore = c.visitas[c.visitas.length - 1].scores.global;
    totalLatestGlobal += latestScore;

    if (latestScore >= 80) criticidadeCounts['Regular']++;
    else if (latestScore >= 60) criticidadeCounts['Moderado']++;
    else if (latestScore >= 40) criticidadeCounts['Grave']++;
    else criticidadeCounts['Crítico']++;
  });

  const avgGlobal = Math.round(totalLatestGlobal / CONTRACTORS.length);

  // Health Gauge Math
  const circumference = 314.16; // pi * r (r=100)
  const offset = circumference * (1 - (avgGlobal / 100));
  let gaugeColor = "#177542";
  if(avgGlobal < 40) gaugeColor = "#d9534f";
  else if(avgGlobal < 60) gaugeColor = "#d4a359";
  else if(avgGlobal < 80) gaugeColor = "#1b2c59";

  let topChartsHtml = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px;">
      <!-- Gauge Chart -->
      <div class="dashboard-card chart-box" style="margin-bottom: 0;">
        <div class="card-header">
          <h2>Saúde Global (Média Atual)</h2>
          <span class="sub-title">Média das notas gerais da última visita de todas as empresas</span>
        </div>
        <div class="bar-chart-container" style="padding: 20px 0; text-align: center; height: 180px;">
          <svg viewBox="0 0 240 140" width="100%" style="max-height: 160px; overflow: visible;">
            <!-- Background Arc -->
            <path d="M 20 130 A 100 100 0 0 1 220 130" fill="none" stroke="#f0f0f0" stroke-width="20" stroke-linecap="round" />
            <!-- Foreground Arc -->
            <path d="M 20 130 A 100 100 0 0 1 220 130" fill="none" stroke="${gaugeColor}" stroke-width="20" stroke-linecap="round" 
                  stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" 
                  style="animation: gaugeFill 1.5s ease-out forwards; animation-delay: 0.2s; --target-offset: ${offset};" />
            
            <text x="120" y="115" font-size="32px" font-weight="bold" fill="${gaugeColor}" text-anchor="middle" class="chart-text-anim">${avgGlobal}%</text>
            <text x="120" y="135" font-size="12px" fill="#6b7280" text-anchor="middle" class="chart-text-anim">Média Consolidada</text>
          </svg>
        </div>
      </div>

      <!-- Distribution Bars -->
      <div class="dashboard-card chart-box" style="margin-bottom: 0;">
        <div class="card-header">
          <h2>Distribuição de Criticidade</h2>
          <span class="sub-title">Status atual das ${CONTRACTORS.length} prestadoras avaliadas</span>
        </div>
        <div class="bar-chart-container" style="padding: 20px; display: flex; flex-direction: column; justify-content: center; height: 180px;">
  `;

  const critTypes = [
    { label: 'Regular', count: criticidadeCounts['Regular'], color: '#177542' },
    { label: 'Moderado', count: criticidadeCounts['Moderado'], color: '#1b2c59' },
    { label: 'Grave', count: criticidadeCounts['Grave'], color: '#d4a359' },
    { label: 'Crítico', count: criticidadeCounts['Crítico'], color: '#d9534f' }
  ];

  critTypes.forEach((ct, idx) => {
    const widthPct = (ct.count / CONTRACTORS.length) * 100;
    topChartsHtml += `
          <div style="margin-bottom: 12px; display: flex; align-items: center; width: 100%;">
            <div style="width: 70px; font-size: 11px; font-weight: bold; color: #555;">${ct.label}</div>
            <div style="flex: 1; background: #f0f0f0; height: 14px; border-radius: 4px; margin: 0 10px; overflow: hidden;">
              <div style="width: ${widthPct}%; height: 100%; background: ${ct.color}; animation: growWidth 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: ${idx * 0.15}s; --target-width: ${widthPct}%;"></div>
            </div>
            <div style="width: 20px; font-size: 11px; font-weight: bold; text-align: right;">${ct.count}</div>
          </div>
    `;
  });

  topChartsHtml += `
        </div>
      </div>
    </div>
  `;

  const evolutionList = CONTRACTORS.map(c => {
const firstScore = c.visitas[0].scores.global;
    const lastScore = c.visitas[c.visitas.length - 1].scores.global;
    const diff = lastScore - firstScore;
    const visits = c.visitas.length;
    return { c_obj: c, name: c.name, diff, firstScore, lastScore, visits };
  }).sort((a,b) => b.diff - a.diff);

  // Monthly Grouped Bar Chart for Global Evolution
  let barChartHtml = `
    <div class="dashboard-card chart-box" style="margin-bottom: 32px;">
      <div class="card-header">
        <h2>Evolução Global - Comparativo das Empresas (Mensal)</h2>
        <span class="sub-title">Desempenho da Última Visita de Maio vs Última Visita de Junho</span>
      </div>
      <div class="bar-chart-container" style="padding: 20px;">
        <svg viewBox="0 0 800 250" class="line-svg-chart" width="100%" style="max-height: 300px; overflow: visible;">
          <!-- Grid lines -->
          <line x1="50" y1="20" x2="780" y2="20" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
          <line x1="50" y1="110" x2="780" y2="110" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4" />
          <line x1="50" y1="200" x2="780" y2="200" stroke="#ccc" stroke-width="1.5" />
          
          <text x="40" y="25" class="chart-axis-text" text-anchor="end">100%</text>
          <text x="40" y="115" class="chart-axis-text" text-anchor="end">50%</text>
          <text x="40" y="205" class="chart-axis-text" text-anchor="end">0%</text>
  `;

  let legendHtml = `
    <div class="chart-legend" style="flex-wrap: wrap; justify-content: center; margin-top: 15px; gap: 15px;">
      <span class="legend-item" style="font-size: 11px;"><span class="legend-color" style="background:#1b2c59; width:12px; height:12px; border-radius:3px;"></span> Maio/26</span>
      <span class="legend-item" style="font-size: 11px;"><span class="legend-color" style="background:#177542; width:12px; height:12px; border-radius:3px;"></span> Junho/26</span>
    </div>
  `;

  const numCompanies = CONTRACTORS.length;
  const groupWidth = 700 / numCompanies;

  CONTRACTORS.forEach((c, idx) => {
    // Determine Maio and Junho scores
    let maioVisits = c.visitas.filter(v => v.dataAuditoria.includes('/05/'));
    let junhoVisits = c.visitas.filter(v => v.dataAuditoria.includes('/06/'));
    
    let monthlyData = [];
    if (maioVisits.length > 0) {
      monthlyData.push({ label: 'Maio', score: maioVisits[maioVisits.length - 1].scores.global, color: '#1b2c59' });
    }
    if (junhoVisits.length > 0) {
      monthlyData.push({ label: 'Junho', score: junhoVisits[junhoVisits.length - 1].scores.global, color: '#177542' });
    }
    if (monthlyData.length === 0) {
      monthlyData.push({ label: 'Última', score: c.visitas[c.visitas.length-1].scores.global, color: '#d4a359' });
    }

    const groupX = 70 + (idx * groupWidth);
    
    // Add company label at the bottom
    let compName = c.name.split(' ')[0];
    barChartHtml += `<text x="${groupX + groupWidth/2}" y="220" class="chart-label-text" font-size="11px" text-anchor="middle" font-weight="bold">${compName}</text>`;
    
    const barW = Math.min(28, (groupWidth - 15) / monthlyData.length);
    const totalBarsW = monthlyData.length * barW;
    const startBarX = groupX + (groupWidth - totalBarsW) / 2;

    monthlyData.forEach((md, m_idx) => {
      const barH = Math.max(2, (md.score / 100) * 180);
      const barY = 200 - barH;
      const barX = startBarX + (m_idx * barW);
      const animDelay = (idx * 0.1) + (m_idx * 0.1);
      
      barChartHtml += `<rect x="${barX}" y="${barY}" width="${barW - 2}" height="${barH}" fill="${md.color}" rx="2" class="chart-rect" style="animation-delay: ${animDelay}s" />`;
      barChartHtml += `<text x="${barX + (barW-2)/2}" y="${barY - 6}" font-size="11px" font-weight="bold" fill="${md.color}" text-anchor="middle" class="chart-text-anim" style="animation-delay: ${animDelay + 0.3}s">${md.score}%</text>`;
      
      if (m_idx === 1 && monthlyData.length === 2) {
         const diff = md.score - monthlyData[0].score;
         let badgeColor = "#d4a359";
         let diffStr = `→ (0%)`;
         if (diff > 0) { badgeColor = "#177542"; diffStr = `↑ (+${diff}%)`; }
         else if (diff < 0) { badgeColor = "#d9534f"; diffStr = `↓ (${diff}%)`; }

         let badgeW = 34 + (Math.abs(diff).toString().length * 4); 
         let badgeX = barX + (barW-2)/2 - badgeW/2;
         let arrowY = barY - 24;
         
         barChartHtml += `
          <g class="chart-text-anim" style="animation-delay: ${animDelay + 0.4}s">
            <rect x="${badgeX}" y="${arrowY - 9}" width="${badgeW}" height="12" fill="${badgeColor}" rx="3" />
            <text x="${barX + (barW-2)/2}" y="${arrowY}" font-size="8px" font-weight="bold" fill="#ffffff" text-anchor="middle">${diffStr}</text>
          </g>
         `;
      }
    });
  });

  barChartHtml += `
        </svg>
        ${legendHtml}
      </div>
    </div>
  `;

  let thVisits = "";
  for(let v=0; v<maxVisits; v++) {
    thVisits += `<th>Nota ${v+1}ª Visita</th>`;
  }

  let html = topChartsHtml + barChartHtml + `
    <div class="dashboard-card ranking-box" style="margin-bottom: 32px;">
      <div class="card-header">
        <h2>Ranking de Evolução Global (Eficácia de Gestão)</h2>
        <span class="sub-title">Comparação de desempenho histórico</span>
      </div>
      <div class="responsive-table-wrapper">
        <table class="comparative-table">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Empresa</th>
              <th>Status de Auditoria</th>
              ${thVisits}
              <th>Taxa de Melhoria</th>
            </tr>
          </thead>
          <tbody>
  `;

  evolutionList.forEach((e, i) => {
    let diffLabel = `<span style="color:#6b7280; font-weight:bold;">0% (Neutra)</span>`;
    if(e.diff > 0) diffLabel = `<span style="color:#177542; font-weight:bold;">+${e.diff}% (Evoluiu)</span>`;
    else if (e.diff < 0) diffLabel = `<span style="color:#d9534f; font-weight:bold;">${e.diff}% (Caiu)</span>`;
    
    let status = e.visits > 1 ? `<span class="badge-pill bg-ok">${e.visits} Visitas Realizadas</span>` : `<span class="badge-pill bg-moderado">Apenas 1 Visita</span>`;

    let tdVisits = "";
    for(let v=0; v<maxVisits; v++) {
      if(v < e.c_obj.visitas.length) {
        let sc = e.c_obj.visitas[v].scores.global;
        let diffIndicator = "";
        if (v > 0) {
           let prev = e.c_obj.visitas[v-1].scores.global;
           let diff = sc - prev;
           if (diff > 0) diffIndicator = `<div style="color:#177542; font-size:11px; margin-top:2px; display:inline-block; font-weight:bold;">↑ (+${diff}%)</div>`;
           else if (diff < 0) diffIndicator = `<div style="color:#d9534f; font-size:11px; margin-top:2px; display:inline-block; font-weight:bold;">↓ (${diff}%)</div>`;
           else diffIndicator = `<div style="color:#d4a359; font-size:11px; margin-top:2px; display:inline-block; font-weight:bold;">→ (0%)</div>`;
        }
        tdVisits += `<td>${sc}% ${diffIndicator}</td>`;
      } else {
        tdVisits += `<td style="color:#aaa; vertical-align: middle;">-</td>`;
      }
    }

    let medal = "";
    if (i === 0) medal = "🥇 ";
    else if (i === 1) medal = "🥈 ";
    else if (i === 2) medal = "🥉 ";

    html += `
      <tr>
        <td style="font-weight:bold; font-size:16px;">${medal}#${i+1}</td>
        <td><strong>${e.name}</strong></td>
        <td>${status}</td>
        ${tdVisits}
        <td>${diffLabel}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
    </div>
  `;

  // ==========================================
  // NOVO: Raio-X de Competências (Fortalezas, Fraquezas e Gaps)
  // ==========================================
  let raioxHtml = `
    <div style="page-break-inside: avoid;">
      <div class="detail-section-title raiox-title" style="margin-top: 40px; margin-bottom: 20px;">
        <h2>Raio-X de Competências por Prestador</h2>
        <p class="section-desc">Análise de Fortalezas, Fraquezas e Mapeamento de Pendências do Plano de Ação (Última Visita)</p>
      </div>
      <div class="raiox-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 40px;">
  `;

  CONTRACTORS.forEach((c, idx) => {
    const latestVisit = c.visitas[c.visitas.length - 1];
    const s = latestVisit.scores;
    const scoresArr = [
      { key: 'Documental', val: s.documental, color: '#1b2c59' },
      { key: 'Estrutural', val: s.estrutural, color: '#d4a359' },
      { key: 'Comportamental', val: s.comportamental, color: '#177542' }
    ];
    
    scoresArr.sort((a,b) => b.val - a.val);
    const fortaleza = scoresArr[0];
    const fraqueza = scoresArr[2];
    
    // Gaps and Pending Actions
    const gap = 100 - fraqueza.val;
    let pendingActionsHtml = "";
    const pendentes = (latestVisit.planoAcao || []).filter(a => a.status === 'Pendente');
    
    if (pendentes.length > 0) {
      pendentes.slice(0, 3).forEach(act => {
        pendingActionsHtml += `<li style="font-size: 11px; margin-bottom: 6px; color: #555; padding-left: 14px; position: relative;"><span style="position:absolute; left:0; color:#d9534f;">•</span> ${act.acao}</li>`;
      });
      if (pendentes.length > 3) {
        pendingActionsHtml += `<li style="font-size: 11px; color: #888; font-style: italic; list-style:none;">+ ${pendentes.length - 3} ações pendentes...</li>`;
      }
    } else {
      pendingActionsHtml = `<li style="font-size: 11px; color: #177542; list-style:none;">Nenhuma ação pendente mapeada.</li>`;
    }

    const badgeBg = s.global >= 80 ? '#177542' : (s.global >= 50 ? '#d4a359' : '#d9534f');

    raioxHtml += `
      <div class="dashboard-card" style="margin: 0; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin:0; font-size: 16px; color: #333;">${c.name}</h3>
          <span class="badge-pill" style="background-color: ${badgeBg}; color:#fff; font-size:10px;">${s.global}%</span>
        </div>
        
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <div style="flex: 1; background: rgba(23, 117, 66, 0.05); border-left: 3px solid #177542; padding: 10px; border-radius: 0 4px 4px 0;">
            <div style="font-size: 10px; color: #666; font-weight: bold; text-transform: uppercase; margin-bottom: 4px;">💪 Fortaleza</div>
            <div style="font-size: 14px; color: ${fortaleza.color}; font-weight: bold;">${fortaleza.key} <span style="float:right;">${fortaleza.val}%</span></div>
          </div>
          <div style="flex: 1; background: rgba(217, 83, 79, 0.05); border-left: 3px solid #d9534f; padding: 10px; border-radius: 0 4px 4px 0;">
            <div style="font-size: 10px; color: #666; font-weight: bold; text-transform: uppercase; margin-bottom: 4px;">⚠️ Fraqueza</div>
            <div style="font-size: 14px; color: ${fraqueza.color}; font-weight: bold;">${fraqueza.key} <span style="float:right;">${fraqueza.val}%</span></div>
          </div>
        </div>

        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong style="font-size: 12px; color: #333;">📉 Gap Identificado: ${gap}%</strong>
            <span style="font-size: 10px; background: #e0e0e0; padding: 2px 6px; border-radius: 10px; color: #555;">Plano de Ação</span>
          </div>
          <ul style="margin: 0; padding: 0;">
            ${pendingActionsHtml}
          </ul>
        </div>
      </div>
    `;
  });

  raioxHtml += `</div></div>`;
  html += raioxHtml;

  container.innerHTML = html;
}

// Render Company Detail Sheet
function buildCompanyHtml(company, isFazenda) {
  const statusIcon = (status) => {
    if (status === 'conforme') return `<svg class="chk-icon conf" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
    if (status === 'nao_conforme') return `<svg class="chk-icon nconf" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
    return `<svg class="chk-icon pend" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
  };

  const statusClass = (status) => {
    if (status === 'conforme') return 'status-conforme';
    if (status === 'nao_conforme') return 'status-nconforme';
    return 'status-pendente';
  };

  let criticBadge = `<span class="badge-pill bg-critico">Crítico</span>`;
  if (company.criticidade === "Grave") criticBadge = `<span class="badge-pill bg-grave">Grave</span>`;
  else if (company.criticidade === "Moderado") criticBadge = `<span class="badge-pill bg-moderado">Moderado</span>`;
  else if (company.criticidade === "Regular") criticBadge = `<span class="badge-pill bg-ok">Regular</span>`;

  const datesArrayStr = "[ " + company.visitas.map(v => v.dataAuditoria.substring(0,5)).join(" , ") + " ]";
  const latestVisit = company.visitas[company.visitas.length - 1];

  const actionMap = new Map();
  company.visitas.forEach((visita, v_idx) => {
    visita.planoAcao.forEach(act => {
      if(!actionMap.has(act.acao)) {
        actionMap.set(act.acao, { criticidade: act.criticidade, statuses: Array(company.visitas.length).fill('-') });
      }
      actionMap.get(act.acao).statuses[v_idx] = act.status;
    });
  });

  let thVisits = "";
  company.visitas.forEach(v => { thVisits += `<th>Status em ${v.dataAuditoria.substring(0,5)}</th>`; });

  let actionPlanRows = "";
  actionMap.forEach((val, acao) => {
    let actClass = "text-yellow";
    if (val.criticidade === "Crítico") actClass = "text-red";
    else if (val.criticidade === "Grave") actClass = "text-orange";
    
    let tds = "";
    val.statuses.forEach(st => {
      let stBadge = `<span class="badge-pill bg-moderado">${st}</span>`;
      if(st === 'Concluído') stBadge = `<span class="badge-pill bg-ok">Concluído</span>`;
      else if(st === 'Pendente') stBadge = `<span class="badge-pill bg-critico">Pendente</span>`;
      tds += `<td>${stBadge}</td>`;
    });

    actionPlanRows += `
      <tr>
        <td>${acao}</td>
        <td><strong class="${actClass}">${val.criticidade}</strong></td>
        ${tds}
      </tr>
    `;
  });
  
  if (actionMap.size === 0) {
    actionPlanRows = `<tr><td colspan="${2 + company.visitas.length}" class="text-center text-muted">Nenhuma ação corretiva necessária.</td></tr>`;
  }

  let lineChartSvg = "";
  if(company.visitas.length >= 1) {
    let tableRows = "";
    const criteria = [
      { key: 'documental', label: 'Documental', color: '#1b2c59' },
      { key: 'estrutural', label: 'Estrutural', color: '#d4a359' },
      { key: 'comportamental', label: 'Comportamento', color: '#177542' },
      { key: 'global', label: 'Conformidade Global', color: '#d9534f' }
    ];

    let thVisits = "";
    company.visitas.forEach((v, i) => {
      thVisits += `<th style="text-align:center;">${i+1}ª Visita <br><small>(${v.dataAuditoria.substring(0,5)})</small></th>`;
    });

    criteria.forEach(crit => {
      let tds = "";
      company.visitas.forEach((v, v_idx) => {
         const score = v.scores[crit.key];
         let colorClass = "text-red";
         if (score >= 80) colorClass = "text-green";
         else if (score >= 50) colorClass = "text-orange";
         
         let diffHtml = "";
         if (v_idx > 0) {
           const prevScore = company.visitas[v_idx-1].scores[crit.key];
           const diff = score - prevScore;
           if (diff > 0) diffHtml = `<span style="font-size:11px;color:#177542;margin-left:6px;font-weight:bold;">▲ +${diff}%</span>`;
           else if (diff < 0) diffHtml = `<span style="font-size:11px;color:#d9534f;margin-left:6px;font-weight:bold;">▼ ${diff}%</span>`;
           else diffHtml = `<span style="font-size:11px;color:gray;margin-left:6px;font-weight:bold;">-</span>`;
         }
         tds += `<td style="text-align:center;"><strong><span class="${colorClass}">${score}%</span></strong>${diffHtml}</td>`;
      });
      tableRows += `
        <tr>
          <td>
            <span style="display:inline-block; width:12px; height:12px; background:${crit.color}; border-radius:3px; margin-right:8px; vertical-align:middle;"></span>
            <strong>${crit.label}</strong>
          </td>
          ${tds}
        </tr>
      `;
    });

    lineChartSvg = `
      <div style="overflow-x: auto; padding: 10px;">
        <table class="action-table">
          <thead>
            <tr>
              <th style="text-align: left;">Critério de Avaliação</th>
              ${thVisits}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  }
  let dynamicLegendHtml = "";

  let html = `
    <!-- Header Info -->
    <div class="company-card-header">
      <div class="company-title-block">
        <div class="company-badge-row">
          <span class="company-date-badge">Visitas: ${datesArrayStr}</span>
          ${criticBadge}
        </div>
        <h1>${company.name}</h1>
        <p class="company-sub-info"><strong>Razão Social:</strong> ${company.razaoSocial} &bull; <strong>Ramo:</strong> ${company.ramo}</p>
        <p class="company-sub-info"><strong>Responsável Empresa:</strong> ${company.responsavel} &bull; <strong>Técnico Miranda:</strong> ${company.responsavelMiranda}</p>
      </div>
      <div class="company-score-block">
        <div class="score-circle">
          <span class="score-label">SAÚDE GLOBAL</span>
          <span class="score-value">${latestVisit.scores.global}%</span>
        </div>
      </div>
    </div>

    <div class="company-charts-row">
      <!-- Evolution Chart -->
      <div class="dashboard-card chart-box">
        <div class="card-header">
          <h2>Evolução de Critérios por Visita</h2>
          <span class="sub-title">Comparativo Histórico de Atendimento (Gráfico de Linha)</span>
        </div>
        <div class="bar-chart-container" style="padding: 10px;">
          ${lineChartSvg}
          ${dynamicLegendHtml}
        </div>
      </div>

  ${(() => {
    let diagnosisHtml = "";
    const pendentes = latestVisit.planoAcao.filter(a => a.status === 'Pendente');
    const concluidos = latestVisit.planoAcao.filter(a => a.status === 'Concluído');
    
    if (pendentes.length === 0) {
      diagnosisHtml = `<p><strong>Diagnóstico:</strong> A empresa não possui ações corretivas pendentes no momento. Desempenho excelente e em conformidade com as exigências de SSMA.</p>`;
    } else {
      diagnosisHtml = `<p><strong>Avanços:</strong> Foram concluídas ${concluidos.length} ações corretivas nas visitas passadas.</p>
                       <p><strong>Pontos de Atenção:</strong> A empresa ainda possui <strong>${pendentes.length} ações pendentes</strong>, sendo que ${pendentes.filter(p => p.criticidade === 'Crítico' || p.criticidade === 'Grave').length} possuem criticidade alta (Grave/Crítico). É necessário focar na resolução prioritária destas ações.</p>`;
    }
    return `
      <!-- General Diagnosis -->
      <div class="dashboard-card diagnosis-box">
        <div class="card-header">
          <h2>Diagnóstico e Constatações Técnicas</h2>
          <span class="sub-title">Avaliação resumida (Última Visita: ${latestVisit.dataAuditoria.substring(0,5)})</span>
        </div>
        <div class="diagnosis-content">
          ${diagnosisHtml}
        </div>
      </div>
    `;
  })()}
    </div>

    <!-- The Details Grid (Checklist & Action Plan) -->
    <div class="details-grid">
      
      <!-- Checklist -->
      <div class="dashboard-card checklist-box">
        <div class="card-header">
          <h2>Checklist Detalhado (Última Visita)</h2>
        </div>
        <div class="chk-grid">
          <!-- 1. DOCUMENTAL -->
          <div class="checklist-card">
            <div class="chk-card-header">
              <svg class="icon icon-blue" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
              <h3>1. Gestão Documental</h3>
            </div>
            <ul class="chk-list">
              <li class="${statusClass(latestVisit.checklist.documental.registro.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.registro.status)}
                  <span class="chk-item-name">Registro de Empregados</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.registro.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.documental.aso.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.aso.status)}
                  <span class="chk-item-name">ASO Atualizado</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.aso.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.documental.pgr.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.pgr.status)}
                  <span class="chk-item-name">PGR / PCMSO</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.pgr.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.documental.treinamentos.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.treinamentos.status)}
                  <span class="chk-item-name">Treinamentos Normativos</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.treinamentos.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.documental.fichas_epi.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.fichas_epi.status)}
                  <span class="chk-item-name">Fichas de EPI</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.fichas_epi.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.documental.os.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.os.status)}
                  <span class="chk-item-name">Ordem de Serviço (OS)</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.os.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.documental.integracao.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.documental.integracao.status)}
                  <span class="chk-item-name">Treinamento de Integração</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.documental.integracao.desc}</p>
              </li>
            </ul>
          </div>
          
          <!-- 2. ESTRUTURAL -->
          <div class="checklist-card">
            <div class="chk-card-header">
              <svg class="icon icon-orange" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.83L19.17 20H4.83L12 5.83zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
              <h3>2. Condições Estruturais</h3>
            </div>
            <ul class="chk-list">
              <li class="${statusClass(latestVisit.checklist.estrutural.banheiro.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.estrutural.banheiro.status)}
                  <span class="chk-item-name">Instalações Sanitárias</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.estrutural.banheiro.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.estrutural.refeicao.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.estrutural.refeicao.status)}
                  <span class="chk-item-name">Local de Refeições/Vivência</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.estrutural.refeicao.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.estrutural.epi_fornecimento.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.estrutural.epi_fornecimento.status)}
                  <span class="chk-item-name">Fornecimento de EPI</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.estrutural.epi_fornecimento.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.estrutural.seguranca_geral.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.estrutural.seguranca_geral.status)}
                  <span class="chk-item-name">Condições de Segurança</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.estrutural.seguranca_geral.desc}</p>
              </li>
            </ul>
          </div>
          
          <!-- 3. COMPORTAMENTO -->
          <div class="checklist-card">
            <div class="chk-card-header">
              <svg class="icon icon-green" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.25z"/></svg>
              <h3>3. Comportamento Seguro</h3>
            </div>
            <ul class="chk-list">
              <li class="${statusClass(latestVisit.checklist.comportamento.comportamento_seguro.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.comportamento.comportamento_seguro.status)}
                  <span class="chk-item-name">Postura e Comportamento</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.comportamento.comportamento_seguro.desc}</p>
              </li>
              <li class="${statusClass(latestVisit.checklist.comportamento.uso_epi.status)}">
                <div class="chk-item-header">
                  ${statusIcon(latestVisit.checklist.comportamento.uso_epi.status)}
                  <span class="chk-item-name">Uso Efetivo de EPI</span>
                </div>
                <p class="chk-item-desc">${latestVisit.checklist.comportamento.uso_epi.desc}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Action Plan -->
      <div class="dashboard-card action-plan-box">
        <div class="card-header">
          <h2>Matriz de Plano de Ação</h2>
          <span class="sub-title">Acompanhamento das ações mapeadas ao longo do tempo</span>
        </div>
        <div style="overflow-x: auto; padding: 10px;">
          <table class="action-table">
            <thead>
              <tr>
                <th>Ação / Adequação</th>
                <th>Criticidade</th>
                ${thVisits}
              </tr>
            </thead>
            <tbody>
              ${actionPlanRows}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
  return html;
}

function renderCompanyDetail(index) {
  const company = CONTRACTORS[index];
  document.getElementById('current-carousel-index').innerText = index + 1;
  document.getElementById('total-carousel-companies').innerText = CONTRACTORS.length;
  const container = document.getElementById('company-detail-card-render');
  container.innerHTML = buildCompanyHtml(company, false);
}

function printReport() {
  const originalTitle = document.title;
  if (activeTab === 'dashboard' || activeTab === 'help') {
    printFullReport();
    return;
  } else if (activeTab === 'strategic') {
    document.title = "Análise Estratégica - Relatório de Auditorias SSMA";
  } else if (activeTab === 'companies') {
    const company = CONTRACTORS[currentCompanyIndex];
    document.title = "Análise " + company.name + " - Relatório SSMA";
  }
  
  window.print();
  
  setTimeout(() => { document.title = originalTitle; }, 500);
}

function printCapa() {
  printFullReport();
}

function printFullReport() {
  const originalTitle = document.title;
  const printTitleEl = document.querySelector('.print-main-title');
  const originalPrintTitle = printTitleEl.innerText;
  
  document.title = "Relatório Executivo de Auditorias SSMA";
  printTitleEl.innerText = "Visão Geral de SSMA";
  
  document.body.classList.add('printing-full');
  window.print();
  document.body.classList.remove('printing-full');
  
  setTimeout(() => { 
    document.title = originalTitle; 
    printTitleEl.innerText = originalPrintTitle;
  }, 500);
}

// ==========================================
// RENDER HELP & METHODOLOGY PAGE
// ==========================================
function renderHelpPage() {
  const container = document.getElementById('help-render');
  if(!container) return;

  container.innerHTML = `
    <div class="help-hero">
      <h1>Bem-vindo à Central de Metodologia</h1>
      <p>Este painel foi desenvolvido para oferecer total transparência sobre como a <strong>Miranda SSMA</strong> avalia as prestadoras de serviço da <strong>Santa Verginia</strong>. Entenda abaixo os critérios de pontuação, as fórmulas utilizadas e como interpretar os painéis estratégicos.</p>
    </div>

    <div class="help-grid">
      <!-- Card 1: Pilares -->
      <div class="help-card">
        <div class="help-card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>1. Os 3 Pilares da Avaliação</h3>
        <p>Durante a visita técnica, o Técnico de Segurança do Trabalho avalia a empresa em três grandes frentes. A pontuação em cada pilar vai de 0% a 100%.</p>
        <div class="help-badge-list">
          <div class="help-badge-item" style="border-color: #1b2c59;">
            <div style="flex: 1;">
              <div class="help-badge-title" style="color: #1b2c59;">📘 Documental</div>
              <div class="help-badge-desc">Avalia PGR, PCMSO, ASOs, Fichas de EPI e integrações. A base legal e administrativa da segurança.</div>
            </div>
          </div>
          <div class="help-badge-item" style="border-color: #d4a359;">
            <div style="flex: 1;">
              <div class="help-badge-title" style="color: #d4a359;">🏗️ Estrutural</div>
              <div class="help-badge-desc">Foco nas condições físicas: refeitórios, banheiros, sinalização, isolamento de área e armazenamento de químicos.</div>
            </div>
          </div>
          <div class="help-badge-item" style="border-color: #177542;">
            <div style="flex: 1;">
              <div class="help-badge-title" style="color: #177542;">👷 Comportamental</div>
              <div class="help-badge-desc">Como o trabalhador age na prática. Uso correto do EPI e comportamento seguro frente aos riscos.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Nota Global -->
      <div class="help-card">
        <div class="help-card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        </div>
        <h3>2. O Cálculo da Nota Global</h3>
        <p>A <strong>Nota de cada Pilar</strong> é calculada rigorosamente com base no preenchimento do checklist pelo auditor em campo, utilizando a seguinte fórmula matemática para garantir total isenção:</p>
        <div class="formula-box">
          Nota = Itens Conformes / (Itens Conformes + Itens Não Conformes) * 100
        </div>
        <p class="formula-note"><em>Nota: Itens marcados como "Não Avaliado" ou "N/A" são excluídos do divisor, garantindo que a empresa não seja prejudicada nem beneficiada por itens que não se aplicam à sua realidade. A <strong>Nota Global</strong> é a média aritmética simples dos três pilares.</em></p>
        <div class="help-badge-list" style="margin-top: 10px;">
          <div class="help-badge-item" style="border-color: #177542;">
            <div>
              <div class="help-badge-title">🟢 Regular (80% a 100%)</div>
              <div class="help-badge-desc">Alto índice de segurança. Mínimas ou nenhuma correção necessária.</div>
            </div>
          </div>
          <div class="help-badge-item" style="border-color: #5bc0de;">
            <div>
              <div class="help-badge-title">🔵 Moderado (60% a 79%)</div>
              <div class="help-badge-desc">Falhas administrativas ou de organização. Correção em até 30 dias.</div>
            </div>
          </div>
          <div class="help-badge-item" style="border-color: #f0ad4e;">
            <div>
              <div class="help-badge-title">🟡 Grave (40% a 59%)</div>
              <div class="help-badge-desc">Desvios importantes de NR. Correção recomendada em até 15 dias.</div>
            </div>
          </div>
          <div class="help-badge-item" style="border-color: #d9534f;">
            <div>
              <div class="help-badge-title">🔴 Crítico (0% a 39%)</div>
              <div class="help-badge-desc">Exige ação em até 24h ou paralisação por risco iminente.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Raio-X de Competências -->
      <div class="help-card">
        <div class="help-card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
        </div>
        <h3>3. Raio-X de Competências e "Gap"</h3>
        <p>Na aba de Análise Estratégica, o Raio-X mapeia o ponto mais forte e o mais fraco da prestadora para direcionar esforços.</p>
        <ul style="color: #555; font-size: 14px; line-height: 1.6; padding-left: 20px; margin-bottom: 20px;">
          <li><strong>Fortaleza:</strong> O pilar (Doc, Est, Comp) com a maior pontuação na última visita.</li>
          <li><strong>Fraqueza:</strong> O pilar com a menor pontuação. É onde a empresa corre mais riscos e passivos trabalhistas.</li>
          <li><strong>📉 Gap Identificado:</strong> Calculado como <code>(100% - Nota da Fraqueza)</code>. Ele representa o percentual "faltante" para a excelência e puxa automaticamente da auditoria os itens do <strong>Plano de Ação</strong> pendentes que justificam esse buraco normativo.</li>
        </ul>
        <p style="font-size: 12px; color: #888; background: #f9f9f9; padding: 10px; border-radius: 6px;">Ex: Se a Fraqueza é Documental (20%), o Gap é de 80%. As pendências listadas abaixo refletirão o que falta entregar (ex: PPRA, ASOs vencidos) para fechar essa lacuna de 80%.</p>
      </div>

      <!-- Card 4: Funcionalidades do Painel -->
      <div class="help-card">
        <div class="help-card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <h3>4. Como navegar no Painel?</h3>
        <p>Entenda o propósito de cada tela disponível no menu superior:</p>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div>
            <strong style="color: #1b2c59; display: block; margin-bottom: 4px;">Visão Geral</strong>
            <span style="font-size: 13px; color: #666;">Uma foto em tempo real do ecossistema. Traz médias gerais de todos os prestadores e alerta imediato de quantas empresas estão em estado crítico.</span>
          </div>
          <div>
            <strong style="color: #1b2c59; display: block; margin-bottom: 4px;">Análise Estratégica</strong>
            <span style="font-size: 13px; color: #666;">Foco em "Evolução". Gráficos que comparam a 1ª, 2ª, 3ª visitas e rankings de melhora, além do Raio-X de Gaps do Plano de Ação.</span>
          </div>
          <div>
            <strong style="color: #1b2c59; display: block; margin-bottom: 4px;">Análise por Empresa</strong>
            <span style="font-size: 13px; color: #666;">Laudo detalhado! Escolha uma empresa e veja o histórico técnico completo emitido pelo auditor, laudo de conclusão e evolução pilar a pilar.</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
function renderFazenda() {
  const fazenda = AUDIT_DATA.find(c => c.id === 'fazenda_verginia');
  const container = document.getElementById('fazenda-container');
  container.innerHTML = buildCompanyHtml(fazenda, true);
}
