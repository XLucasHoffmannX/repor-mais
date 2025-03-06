import {
  CurrencyCodeType,
  CurrencyOptionsType,
  CurrencyType
} from '@/shared/types';

import CustomString from './CustomString.util';

export class Currency {
  format(
    currency: CurrencyType | string,
    value: number,
    showCurrencySymbol = false,
    decimalScale = 2,
    extraOptions: CurrencyOptionsType = null
  ): string {
    const currencyTypeToCode: Record<CurrencyType, CurrencyCodeType> = {
      BRL: 'pt-BR',
      EUR: 'en-US',
      USD: 'en-US'
    };

    if (typeof value !== 'number' || decimalScale < 0) return '';

    let params: CurrencyOptionsType = { minimumFractionDigits: decimalScale };

    // Parâmetros para adicionar o símbolo da moeda (Ex: R$ 1.000,00)
    if (showCurrencySymbol) {
      params = { ...params, currency, style: 'currency' };
    }

    // Opções extras de formatação
    if (extraOptions) {
      params = { ...params, ...extraOptions };
    }

    // Formata o valor de acordo com a moeda selecionada
    const formattedCurrency = new Intl.NumberFormat(
      currencyTypeToCode[currency as CurrencyType],
      params
    ).format(value);

    return formattedCurrency === 'NaN' ? '' : formattedCurrency;
  }

  unformat(value?: string, decimalScale = 2): number {
    if (!value) {
      return 0;
    }

    return +value.replace(/\D/g, '') / 10 ** decimalScale;
  }

  parseToFloat(value?: string, decimals: number = 2): number {
    if (!value) return 0;

    let formattedValue = value;

    if (formattedValue.includes(',') && formattedValue.includes('.')) {
      // um número não pode ter mais de uma vírgula e mais de um ponto
      if (
        CustomString.countOccurrences(value, ',') >= 2 &&
        CustomString.countOccurrences(value, '.') >= 2
      ) {
        throw new Error('Invalid number format');
      }

      // se a posição da vírgula for maior que a posição do ponto, então o número está no formato 1.000,00 (ou 1.000.000,00)
      // neste caso, só terá uma ocorrência de vírgula e os pontos devem ser removidos
      if (formattedValue.indexOf(',') > formattedValue.indexOf('.')) {
        formattedValue = value.replaceAll('.', '').replace(',', '.');

        return Number(parseFloat(formattedValue).toFixed(decimals));
      }

      // se a posição da vírgula for menor que a posição do ponto, então o número está no formato 1,000.00 (ou 1,000,000.00)
      // neste caso, só terá uma ocorrência de ponto e as vírgulas devem ser removidas
      if (formattedValue.indexOf(',') < formattedValue.indexOf('.')) {
        formattedValue = value.replaceAll(',', '');

        return Number(parseFloat(formattedValue).toFixed(decimals));
      }
    }

    // neste caso, o número tem a vírgula para separar as casas decimais
    // a função deverá substituir a vírgula por ponto e retornar o número
    if (formattedValue.includes(',')) {
      formattedValue = value.replace(',', '.');
      return Number(parseFloat(formattedValue).toFixed(decimals));
    }

    return Number(parseFloat(formattedValue).toFixed(decimals));
  }

  // a função arredonda um número decimal que possui duas casas decimais e retorna o resultado com duas casas decimais
  roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  // a função realiza a subtração de dois números decimais que possuem duas casas decimais e retorna o resultado com duas casas decimais
  subtractTwoDecimals(value1: number, value2: number): number {
    const result = (value1 * 100 - value2 * 100) / 100;
    return parseFloat(result.toFixed(2));
  }

  // a função realiza a soma de dois números decimais que possuem duas casas decimais e retorna o resultado com duas casas decimais
  sumTwoDecimals(value1: number, value2: number): number {
    const result = (value1 * 100 + value2 * 100) / 100;
    return parseFloat(result.toFixed(2));
  }
}

export default new Currency();
