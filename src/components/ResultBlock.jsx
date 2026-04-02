import React, { useState } from "react";

export default function ResultBlock({ text, color = "#f59e0b", topic = "" }) {
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
            body { font-family: Georgia, serif; padding: 40px; max-width: 800px; margin: 0 auto; background: #fff; color: #000; }
            h1 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
            pre { white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #111; }
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
    <div style={{ marginTop: "16px", animation: "fadeIn 0.4s ease-out" }}>
      <div style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${color}33`,
        borderRadius: "12px",
        padding: "20px",
        fontFamily: "Georgia, serif",
        fontSize: "13.5px",
        color: "#dcd2b0",
        lineHeight: "1.95",
        whiteSpace: "pre-wrap",
        maxHeight: "480px",
        overflowY: "auto",
        boxShadow: "inset 0 0 25px rgba(0,0,0,0.4)",
      }}>
        {text}
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
        <button
          aria-label="Descargar como Markdown"
          onClick={handleDownloadMarkdown}
          style={{
            background: "rgba(180,130,40,0.06)",
            border: "1px solid rgba(180,150,80,0.15)",
            color: "#8a7a5a",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
            minHeight: "36px",
            transition: "all 0.2s",
          }}
        >
          MD
        </button>
        <button
          aria-label="Imprimir o guardar como PDF"
          onClick={handleDownloadPDF}
          style={{
            background: "rgba(180,130,40,0.06)",
            border: "1px solid rgba(180,150,80,0.15)",
            color: "#8a7a5a",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
            minHeight: "36px",
            transition: "all 0.2s",
          }}
        >
          PDF
        </button>
        <button
          aria-label="Copiar resultado"
          onClick={handleCopy}
          style={{
            background: copied ? "rgba(52,211,153,0.15)" : "rgba(180,130,40,0.1)",
            border: `1px solid ${copied ? "#34d399" : "rgba(180,150,80,0.25)"}`,
            color: copied ? "#6ee7b7" : "#a89a78",
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.12em",
            minHeight: "36px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: copied ? "0 0 10px rgba(52,211,153,0.2)" : "none",
          }}
        >
          {copied ? "✓ COPIADO" : "COPIAR"}
        </button>
      </div>
    </div>
  );
}