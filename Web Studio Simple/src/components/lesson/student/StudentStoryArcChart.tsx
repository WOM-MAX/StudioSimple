import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ArrowRight, Bookmark } from 'lucide-react';

interface StoryPartInfo {
  id: string;
  stepNumber: number;
  partName: string;
  connector: string;
  explanation: string;
  exampleSentence: string;
  notebookPrompt: string;
}

export const StudentStoryArcChart: React.FC = () => {
  const parts: StoryPartInfo[] = [
    {
      id: 'beginning',
      stepNumber: 1,
      partName: 'Beginning (Introduction)',
      connector: 'First / In the beginning',
      explanation: 'Introduces the characters, setting (where and when), and the normal daily life before the problem begins.',
      exampleSentence: 'First, Leo and his sister lived in a quiet town near the mountains.',
      notebookPrompt: 'Write 1 sentence in English introducing your favorite character using "First".'
    },
    {
      id: 'rising',
      stepNumber: 2,
      partName: 'Rising Action',
      connector: 'Then / Next / Suddenly',
      explanation: 'A challenge or conflict appears. The tension rises as the main character tries to solve it.',
      exampleSentence: 'Then, they found a mysterious map hidden inside an old wooden box.',
      notebookPrompt: 'Write 1 sentence describing an unexpected event using "Suddenly" or "Then".'
    },
    {
      id: 'climax',
      stepNumber: 3,
      partName: 'Climax (Peak Tension)',
      connector: 'At that moment / Just then',
      explanation: 'The most exciting, dangerous, or important turning point in the whole story.',
      exampleSentence: 'At that moment, the river bridge broke and they had to jump across together.',
      notebookPrompt: 'Write 1 sentence in English for the most exciting moment of a story.'
    },
    {
      id: 'falling',
      stepNumber: 4,
      partName: 'Falling Action',
      connector: 'After that / Later on',
      explanation: 'The tension calms down. Characters deal with the results of what happened in the climax.',
      exampleSentence: 'After that, the rescue team arrived and helped them reach safety.',
      notebookPrompt: 'Write 1 sentence describing how the problem begins to calm down using "After that".'
    },
    {
      id: 'resolution',
      stepNumber: 5,
      partName: 'Resolution (Ending)',
      connector: 'Finally / In the end',
      explanation: 'The conflict is resolved. Characters return with new wisdom, safety, or happiness.',
      exampleSentence: 'Finally, they returned home with an unforgettable lesson about teamwork.',
      notebookPrompt: 'Write 1 sentence concluding the story in English using "Finally".'
    }
  ];

  const [activeId, setActiveId] = useState<string>('beginning');
  const current = parts.find((p) => p.id === activeId) || parts[0];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-green-200/90 text-center relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A964E] via-[#22C55E] to-[#16A34A]" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 text-[#166534] border border-green-200 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
        <span>Graphic Organizer · English Narrative Story Arc</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-2">
        Story Arc & Time Connectors
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-6">
        Click on each section of the narrative mountain to master sequential connectors in English reading comprehension.
      </p>

      {/* STORY ARC STEPPERS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8">
        {parts.map((p) => {
          const isSelected = p.id === activeId;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#4A964E] to-[#16A34A] text-white border-transparent shadow-md scale-105'
                  : 'bg-slate-50 hover:bg-green-50/50 text-slate-700 border-slate-200'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-tight ${isSelected ? 'text-green-100' : 'text-slate-400'}`}>
                Step {p.stepNumber}
              </span>
              <span className={`text-[11px] font-bold truncate max-w-full ${isSelected ? 'text-white' : 'text-[#1C3257]'}`}>
                {p.partName.split(' ')[0]}
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white font-bold' : 'bg-green-100/60 text-[#166534]'}`}>
                {p.connector.split(' / ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* DETAIL CARD */}
      <div className="bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30 p-6 rounded-2xl border border-green-200/80 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-green-100">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#166534] block mb-1">
              Narrative Stage {current.stepNumber} of 5
            </span>
            <h3 className="text-lg font-black text-[#1C3257]">
              {current.partName}
            </h3>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-white border border-green-300 shadow-xs flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#4A964E]" />
            <span className="text-xs font-black text-[#166534]">
              Connector: {current.connector}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {current.explanation}
        </p>

        {/* EXAMPLE SENTENCE BOX */}
        <div className="bg-white/90 rounded-xl p-4 border border-green-200/90 mb-4 shadow-xs">
          <h4 className="text-[11px] font-black uppercase tracking-wider text-[#166534] mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#4A964E]" />
            <span>Story Example in English:</span>
          </h4>
          <p className="text-sm font-semibold text-[#1C3257] italic">
            "{current.exampleSentence}"
          </p>
        </div>

        {/* NOTEBOOK BRIDGE */}
        <div className="p-3.5 bg-green-50/80 rounded-xl border border-green-200/90 flex items-start gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#166534] shrink-0 mt-0.5">
            Notebook Task:
          </span>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {current.notebookPrompt}
          </p>
        </div>
      </div>
    </div>
  );
};
