const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const helpers = `
function getMonthFromDate(dStr) {
  const parts = dStr.split('/');
  return parseInt(parts[1], 10);
}
function getLatestVisitOfCurrentMonth(company) {
  return company.visitas[company.visitas.length - 1];
}
function getLatestVisitOfPreviousMonth(company) {
  if (company.visitas.length < 2) return null;
  const currentMonth = getMonthFromDate(company.visitas[company.visitas.length - 1].data);
  for (let i = company.visitas.length - 2; i >= 0; i--) {
    const m = getMonthFromDate(company.visitas[i].data);
    if (m !== currentMonth) {
      return company.visitas[i];
    }
  }
  return company.visitas[0]; // fallback
}
function renderTrend(current, previous) {
  if (!previous) return '';
  const diff = current - previous;
  if (diff > 0) return \`<span style="color: #177542; font-size: 12px; font-weight: bold;">▲ +\${diff}% vs mês ant.</span>\`;
  if (diff < 0) return \`<span style="color: #d9534f; font-size: 12px; font-weight: bold;">▼ \${diff}% vs mês ant.</span>\`;
  return \`<span style="color: #888; font-size: 12px; font-weight: bold;">— Igual ao mês ant.</span>\`;
}
`;

if (!app.includes('function getMonthFromDate(dStr)')) {
  app = app.replace('function getLatestScore(company) {', helpers + '\nfunction getLatestScore(company) {');
}

const dashboardReplacement = `  let sumDoc = 0, sumEst = 0, sumComp = 0, critCount = 0;
  let prevSumDoc = 0, prevSumEst = 0, prevSumComp = 0;
  let validPrev = 0;
  
  CONTRACTORS.forEach(c => {
    const curr = getLatestVisitOfCurrentMonth(c).scores;
    sumDoc += curr.documental;
    sumEst += curr.estrutural;
    sumComp += curr.comportamental;
    if (c.criticidade === "Crítico") critCount++;
    
    const prev = getLatestVisitOfPreviousMonth(c);
    if (prev) {
      validPrev++;
      prevSumDoc += prev.scores.documental;
      prevSumEst += prev.scores.estrutural;
      prevSumComp += prev.scores.comportamental;
    }
  });
  
  const avgDoc = Math.round(sumDoc / CONTRACTORS.length);
  const avgEst = Math.round(sumEst / CONTRACTORS.length);
  const avgComp = Math.round(sumComp / CONTRACTORS.length);
  
  document.getElementById('stat-avg-documental').innerText = avgDoc + "%";
  document.getElementById('stat-avg-estrutural').innerText = avgEst + "%";
  document.getElementById('stat-avg-comportamental').innerText = avgComp + "%";
  document.getElementById('stat-critical-count').innerText = critCount;
  
  if (validPrev > 0) {
    const pAvgDoc = Math.round(prevSumDoc / validPrev);
    const pAvgEst = Math.round(prevSumEst / validPrev);
    const pAvgComp = Math.round(prevSumComp / validPrev);
    
    const dTrend = document.getElementById('trend-avg-documental');
    if(dTrend) dTrend.innerHTML = renderTrend(avgDoc, pAvgDoc);
    
    const eTrend = document.getElementById('trend-avg-estrutural');
    if(eTrend) eTrend.innerHTML = renderTrend(avgEst, pAvgEst);
    
    const cTrend = document.getElementById('trend-avg-comportamental');
    if(cTrend) cTrend.innerHTML = renderTrend(avgComp, pAvgComp);
  }`;

const oldDashboard = `  let sumDoc = 0, sumEst = 0, sumComp = 0, critCount = 0;
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
  document.getElementById('stat-critical-count').innerText = critCount;`;

app = app.replace(oldDashboard, dashboardReplacement);

fs.writeFileSync('app.js', app);
console.log('Done!');
