import React, { useState } from "react";

export default function ResultBlock({ text, color = "#d4af37", topic = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const content = `# ${topic || "Estudio"}\n\n${text}`;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic || "estudio"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Outfit:wght@300;400;600&display=swap');
            body { font-family: 'Outfit', sans-serif; padding: 50px; max-width: 900px; margin: 0 auto; background: #fff; color: #1a1a1a; line-height: 1.8; }
            h1 { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #000; border-bottom: 3px solid #d4af37; padding-bottom: 15px; margin-bottom: 30px; letter-spacing: -0.01em; }
            pre { white-space: pre-wrap; font-size: 14px; color: #333; background: #f9f9f9; padding: 25px; border-radius: 12px; border: 1px solid #eee; }
          </style>
        </head>
        <body>
          <h1>${topic || "Estudio"}</h1>
          <pre>${text}</pre>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="result-block">
      <div className="result-content">
        {text}
      </div>
      
      <div className="action-row">
        {[
          { label: "MD", action: handleDownloadMarkdown, aria: "Descargar Markdown" },
          { label: "PDF", action: handleDownloadPDF, aria: "Imprimir PDF" }
        ].map(btn => (
          <button
            key={btn.label}
            aria-label={btn.aria}
            onClick={btn.action}
            className="secondary-btn"
          >
            {btn.label}
          </button>
        ))}
        
        <button
          onClick={handleCopy}
          className={`primary-btn ${copied ? 'copied' : ''}`}
        >
          {copied ? "✓ COPIADO" : "CAPTURAR RESULTADO"}
        </button>
      </div>
    </div>
  );
}