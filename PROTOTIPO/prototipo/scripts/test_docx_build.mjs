import fs from 'fs';
import path from 'path';

// Import our TypeScript code or transpile it, or test docx generation directly
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType } from "docx";

const testDoc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: "STUDIOSIMPLE TEST DOCUMENT", bold: true, size: 28 })
          ]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: "1E293B" },
                  children: [new Paragraph({ children: [new TextRun({ text: "Paso", color: "FFFFFF", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 70, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ text: "Video Motivacional (7 slides anime)" })]
                })
              ]
            })
          ]
        })
      ]
    }
  ]
});

const buffer = await Packer.toBuffer(testDoc);
const outPath = path.resolve('public/data/test_output.docx');
fs.writeFileSync(outPath, buffer);
console.log(`Test DOCX generated successfully at ${outPath} (${buffer.length} bytes)`);
