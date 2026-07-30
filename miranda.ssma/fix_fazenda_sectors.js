const fs = require('fs');
let dataStr = fs.readFileSync('data.js', 'utf8');

const match = dataStr.match(/const AUDIT_DATA = (\[[\s\S]*?\]);/);
if (match) {
  let data = eval(match[1]);
  let fazenda = data.find(c => c.id === 'fazenda_verginia'); // FIXED ID
  
  if (fazenda && !fazenda.setores) {
    const sectorNames = [
      "Área de Vivência", "Plantio", "Aplicação Defensivo Agrícola", "Oficina Mecânica", 
      "Fábrica de Sal", "Borracharia", "Autoclave", "Lavador", "Corte", 
      "Pecuária / Retiros / Currais", "Posto de Combustível", "TIP"
    ];
    
    fazenda.setores = sectorNames.map(name => {
      let active = ["Oficina Mecânica", "Lavador", "Corte", "Posto de Combustível", "TIP"].includes(name);
      
      return {
        name: name,
        visitas: active ? JSON.parse(JSON.stringify(fazenda.visitas)) : [] // empty for the others
      };
    });
  }
  
  const newStr = dataStr.replace(/const AUDIT_DATA = \[[\s\S]*?\];/, 'const AUDIT_DATA = ' + JSON.stringify(data, null, 2) + ';');
  fs.writeFileSync('data.js', newStr);
  console.log('Added setores to Fazenda');
}
