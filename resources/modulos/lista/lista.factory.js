app.factory('ListaFactory', function () {

  function convertList(lista) {
    var retorno = [];
    if (lista) {
      lista.contracts.forEach(function (item) {
        var ct = new ItemLista(item);
        ct.id = retorno.length;
        retorno.push(ct);
      });
      return retorno;
    }
  }

  function ItemLista(item) {
    this.codigo = item['Código'],
      this.dataAcordo = convertDate(item['Data acordo comercial']),
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

  function convertDate(date) {
    var d = date.substr(0, 2); var m = date.substr(3, 2); var a = date.substr(6, 4);
    return new Date(a, m, d);
  }

  return {
    convertList: convertList
  }
});