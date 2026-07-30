const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetChartStr = `  const numCompanies = CONTRACTORS.length;
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
    }`;

const replaceChartStr = `  const numCompanies = CONTRACTORS.length;
  const groupWidth = 700 / numCompanies;
  
  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  CONTRACTORS.forEach((c, idx) => {
    // Group by month
    let visitsByMonth = {};
    c.visitas.forEach(v => {
      let m = getMonthFromDate(v.dataAuditoria);
      if(!visitsByMonth[m]) visitsByMonth[m] = [];
      visitsByMonth[m].push(v);
    });
    
    let monthlyData = [];
    let colors = ['#1b2c59', '#177542', '#d4a359', '#d9534f'];
    
    // Sort months
    let months = Object.keys(visitsByMonth).map(Number).sort((a,b) => a - b);
    // Take only the last 2 months for the chart
    months = months.slice(-2);
    
    months.forEach((m, i) => {
      let visits = visitsByMonth[m];
      monthlyData.push({
        label: monthNames[m - 1],
        score: visits[visits.length - 1].scores.global,
        color: colors[i % colors.length]
      });
    });

    if (monthlyData.length === 0) {
      monthlyData.push({ label: 'Última', score: c.visitas[c.visitas.length-1].scores.global, color: '#d4a359' });
    }`;

app = app.replace(targetChartStr, replaceChartStr);
fs.writeFileSync('app.js', app);
console.log('Done replacing chart logic');
