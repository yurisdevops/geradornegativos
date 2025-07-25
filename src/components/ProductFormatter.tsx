export function ProductFormatter({ data }: any) {
  const texts = data
    .filter(
      (item: any) =>
        item.disponivel < 0 && item.referencia && item.descricao && item.grupo
    )

    .map(
      (item: any, index: number) =>
        `${index + 1}. Produto: ${item.descricao}\n   Referência: ${
          item.referencia
        } | Grupo: ${item.grupo}\n   Vendido: ${
          item.disponivel
        }\n   Zerar Estoque
        `
    )

    .join("\n");

  return texts;
}
