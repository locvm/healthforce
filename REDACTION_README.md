# CV Redaction Setup Guide

## Overview

This guide explains how to implement document redaction for privacy protection in CV/resume processing. The redaction system automatically identifies and obscures sensitive personal information before generating visual representations of documents.

## What is Document Redaction?

Document redaction is the process of removing or obscuring sensitive information from documents to protect privacy. In CV processing, this typically involves:

- **Personal Names**: Full names of individuals
- **Contact Information**: Email addresses and phone numbers
- **Location Data**: Addresses and location details
- **Other PII**: Any personally identifiable information

## Why HTML-Based Redaction?

Traditional approaches use OCR (Optical Character Recognition) to detect text in rendered images, then overlay black rectangles. However, this method has limitations:

- OCR accuracy depends on image quality
- Complex setup with OCR libraries
- Performance issues with large documents
- Difficult to handle multiple text occurrences

**HTML-based redaction** offers a simpler, more reliable approach:

- Direct text manipulation before rendering
- Handles multiple occurrences automatically
- No OCR complexity
- Better performance and accuracy

## Redaction Process Flow

```
DOCX File → HTML Conversion → Text Analysis → Sensitive Data Detection → HTML Redaction → Image Rendering → Redacted Output
```

### Step 1: Document Conversion

Convert the uploaded document to HTML format to enable text manipulation.

### Step 2: Data Extraction & Parsing

Extract and parse personal information from the document text using pattern matching.

### Step 3: HTML Text Replacement

Replace identified sensitive text with styled HTML elements that render as black boxes.

### Step 4: Visual Rendering

Render the redacted HTML to an image format for display or download.

## Setup Requirements

### Prerequisites

- Node.js 18+ with TypeScript support
- Next.js application with App Router
- **mammoth** package for DOCX processing
- **puppeteer** package for browser automation

### Dependencies

- **mammoth**: DOCX to HTML conversion library
- **puppeteer**: Headless Chrome for HTML rendering and screenshot capture
- **pdf-parse** (optional): PDF text extraction for PDF support
- **Node.js fs/promises**: File system utilities for temporary file handling

### Environment Setup

1. Install required packages: `npm install mammoth puppeteer`
2. Configure temporary file storage
3. Set up headless browser environment (puppeteer handles this automatically)
4. Implement file cleanup mechanisms

## Implementation Steps

### Step 1: Project Setup & Dependencies

**Mini Steps:**

1. **Initialize Next.js project** (if not already done)

   ```bash
   npx create-next-app@latest my-redaction-app --typescript --app
   cd my-redaction-app
   ```

2. **Install core libraries**

   ```bash
   npm install mammoth puppeteer
   ```

3. **Install development dependencies**

   ```bash
   npm install -D @types/node typescript
   ```

4. **Create project structure**
   ```
   app/
     api/upload/route.ts
   components/
     FileUpload.tsx
     ParsedDataDisplay.tsx
     RedactedImageDisplay.tsx
   ```

### Step 2: File Upload API (Backend)

**Required Libraries:** `fs/promises`, `mammoth`, `puppeteer`

**Mini Steps:**

1. **Create API route structure**

   - Create `app/api/upload/route.ts`
   - Set up POST handler for file uploads

2. **Implement file validation**

   - Check file type (DOCX only initially)
   - Validate file size limits
   - Handle multipart form data

3. **Set up streaming response**

   - Use `ReadableStream` for progress updates
   - Send Server-Sent Events to client
   - Handle connection cleanup

4. **Add file processing pipeline**
   - Save uploaded file temporarily
   - Convert DOCX to HTML using mammoth
   - Extract plain text for parsing

### Step 3: Data Parsing & Extraction

**Required Libraries:** None (built-in regex)

**Mini Steps:**

1. **Create parsing functions**

   - Define `parseResume()` function
   - Extract name using name patterns
   - Extract emails using email regex
   - Extract phone numbers using phone regex

2. **Implement regex patterns**

   ```javascript
   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
   const phoneRegex =
     /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\b/g;
   const nameRegex = /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g;
   ```

3. **Handle multiple occurrences**

   - Use global flags for all matches
   - Remove duplicates from results
   - Format extracted data consistently

4. **Add data validation**
   - Filter out false positives
   - Handle international formats
   - Provide fallback for missing data

### Step 4: HTML Redaction Logic

**Required Libraries:** None (string manipulation)

**Mini Steps:**

1. **Create redaction function**

   - Define `redactDocument()` function
   - Accept HTML content and sensitive data array

2. **Implement text replacement**

   - Loop through each sensitive item
   - Create regex from sensitive text
   - Replace with styled HTML spans

3. **Add redaction styling**

   ```html
   <span style="background-color: black; color: black; padding: 0 2px;"
     >REDACTED</span
   >
   ```

4. **Handle special characters**
   - Escape regex special characters
   - Use word boundaries for accuracy
   - Preserve HTML structure

### Step 5: Image Rendering

**Required Libraries:** `puppeteer`

**Mini Steps:**

1. **Set up puppeteer browser**

   - Launch headless browser instance
   - Create new page for rendering

2. **Load redacted HTML**

   - Set page content with redacted HTML
   - Wait for page to fully load

3. **Configure screenshot settings**

   - Set viewport size for full content
   - Choose image format (PNG/JPEG)
   - Set quality and compression

4. **Capture and save image**
   - Take full page screenshot
   - Save to temporary file
   - Return image buffer to client

### Step 6: Frontend Components

**Required Libraries:** `react`, `next.js`

**Mini Steps:**

1. **Create FileUpload component**

   - Add file input with drag-drop
   - Handle file selection and validation
   - Display upload progress

