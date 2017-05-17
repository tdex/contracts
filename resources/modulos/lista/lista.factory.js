app.factory('ListaFactory', function () {

  function convertList(lista) {
    var retorno = [];
    if (lista) {
      lista.contracts.forEach(function (item) {
        retorno.push(new ItemLista(item));
      });
      return retorno;
    }
  }

  function ItemLista(item) {
    this.codigo = item['Código'],
    this.dataAcordo = item['Data acordo comercial'],
    this.natureza = item['Natureza'],
    this.comprador = item['Comprador'],
    this.vendedor = item['Vendedor'],
    this.energiaReferencia = item['Energia referência'],
    this.energiaEntregue = item['Energia entregue'],
    this.status = item['Status aprovação'],
    this.modelo = item['Modelo'],
    this.preco = item['Preço base contratado'],
    this.submercado = item['Submercado'],
    this.inicioFornecimento = item['Início fornecimento'],
    this.fimFornecimento = item['Fim fornecimento'],
    this.inicioVigencia = item['Início vigência'],
    this.fimVigencia = item['Fim vigência']
  }
  
  return {
    convertList: convertList
  }  
});