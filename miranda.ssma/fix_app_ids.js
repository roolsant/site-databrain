const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Fix filter
app = app.replace(
  "CONTRACTORS = AUDIT_DATA.filter(c => c.id !== 'fazenda_santa_verginia');",
  "CONTRACTORS = AUDIT_DATA.filter(c => c.id !== 'fazenda_verginia');"
);

// Fix renderFazenda find
app = app.replace(
  "const fazenda = AUDIT_DATA.find(c => c.id === 'fazenda_santa_verginia');",
  "const fazenda = AUDIT_DATA.find(c => c.id === 'fazenda_verginia');"
);

fs.writeFileSync('app.js', app);
console.log('Fixed app.js IDs');
