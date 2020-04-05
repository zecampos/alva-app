function Trim(strTexto) {
  // Substitúi os espaços vazios no inicio e no fim da string por vazio.
  return strTexto.replace(/^s+|s+$/g, "");
}

function clearRegex(v) {
  return v.replace(/[^\w\s]/gi, "");
}
// Função para validação de CEP.
function isCEP(strCEP, blnVazio) {
  // Caso o CEP não esteja nesse formato ele é inválido!
  var objER = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;

  strCEP = Trim(strCEP);
  if (strCEP.length > 0) {
    if (objER.test(strCEP)) return true;
    else return false;
  } else return blnVazio;
}

function checkCPF(cpf) {
  let numeros, digitos, soma, i, resultado, digitos_iguais;
  const newCPF = clearRegex(cpf);
  digitos_iguais = 1;
  if (newCPF.length < 11) return false;
  for (i = 0; i < newCPF.length - 1; i++)
    if (newCPF.charAt(i) != newCPF.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    numeros = newCPF.substring(0, 9);
    digitos = newCPF.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
    numeros = newCPF.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    return true;
  } else return false;
}
export { isCEP, checkCPF };
