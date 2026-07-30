const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `      <div class="company-score-block">
        <div class="score-circle \${scoreClass}">
          <span class="score-label">SAÚDE GLOBAL</span>
          <span class="score-value">\${globalScore}%</span>
        </div>
      </div>`;
      
const replaceStr = `      <div class="company-score-block">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <div class="score-circle \${scoreClass}">
            <span class="score-label">SAÚDE GLOBAL</span>
            <span class="score-value">\${globalScore}%</span>
          </div>
          \${renderTrend(globalScore, getLatestVisitOfPreviousMonth(company)?.scores?.global)}
        </div>
      </div>`;

app = app.replace(targetStr, replaceStr);

fs.writeFileSync('app.js', app);
console.log('Done rendering trend in company detail');
