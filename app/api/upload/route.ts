import fs from "fs/promises";
import mammoth from "mammoth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

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
  const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/i);
  const email = sections.email || (emailMatch ? emailMatch[0] : '');
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/);
  const phone = sections.phone || (phoneMatch ? phoneMatch[0] : '');
  const socials = text.match(/(?:https?:\/\/)?(?:www\.)?(?:linkedin|twitter|github|facebook|instagram)\.com\/[^\s]+/gi) || [];
  const address = sections.address || sections.location || '';
  const skills = sections.skills ? sections.skills.split(/[,;]/).map(s => s.trim()).filter(s => s) : [];
  const education = sections.education ? [sections.education] : [];
  const experience = sections.experience || sections.work ? [sections.experience || sections.work] : [];
  return { name, email, phone, socials, address, skills, education, experience };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), "temp");
  await fs.mkdir(tempDir, { recursive: true });

  // Save file with unique name
  const uniqueName = `${Date.now()}-${file.name}`;
  const filePath = path.join(tempDir, uniqueName);
  const buffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(buffer));

  // Parse the file
  let parsedData;
  try {
    let text = '';
    if (file.name.toLowerCase().endsWith('.docx')) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      parsedData = { error: 'Only DOCX files are supported for parsing' };
    }
    if (text) {
      parsedData = parseResume(text);
    }
  } catch (error) {
    parsedData = { error: 'Failed to parse file', details: (error as Error).message };
  }

  // Return confirmation
  return NextResponse.json({
    success: true,
    message: "File uploaded and parsed successfully",
    fileName: uniqueName,
    filePath: filePath,
    parsedData,
  });
}
