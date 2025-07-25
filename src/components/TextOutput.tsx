import "./styles.css";

interface TextOutputProps {
  text: string;
}

export function TextOutput({ text }: TextOutputProps) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Texto copiado com sucesso");
    } catch (error) {
      alert("Erro ao copiar o texto.");
    }
  };
  return (
    <>
      <textarea value={text} readOnly rows={30} className="output" />
      <button onClick={copy} className="btn-copy">
        📄 Copiar Tudo
      </button>
    </>
  );
}
