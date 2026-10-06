import { cleanRut } from '../Web Studio Simple/src/lib/rut-validator';
import fs from 'fs';

const filePath = 'data/registered_families.json';
const families = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log('Familias registradas:', families.map((f: any) => ({ email: f.email, rut: f.rut, pass: f.password })));

const identifier = '8311477-0';
const cleanId = cleanRut(identifier);
const normalizedEmail = identifier.toLowerCase().trim();

const found = families.find((u: any) => {
  const matchRut = u.rut && cleanRut(u.rut) === cleanId;
  const matchEmail = u.email && u.email.toLowerCase().trim() === normalizedEmail;
  return matchRut || matchEmail;
});

console.log('Identifier probado:', identifier);
console.log('cleanId calculado:', cleanId);
console.log('Encontrado:', found ? `${found.name} (RUT: ${found.rut})` : 'NO ENCONTRADO');
