// Apply inline markdown (bold, italic) to a plain text string
const applyInline = (text: string): string =>
    text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');

// Convert markdown content to a professional Word-compatible HTML document
const markdownToWordHtml = (markdown: string): string => {
    const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Extract H1 title if present as the first line, otherwise use generic title
    const firstLine = markdown.trim().split('\n')[0];
    let title = 'Product Development Plan';
    let body = markdown.trim();
    if (firstLine.startsWith('# ')) {
        title = firstLine.slice(2).trim();
        body = markdown.trim().slice(firstLine.length).trim();
    }

    const lines = body.split('\n');
    const result: string[] = [];
    let inList = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('## ')) {
            if (inList) { result.push('</ul>'); inList = false; }
            const headingText = applyInline(trimmed.slice(3));
            result.push(
                `<h2 style="font-family:Calibri,Arial,sans-serif;color:#312E81;font-size:16pt;font-weight:700;` +
                `margin-top:24pt;margin-bottom:2pt;padding-bottom:6pt;` +
                `border-bottom:2px solid #6366F1">${headingText}</h2>`
            );

        } else if (trimmed.startsWith('### ')) {
            if (inList) { result.push('</ul>'); inList = false; }
            const subText = applyInline(trimmed.slice(4));
            result.push(
                `<h3 style="font-family:Calibri,Arial,sans-serif;color:#1E293B;font-size:12pt;font-weight:600;` +
                `margin-top:12pt;margin-bottom:3pt">${subText}</h3>`
            );

        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            // Check raw line for leading whitespace to detect sub-items
            const isIndented = line.startsWith(' ') || line.startsWith('\t');
            const itemRaw = trimmed.slice(2);
            // Strip bold/italic markers before pattern-matching so **Phase 1:** still matches
            const itemPlain = itemRaw.replace(/\*\*/g, '').replace(/\*/g, '').trim();
            const itemText = applyInline(itemRaw);

            const isNorthStar = itemPlain.toLowerCase().includes('north star');
            // Patterns that should become bold H3 subheadings, not bullets (top-level only)
            const phaseMatch = !isIndented && itemPlain.match(/^Phase\s+(\d+)/i);
            const isMustHave = !isIndented && /^must[\s-]have/i.test(itemPlain);
            const isNiceToHave = !isIndented && /^nice[\s-]to[\s-]have/i.test(itemPlain);
            const isColonHeading = !isIndented && itemPlain.endsWith(':');
            const isSubheading = !!(phaseMatch || isMustHave || isNiceToHave || isColonHeading);

            if (isNorthStar) {
                // North Star gets a shaded callout even if it's in a list
                if (inList) { result.push('</ul>'); inList = false; }
                result.push(
                    `<p style="font-family:Calibri,Arial,sans-serif;background:#EEF2FF;` +
                    `border-left:4px solid #4338CA;padding:10pt 14pt;margin:10pt 0;` +
                    `color:#312E81;font-weight:600;font-size:11pt;` +
                    `mso-shading:windowtext;mso-pattern:auto #EEF2FF">${itemText}</p>`
                );
            } else if (isSubheading) {
                // Promote to bold H3 subheading and close any open list
                if (inList) { result.push('</ul>'); inList = false; }
                result.push(
                    `<h3 style="font-family:Calibri,Arial,sans-serif;color:#1E293B;font-size:12pt;` +
                    `font-weight:700;margin-top:12pt;margin-bottom:3pt">${itemText}</h3>`
                );
            } else {
                // Regular bullet (or indented sub-item)
                if (!inList) {
                    result.push(
                        `<ul style="font-family:Calibri,Arial,sans-serif;margin-top:4pt;` +
                        `margin-bottom:4pt;padding-left:18pt">`
                    );
                    inList = true;
                }
                result.push(
                    `<li style="font-family:Calibri,Arial,sans-serif;color:#374151;` +
                    `font-size:11pt;line-height:1.6;margin-bottom:3pt">${itemText}</li>`
                );
            }

        } else if (trimmed.toLowerCase().includes('north star') && trimmed !== '') {
            // North Star appearing as a standalone paragraph
            if (inList) { result.push('</ul>'); inList = false; }
            result.push(
                `<p style="font-family:Calibri,Arial,sans-serif;background:#EEF2FF;` +
                `border-left:4px solid #4338CA;padding:10pt 14pt;margin:10pt 0;` +
                `color:#312E81;font-weight:600;font-size:11pt;` +
                `mso-shading:windowtext;mso-pattern:auto #EEF2FF">${applyInline(trimmed)}</p>`
            );

        } else if (trimmed === '') {
            if (inList) { result.push('</ul>'); inList = false; }
            result.push('<p style="margin:0;line-height:0.8">&nbsp;</p>');

        } else {
            if (inList) { result.push('</ul>'); inList = false; }
            // Plain paragraph lines ending with ":" are label/subheading lines
            const trimmedPlain = trimmed.replace(/\*\*/g, '').replace(/\*/g, '').trim();
            if (trimmedPlain.endsWith(':')) {
                result.push(
                    `<h3 style="font-family:Calibri,Arial,sans-serif;color:#1E293B;font-size:12pt;` +
                    `font-weight:700;margin-top:12pt;margin-bottom:3pt">${applyInline(trimmed)}</h3>`
                );
            } else {
                result.push(
                    `<p style="font-family:Calibri,Arial,sans-serif;color:#374151;` +
                    `font-size:11pt;line-height:1.6;margin:4pt 0">${applyInline(trimmed)}</p>`
                );
            }
        }
    }

    if (inList) result.push('</ul>');

    return `<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${title}</title>
<!--[if gte mso 9]><xml>
<w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml><![endif]-->
<style>
  body {
    font-family: Calibri, Arial, sans-serif;
    font-size: 11pt;
    color: #374151;
    margin: 0;
    padding: 0;
  }
  @page {
    margin: 1in 1in 1in 1in;
    mso-header-margin: 0.5in;
    mso-footer-margin: 0.5in;
    mso-header: h1;
    mso-footer: f1;
  }
  ul { margin-left: 0; padding-left: 18pt; }
  li { line-height: 1.6; }
  strong { font-weight: 700; }
  h1, h2, h3 { font-family: Calibri, Arial, sans-serif; }
</style>
</head>
<body>

<!-- Word header -->
<div style="mso-element:header" id="h1">
  <p style="font-family:Calibri,Arial,sans-serif;font-size:9pt;color:#6B7280;
     text-align:right;border-bottom:1px solid #E5E7EB;padding-bottom:4pt;margin:0">
    Generated by AI Product Copilot
  </p>
</div>

<!-- Word footer -->
<div style="mso-element:footer" id="f1">
  <p style="font-family:Calibri,Arial,sans-serif;font-size:9pt;color:#6B7280;
     text-align:center;border-top:1px solid #E5E7EB;padding-top:4pt;margin:0">
    Generated on ${dateStr}&nbsp;&nbsp;|&nbsp;&nbsp;AI Product Copilot
  </p>
</div>

<!-- Document title -->
<h1 style="font-family:Calibri,Arial,sans-serif;color:#312E81;font-size:22pt;font-weight:700;
   margin-top:0;margin-bottom:4pt;padding-bottom:10pt;border-bottom:3px solid #4F46E5">
  ${title}
</h1>
<p style="font-family:Calibri,Arial,sans-serif;font-size:9pt;color:#6B7280;margin-top:0;margin-bottom:20pt">
  Generated on ${dateStr} &nbsp;&bull;&nbsp; AI Product Copilot
</p>

${result.join('\n')}

</body>
</html>`;
};

export const exportToMarkdown = (content: string, filename: string = 'product_plan.doc') => {
    const htmlContent = markdownToWordHtml(content);
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    URL.revokeObjectURL(url);
};
