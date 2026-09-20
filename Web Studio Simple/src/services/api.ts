import neonDataRaw from '../data/neonCurriculum.json';
import { NeonCurriculumItem, GradeLevel, SubjectName } from '../types';

const neonCurriculum: NeonCurriculumItem[] = neonDataRaw as NeonCurriculumItem[];

export const getCurriculumItems = (curso: GradeLevel, asignatura: SubjectName): NeonCurriculumItem[] => {
  return neonCurriculum.filter(item => {
    // Normalizar match de curso
    const matchCurso = item.curso.includes(curso.replace('° Básico', '')) || item.curso === curso;
    
    // Normalizar match de asignatura
    let matchAsig = false;
    if (asignatura === 'Historia' && item.asignatura.includes('Historia')) matchAsig = true;
    else if (asignatura === 'Matemáticas' && item.asignatura.includes('Matemát')) matchAsig = true;
    else if (asignatura === 'Lenguaje' && item.asignatura.includes('Lengua')) matchAsig = true;
    else if (asignatura === 'Ciencias Naturales' && item.asignatura.includes('Ciencias')) matchAsig = true;
    else if (asignatura === 'Inglés' && item.asignatura.includes('Inglés')) matchAsig = true;

    return matchCurso && matchAsig;
  });
};

export const getAvailableOasByGrade = (curso: GradeLevel) => {
  const gradeItems = neonCurriculum.filter(item => item.curso.includes(curso.replace('° Básico', '')));
  const grouped: Record<string, NeonCurriculumItem[]> = {};
  
  gradeItems.forEach(item => {
    if (!grouped[item.asignatura]) grouped[item.asignatura] = [];
    grouped[item.asignatura].push(item);
  });
  
  return grouped;
};
