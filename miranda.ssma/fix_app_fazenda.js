const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Fix the CONTRACTORS filter
app = app.replace(
  "CONTRACTORS = AUDIT_DATA.filter(c => c.id !== 'fazenda_verginia');",
  "CONTRACTORS = AUDIT_DATA.filter(c => c.id !== 'fazenda_santa_verginia');"
);

// We need a global state for Fazenda's selected sector
if (!app.includes('let currentFazendaSectorIndex = 0;')) {
  app = app.replace(
    'let currentCompanyIndex = 0;',
    'let currentCompanyIndex = 0;\nlet currentFazendaSectorIndex = 0;'
  );
}

// Write the new renderFazenda function
const oldRenderFazenda = `function renderFazenda() {
  const fazenda = AUDIT_DATA.find(c => c.id === 'fazenda_verginia');
  const container = document.getElementById('fazenda-container');
  container.innerHTML = buildCompanyHtml(fazenda, true);
}`;

const newRenderFazenda = `function renderFazenda() {
  const fazenda = AUDIT_DATA.find(c => c.id === 'fazenda_santa_verginia');
  if (!fazenda) return;
  const container = document.getElementById('fazenda-container');
  
  if (fazenda.setores) {
    const sector = fazenda.setores[currentFazendaSectorIndex];
    let html = \`<div style="margin-bottom: 20px; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 15px;">
      <label for="fazenda-sector-select" style="font-weight: 600; color: #1b2c59;">Selecione o Setor da Fazenda:</label>
      <select id="fazenda-sector-select" onchange="currentFazendaSectorIndex = this.value; renderFazenda();" style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-family: inherit; font-size: 14px; flex: 1;">\`;
    
    fazenda.setores.forEach((s, i) => {
      let suffix = (s.visitas && s.visitas.length > 0) ? "" : " (Aguardando Relatório)";
      html += \`<option value="\${i}" \${i == currentFazendaSectorIndex ? 'selected' : ''}>\${s.name}\${suffix}</option>\`;
    });
    
    html += \`</select></div>\`;
    
    if (sector.visitas && sector.visitas.length > 0) {
      // Create a fake company object out of the sector to reuse buildCompanyHtml
      const fakeCompany = {
        ...fazenda,
        name: "Fazenda S. Verginia - " + sector.name,
        visitas: sector.visitas
      };
      html += buildCompanyHtml(fakeCompany, true);
    } else {
      html += \`
        <div class="dashboard-card" style="text-align: center; padding: 60px 20px;">
          <svg style="width: 64px; height: 64px; fill: #d4a359; margin-bottom: 20px;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <h2 style="color: #1b2c59; margin-bottom: 10px;">Aguardando Relatório Mensal</h2>
          <p style="color: #666; font-size: 16px;">Os dados consolidados para o setor <strong>\${sector.name}</strong> serão mapeados assim que a próxima avaliação setorial for finalizada e o documento for processado pelo sistema.</p>
        </div>
      \`;
    }
    container.innerHTML = html;
  } else {
    container.innerHTML = buildCompanyHtml(fazenda, true);
  }
}`;

app = app.replace(oldRenderFazenda, newRenderFazenda);
fs.writeFileSync('app.js', app);
console.log('Fixed renderFazenda');
