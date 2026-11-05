import { validateLessonCanonical } from '../Web Studio Simple/src/lib/lesson-canonical-validator';
import * as ALL_CANONICAL_LESSONS from '../Web Studio Simple/src/data/lessons';

for (let i = 1; i <= 6; i++) {
  const key = `LENGUA_7B_OA03_CLASE0${i}` as keyof typeof ALL_CANONICAL_LESSONS;
  const obj = ALL_CANONICAL_LESSONS[key];
  if (obj) {
    const res = validateLessonCanonical(obj, { grade: '7° Básico', subject: 'Lengua y Literatura', oaCode: 'OA 3', lessonNumber: i });
    console.log(`Clase 0${i}: isValid=${res.isValid}, status=${res.status}, error=${res.error}`);
    if (res.details?.length) console.log(JSON.stringify(res.details));
  } else {
    console.log(`Clase 0${i}: NOT FOUND`);
  }
}
