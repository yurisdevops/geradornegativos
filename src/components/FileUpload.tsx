import React from "react";
import * as XLSX from "xlsx";
import "./styles.css";

type ProdutoFormatado = {
  referencia: string;
  descricao: string;
  preco: number;
  disponivel: number;
  ean: string;
  subgrupo: string;
  grupo: string;
};

interface FileUploadProps {
  onDataLoaded: (dados: ProdutoFormatado[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Leitura como matriz (linha por linha)
      const rawData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const header = rawData[1]; // Segunda linha é o cabeçalho real
      const rows = rawData.slice(2); // Dados a partir da terceira linha

      // Mapeamento linha a linha com base no cabeçalho
      const formatados: ProdutoFormatado[] = rows.map((row) => {
        const item: any = {};
        header.forEach((col, index) => {
          item[col] = row[index];
        });

        return {
          referencia: String(item["Referência"] ?? "").trim(),
          descricao: String(item["Descrição"] ?? "").trim(),
          preco: parseFloat(String(item["Venda"] ?? "0").replace(",", ".")),
          disponivel: Number(
            String(item["Disponível"] ?? "0").replace(",", ".")
          ),
          ean: String(item["Código EAN"] ?? "").trim(),
          subgrupo: String(item["Sub-Grupo"] ?? "").trim(),
          grupo: String(item["Grupo"] ?? "").trim(),
        };
      });

      // Filtro para estoque negativo
      const negativos = formatados.filter((item) => item.disponivel < 0);

      onDataLoaded(negativos);

      e.target.value = "";
    } catch (error) {
      console.error("❌ Erro ao processar o arquivo:", error);
    }
  };

  return (
    <div className="container">
      <label htmlFor="fileInput" className="fileLabel">
        📎 Selecione a planilha:
      </label>
      <input
        id="fileInput"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleUpload}
        className="file"
      />
    </div>
  );
}
