/*
  Autor: Carlos Vallejos
  Descripcion: Funcion para calcular el digito verificador del RUC - SET PY
*/

function calcularDV(numero) {
  
  let total=0, resto=0, k=2, digit=0

  for (i = numero.length - 1; i >= 0; i--) {
    k = k > 11 ? 2 : k
    total += numero.charAt(i) * k++
  }

  resto = total % 11
  digit = resto > 1 ? 11 - resto : 0

  return digit
}

module.exports = {
  calcularDV
}