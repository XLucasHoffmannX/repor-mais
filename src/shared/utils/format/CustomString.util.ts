class CustomString extends String {
  /** Remove os acentos de uma string */
  removeAccents(str: string): string {
    return str
      .replace(/À|Á|Ã|Â/g, 'A')
      .replace(/á|à|ã|â/g, 'a')
      .replace(/É|È|Ê/g, 'E')
      .replace(/é|è|ê/g, 'e')
      .replace(/Í|Ì|Î/g, 'I')
      .replace(/í|ì|î/g, 'i')
      .replace(/Ó|Ò|Ô|Õ/g, 'O')
      .replace(/ó|ò|ô|õ/g, 'o')
      .replace(/Ú|Ù|Û|Ü/g, 'U')
      .replace(/ú|ù|û|ü/g, 'u')
      .replace(/Ç/g, 'C')
      .replace(/ç/g, 'c')
      .replace(/Ñ/g, 'N')
      .replace(/ñ/g, 'n');
  }

  /** Transforma uma palavra para ter a sua primeira letra em maiúsculo e as
   * demais em minúsculo.
   */
  capitalizeWord(value?: string): string {
    if (!value) {
      return '';
    }

    const splitStr = value.toLowerCase().split(' ');

    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
  }

  /**
   * Retira os pontos da string (se houver) e transforma em número inteiro.
   */
  removeDotsAndParseInt(value: string): number {
    return parseInt(value.replace(/\./g, ''));
  }

  /**
   * Conta quantas vezes uma string aparece em outra.
   * @param str String a ser analisada.
   * @param searchStr String a ser buscada.
   * @returns Número de ocorrências.
   */
  countOccurrences(str: string, searchStr: string): number {
    // Escapa o ponto para que seja tratado literalmente em uma expressão regular
    const escapedSearchStr = searchStr === '.' ? '\\.' : searchStr;
    const match = str.match(new RegExp(escapedSearchStr, 'g'));
    return match ? match.length : 0;
  }

  /**
   * Remove todos os caracteres especiais e números de uma string.
   * @param value String a ser formatada.
   * @returns String formatada.
   */
  onlyLetters(value: string): string {
    const withoutUnderlineValue = value.replace('_', ' ').replace('-', ' ');

    return withoutUnderlineValue.replace(/[^a-zA-Z\sÀ-ú]/g, '').trim();
  }

  /**
   * Remove todos os caracteres especiais e números de uma string e "capitaliza" ela.
   * @param value String a ser formatada.
   * @returns String formatada.
   */
  capitalizeAndOnlyLetters(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const onlyLettersWord = this.onlyLetters(value);

    return this.capitalizeWord(onlyLettersWord);
  }
}

export default new CustomString();
