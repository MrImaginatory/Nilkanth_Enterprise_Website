const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./Lighthouse_mobile.json', 'utf8'));

console.log('Scores:');
for (const cat in data.categories) {
  console.log(`${data.categories[cat].title}: ${data.categories[cat].score * 100}`);
}

console.log('\nOpportunities / Failed Audits:');
for (const catName of ['performance', 'best-practices', 'seo', 'accessibility']) {
    const cat = data.categories[catName];
    if (!cat) continue;
    console.log(`\n--- ${cat.title} ---`);
    cat.auditRefs.forEach(ref => {
        const audit = data.audits[ref.id];
        if (audit && audit.score !== null && audit.score < 1) {
             console.log(`${audit.title} (${ref.id}) - Score: ${audit.score} - ${audit.displayValue || ''}`);
             if (audit.details && audit.details.items && audit.details.items.length > 0) {
                 const items = audit.details.items.slice(0, 3).map(i => i.url || i.node?.snippet || Object.values(i).join(' | '));
                 console.log(`   Items: ${JSON.stringify(items)}`);
             }
        }
    });
}
