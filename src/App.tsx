import { useState } from "react";

import "./App.css";
import { ProductFormatter } from "./components/ProductFormatter";
import { FileUpload } from "./components/FileUpload";
import { TextOutput } from "./components/TextOutput";

type DadosExcel = Record<string, any>;

function App() {
  const [productNegative, setProductNegative] = useState<DadosExcel[]>([]);

  const textGenerated = ProductFormatter({ data: productNegative });

  console.log("🧪 Dados negativos recebidos:", productNegative);
  console.log("📝 Texto gerado:", textGenerated);

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2>📦 Gerador de Chamado Negativo</h2>
      <FileUpload onDataLoaded={setProductNegative} />
      {productNegative.length > 0 && <TextOutput text={textGenerated} />}
    </div>
  );
}

export default App;
