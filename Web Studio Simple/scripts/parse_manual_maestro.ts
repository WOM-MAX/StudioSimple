import * as fs from 'fs';
import * as path from 'path';

function xmlToText(xmlContent: string): string {
  // Replace paragraph ends with newlines
  let text = xmlContent.replace(/<\/w:p>/g, '\n');
  // Replace table row ends with newlines
  text = text.replace(/<\/w:tr>/g, '\n');
  // Replace table cell ends with tab
  text = text.replace(/<\/w:tc>/g, '\t');
  // Strip all other xml tags
  text = text.replace(/<[^>]+>/g, '');
  // Decode common xml entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
  // Clean multiple empty lines
  text = text.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
  return text;
}

const scratchDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\837fd320-9c91-4ae5-8917-6a854f354623\\scratch';

const instXml = fs.readFileSync(path.join(scratchDir, 'instrucciones', 'word', 'document.xml'), 'utf8');
const instText = xmlToText(instXml);
fs.writeFileSync(path.join(scratchDir, 'instrucciones_texto.txt'), instText, 'utf8');
console.log('Instrucciones parsed, length:', instText.length, 'lines:', instText.split('\n').length);

const manualXml = fs.readFileSync(path.join(scratchDir, 'manual_maestro', 'word', 'document.xml'), 'utf8');
const manualText = xmlToText(manualXml);
fs.writeFileSync(path.join(scratchDir, 'manual_maestro_texto.txt'), manualText, 'utf8');
console.log('Manual Maestro parsed, length:', manualText.length, 'lines:', manualText.split('\n').length);
