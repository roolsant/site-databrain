const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const replacement = `function getLatestVisitOfPreviousMonth(company) {
  if (company.visitas.length < 2) return null;
  const currentMonth = getMonthFromDate(company.visitas[company.visitas.length - 1].dataAuditoria);
  for (let i = company.visitas.length - 2; i >= 0; i--) {
    const m = getMonthFromDate(company.visitas[i].dataAuditoria);
    if (m !== currentMonth) {
      return company.visitas[i];
    }
  }
  return company.visitas[0]; // fallback
}`;

app = app.replace(/function getLatestVisitOfPreviousMonth[\s\S]*?fallback\n\}/, replacement);
fs.writeFileSync('app.js', app);
console.log('Fixed syntax error');
