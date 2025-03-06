class CardNumber {
  format(number: string): string {
    if (!number) {
      return '';
    }

    return `**** ${number.slice(-4)}`;
  }
}

export default new CardNumber();
