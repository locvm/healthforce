import fs from "fs/promises";
import mammoth from "mammoth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import puppeteer from "puppeteer";

function extractSections(text: string) {
  const sections: { [key: string]: string } = {};
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  let currentSection = '';
  let currentContent: string[] = [];
  for (const line of lines) {
    if (/^(name|email|phone|address|location|skills|education|experience|work|contact|social|summary|objective)/i.test(line)) {
      if (currentSection) {
        sections[currentSection] = currentContent.join(' ');
      }
      currentSection = line.toLowerCase().split(':')[0]; // remove colon
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  if (currentSection) {
    sections[currentSection] = currentContent.join(' ');
  }
  return sections;
}

function parseResume(text: string) {
  const sections = extractSections(text);
  const lines = text.split('\n').map(l => l.trim()).filter(l => l && l.length > 2);
  let name = sections.name || sections.contact || '';
  if (!name) {
    const firstLine = lines[0];
    if (firstLine && !firstLine.includes('@') && !/\d{10,}/.test(firstLine) && firstLine.split(' ').length <= 4) {
      name = firstLine;
    }
  }
  const emailMatches = text.match(/[\w\.-]+@[\w\.-]+\.\w+/gi) || [];
  const email = emailMatches[0] || '';
  const emails = emailMatches;
  const phoneMatches = text.match(/(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/g) || [];
  const phone = phoneMatches[0] || '';
  const phones = phoneMatches;
  const socials = text.match(/(?:https?:\/\/)?(?:www\.)?(?:linkedin|twitter|github|facebook|instagram)\.com\/[^\s]+/gi) || [];
  const address = sections.address || sections.location || '';
  const skills = sections.skills ? sections.skills.split(/[,;]/).map(s => s.trim()).filter(s => s) : [];
  const education = sections.education ? [sections.education] : [];
  const experience = sections.experience || sections.work ? [sections.experience || sections.work] : [];
  return { name, email, emails, phone, phones, socials, address, skills, education, experience };
}

async function redactDocument(filePath: string, parsedData: any): Promise<string> {
  console.log("Starting redaction process");
  // Convert DOCX to HTML
  console.log("Converting DOCX to HTML");
  const result = await mammoth.convertToHtml({ path: filePath });
  let html = result.value;

  // Redact sensitive information in HTML
  console.log("Redacting sensitive text in HTML");
  const redactStyle = 'background-color:black;color:black;padding:0 2px;';
  if (parsedData.name) {
    html = html.replace(new RegExp(parsedData.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), `<span style="${redactStyle}">$&</span>`);
  }
  for (const email of parsedData.emails || []) {
    html = html.replace(new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), `<span style="${redactStyle}">$&</span>`);
  }
  for (const phone of parsedData.phones || []) {
    html = html.replace(new RegExp(phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), `<span style="${redactStyle}">$&</span>`);
  }

  // Use puppeteer to screenshot the redacted HTML
  console.log("Screenshotting redacted HTML to image");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const screenshotBuffer = await page.screenshot({ fullPage: true });
  await browser.close();

  console.log("Redaction complete");
  return Buffer.from(screenshotBuffer).toString("base64");
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Starting upload", percent: 10 }) + '\n\n'));

        // Create temp directory if it doesn't exist
        const tempDir = path.join(process.cwd(), "temp");
        await fs.mkdir(tempDir, { recursive: true });

        // Save file with unique name
        const uniqueName = `${Date.now()}-${file.name}`;
        const filePath = path.join(tempDir, uniqueName);
        const buffer = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));

        controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "File saved", percent: 20 }) + '\n\n'));

        // Parse the file
        let parsedData: any;
        let text = '';
        if (file.name.toLowerCase().endsWith('.docx')) {
          controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Extracting text", percent: 40 }) + '\n\n'));
          const result = await mammoth.extractRawText({ path: filePath });
          text = result.value;

          controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Parsing data", percent: 60 }) + '\n\n'));
          parsedData = parseResume(text);

          controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Redacting document", percent: 80 }) + '\n\n'));
          const redactedImageBase64 = await redactDocument(filePath, parsedData);
          parsedData = { ...parsedData, redactedImageBase64, text };

          controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Complete", percent: 100, result: { success: true, message: "File uploaded and parsed successfully", fileName: uniqueName, filePath: filePath, parsedData } }) + '\n\n'));
        } else {
          parsedData = { error: 'Only DOCX files are supported for parsing' };
          controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Error", percent: 100, result: { error: 'Only DOCX files are supported' } }) + '\n\n'));
        }
      } catch (error) {
        controller.enqueue(encoder.encode('data: ' + JSON.stringify({ step: "Error", percent: 100, result: { error: 'Failed to process file', details: (error as Error).message } }) + '\n\n'));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