2. **Implement streaming progress**

   - Connect to Server-Sent Events
   - Update progress bar in real-time
   - Handle different progress stages

3. **Create data display components**

   - ParsedDataDisplay: Show extracted information
   - RedactedImageDisplay: Show redacted image
   - Handle loading and error states

4. **Add error handling**
   - Display user-friendly error messages
   - Handle network failures
   - Provide retry options

### Step 7: Integration & Testing

**Required Libraries:** None (manual testing)

**Mini Steps:**

1. **Connect frontend to backend**

   - Wire upload component to API
   - Pass streaming responses to UI
   - Handle file download options

2. **Test with sample documents**

   - Create test DOCX files with various data
   - Verify extraction accuracy
   - Check redaction completeness

3. **Performance optimization**

   - Add file cleanup after processing
   - Implement connection timeouts
   - Optimize image sizes

4. **Error handling validation**
   - Test with invalid files
   - Check network failure scenarios
   - Validate progress updates

### Step 8: PDF Support (Optional)

**Required Libraries:** `pdf-parse`

**Mini Steps:**

1. **Install PDF library**

   ```bash
   npm install pdf-parse
   ```

2. **Create PDF processing function**

   - Add PDF file type validation
   - Extract text using pdf-parse
   - Generate HTML from PDF content

3. **Adapt redaction for PDF**

   - Apply same redaction logic to PDF text
   - Handle multi-page documents
   - Preserve PDF layout in HTML

4. **Test PDF redaction**
   - Use text-based PDFs for initial testing
   - Verify layout preservation
   - Handle scanned PDFs (future enhancement)

## Key Technical Considerations

### Text Replacement Strategy

- Use global regex flags for multiple replacements
- Escape special characters in search patterns
- Apply consistent styling across all redacted elements
- Maintain document readability where possible

### Performance Optimization

- Process documents in memory when possible
- Implement streaming for large files
- Clean up temporary resources
- Cache frequently used patterns

### Error Handling

- Validate input document formats
- Handle conversion failures gracefully
- Provide fallback for unsupported content
- Log redaction activities for debugging

### Security Measures

- Validate file types and sizes
- Sanitize HTML output
- Prevent malicious document uploads
- Implement rate limiting

## Testing the Redaction System

### Test Cases

- Documents with single email/phone
- Documents with multiple contacts
- Various document formats and layouts
- Special characters in personal data
- Large documents with many pages

### Validation Steps

1. Upload test document
2. Verify text extraction accuracy
3. Check parsing of personal data
4. Confirm redaction in HTML output
5. Validate visual redaction in images

## Common Issues & Solutions

### Incomplete Redaction

- **Cause**: Regex patterns not matching all variations
- **Solution**: Expand patterns and test with diverse data

### Performance Problems

- **Cause**: Large documents or complex HTML
- **Solution**: Implement streaming and optimize rendering

### Formatting Issues

- **Cause**: CSS styling conflicts with document styles
- **Solution**: Use more specific CSS selectors and test across formats

## Best Practices

### Data Privacy

- Only redact necessary information
- Implement audit logging
- Comply with data protection regulations
- Provide user consent mechanisms

### User Experience

- Show clear progress indicators
- Allow users to review redacted content
- Provide options for different redaction levels
- Enable download of redacted documents

### Maintainability

- Separate redaction logic from UI components
- Use configuration for redaction rules
- Implement comprehensive error handling
- Document all redaction patterns

## Advanced Features

### Custom Redaction Rules

- Allow users to define custom patterns
- Support for different redaction styles
- Integration with external data sources

### Batch Processing

- Handle multiple documents simultaneously
- Queue system for large volumes
- Progress tracking across batches

### API Integration

- RESTful endpoints for redaction services
- Webhook notifications for completion
- Integration with document management systems

## PDF Support Considerations

### PDF Processing Challenges

PDF files present unique challenges for redaction compared to DOCX:

- **No Direct HTML Conversion**: PDFs are binary formats that don't convert cleanly to HTML
- **Text Extraction Complexity**: PDF text extraction requires specialized libraries
- **Layout Preservation**: Maintaining document layout during redaction is more difficult
- **Multiple Pages**: PDFs often have multiple pages requiring individual processing

### PDF Implementation Approach

For PDF support, modify the redaction pipeline:

1. **Text Extraction**: Use `pdf-parse` library to extract text content
2. **HTML Generation**: Create HTML representation from PDF text and layout
3. **Redaction Application**: Apply text replacement in the generated HTML
4. **Image Rendering**: Use puppeteer to render redacted HTML to images

### PDF-Specific Dependencies

```bash
npm install pdf-parse
```

### PDF Processing Steps

1. **Parse PDF**: Extract text and layout information using pdf-parse
2. **Generate HTML**: Create HTML structure that mimics PDF layout
3. **Apply Redaction**: Replace sensitive text in HTML as with DOCX
4. **Render Images**: Convert each page to separate images or combine into single output

### PDF Limitations

- **Layout Accuracy**: PDF layouts may not perfectly translate to HTML
- **Complex Documents**: Scanned PDFs or image-based PDFs require OCR
- **Performance**: PDF processing is generally slower than DOCX
- **Page Handling**: Multi-page PDFs need special consideration for output

### PDF Testing Considerations

- Test with various PDF types (text-based, scanned, multi-page)
- Verify layout preservation after redaction
- Check performance with large PDF files
- Validate text extraction accuracy across different PDF sources

This redaction system provides a robust, privacy-focused solution for document processing applications, with the flexibility to adapt to various use cases and requirements.
