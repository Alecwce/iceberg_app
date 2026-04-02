import React, { useState } from "react";

const W = {
  face:    "#d4d0c8",
  shadow:  "#808080",
  dkShadow:"#404040",
  hilight: "#ffffff",
  btnText: "#000000",
  selBlue: "#0a246a",
  selText: "#ffffff",
};

const winBtn = {
  background: W.face,
  border: "2px solid",
  borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
  fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
  fontSize: "11px",
  color: W.btnText,
  padding: "3px 12px",
  cursor: "pointer",
  minHeight: "23px",
  userSelect: "none",
};

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
            body { font-family: Tahoma, Arial, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; background: #fff; color: #000; line-height: 1.6; }
            h1 { font-size: 20px; color: #000080; border-bottom: 2px solid #000080; padding-bottom: 8px; }
            pre { white-space: pre-wrap; font-size: 12px; color: #000; background: #f0f0f0; padding: 16px; border: 1px solid #ccc; }
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
    <div style={{ marginTop: "10px" }}>
      {/* Result title bar */}
      <div style={{
        background: W.selBlue,
        color: W.selText,
        padding: "2px 8px",
        fontSize: "11px",
        fontWeight: "bold",
        fontFamily: "Tahoma, Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span>📄</span> Resultado
      </div>

      {/* Result text area */}
      <div style={{
        background: "#fff",
        border: "2px solid",
        borderColor: `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`,
        padding: "8px",
        fontFamily: "Tahoma, 'Courier New', monospace",
        fontSize: "11px",
        color: "#000",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap",
        maxHeight: "400px",
        overflowY: "auto",
      }}>
        {text}
      </div>

      {/* Action buttons */}
      <div style={{
        background: W.face,
        border: "2px solid",
        borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
        borderTop: "none",
        padding: "6px 8px",
        display: "flex",
        gap: "4px",
        justifyContent: "flex-end",
      }}>
        <button onClick={handleDownloadMarkdown} style={winBtn} aria-label="Descargar Markdown">
          Guardar .MD
        </button>
        <button onClick={handleDownloadPDF} style={winBtn} aria-label="Imprimir PDF">
          Imprimir...
        </button>
        <button
          onClick={handleCopy}
          style={{
            ...winBtn,
            background: copied ? "#e0ffe0" : W.face,
            fontWeight: "bold",
            minWidth: "120px",
          }}
        >
          {copied ? "✓ Copiado!" : "Copiar Resultado"}
        </button>
      </div>
    </div>
  );
}
