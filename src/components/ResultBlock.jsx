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
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;600&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 50px; max-width: 900px; margin: 0 auto; background: #fff; color: #1a1a1a; line-height: 1.8; }
            h1 { font-family: 'Playfair Display', serif; font-size: 32px; color: #000; border-bottom: 3px solid #d4af37; padding-bottom: 15px; margin-bottom: 30px; letter-spacing: -0.01em; }
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
    <div style={{ marginTop: "20px", animation: "reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(20px)",
        border: `1px solid rgba(212, 175, 55, 0.15)`,
        borderRadius: "16px",
        padding: "24px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        color: "#f0e6d2",
        lineHeight: "2.0",
        whiteSpace: "pre-wrap",
        maxHeight: "520px",
        overflowY: "auto",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)",
        fontWeight: "300",
        letterSpacing: "0.01em"
      }}>
        {text}
      </div>
      
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
        {[
          { label: "MD", action: handleDownloadMarkdown, aria: "Descargar Markdown" },
          { label: "PDF", action: handleDownloadPDF, aria: "Imprimir PDF" }
        ].map(btn => (
          <button
            key={btn.label}
            aria-label={btn.aria}
            onClick={btn.action}
            style={{
              background: "rgba(212, 175, 55, 0.04)",
              border: "1px solid rgba(212, 175, 55, 0.12)",
              color: "rgba(212, 175, 55, 0.5)",
              padding: "10px 18px",
              borderRadius: "10px",
              fontSize: "11px",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.15em",
              minHeight: "40px",
              transition: "all 0.3s"
            }}
            onMouseOver={e => (e.currentTarget.style.color = "#d4af37", e.currentTarget.style.borderColor = "#d4af3744")}
            onMouseOut={e => (e.currentTarget.style.color = "rgba(212, 175, 55, 0.5)", e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.12)")}
          >
            {btn.label}
          </button>
        ))}
        
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "rgba(16, 185, 129, 0.1)" : "rgba(212, 175, 55, 0.08)",
            border: `1px solid ${copied ? "#10b981" : "rgba(212, 175, 55, 0.2)"}`,
            color: copied ? "#10b981" : "#d4af37",
            padding: "10px 24px",
            borderRadius: "10px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.15em",
            minHeight: "40px",
            fontWeight: "700",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: copied ? "0 0 20px rgba(16, 185, 129, 0.2)" : "none"
          }}
        >
          {copied ? "✓ COPIADO" : "CAPTURAR RESULTADO"}
        </button>
      </div>
    </div>
  );
}