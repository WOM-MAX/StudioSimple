import React from 'react';
import { StudentInteractiveNumberLine } from './StudentInteractiveNumberLine';
import { StudentInteractiveThermo } from './StudentInteractiveThermo';
import { StudentHeroJourneyChart } from './StudentHeroJourneyChart';
import { StudentDimensionsChart } from './StudentDimensionsChart';
import { StudentTimelineChart } from './StudentTimelineChart';
import { StudentStoryArcChart } from './StudentStoryArcChart';

interface StudentDisciplineGraphicProps {
  interactiveType?: string;
  subject?: string;
  oaCode?: string;
  oaNumber?: number | string;
  lessonNumber?: number;
}

export const StudentDisciplineGraphic: React.FC<StudentDisciplineGraphicProps> = ({
  interactiveType,
  subject = '',
  oaCode,
  oaNumber,
  lessonNumber = 1
}) => {
  const normSubject = subject.toLowerCase().trim();

  // 1. Explicit interactive type overrides
  if (interactiveType === 'number_line') {
    return <StudentInteractiveNumberLine />;
  }

  if (interactiveType === 'hero_journey') {
    return <StudentHeroJourneyChart />;
  }

  if (interactiveType === 'dimensions') {
    return <StudentDimensionsChart />;
  }

  if (interactiveType === 'timeline') {
    return <StudentTimelineChart />;
  }

  if (interactiveType === 'story_arc') {
    return <StudentStoryArcChart />;
  }

  if (interactiveType === 'thermo') {
    return <StudentInteractiveThermo />;
  }

  // 2. Discipline-based defaults for the 5 official curricular OAs
  if (normSubject.includes('mat')) {
    // Clase 2: Recta numérica; Clase 1: Termómetro / Punto de referencia
    if (lessonNumber === 2) {
      return <StudentInteractiveNumberLine />;
    }
    return <StudentInteractiveThermo />;
  }

  if (normSubject.includes('len') || normSubject.includes('liter')) {
    return <StudentHeroJourneyChart />;
  }

  if (normSubject.includes('cien') || normSubject.includes('nat')) {
    return <StudentDimensionsChart />;
  }

  if (normSubject.includes('hist') || normSubject.includes('geog') || normSubject.includes('soc')) {
    return <StudentTimelineChart />;
  }

  if (normSubject.includes('ing') || normSubject.includes('eng')) {
    return <StudentStoryArcChart />;
  }

  // Fallback to number line
  return <StudentInteractiveNumberLine />;
};
