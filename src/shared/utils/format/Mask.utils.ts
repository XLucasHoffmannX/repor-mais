import { MaskType } from '@/shared/types';

class Mask {
  apply(mask?: MaskType, value?: string | null): string {
    if (!value || value === null) {
      return '';
    }

    switch (mask) {
      case 'phone':
        if (value.length > 16) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{2})\B/, '($1) ')
            .replace(/(\d{1})?(\d{4})(\d{4})/, '$1 $2-$3');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{2})\B/, '($1) ')
          .replace(/(\d{1})?(\d{4})(\d{4})/, '$1 $2-$3');

      case 'domain':
        return value
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^a-z]/g, '');

      case 'cpf':
        if (value.length > 14) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{3})\B/, '$1.')
            .replace(/(\d{3})\B/, '$1.')
            .replace(/(\d{3})\B/, '$1-')
            .replace(/(\d{2})\B/, '$1');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{3})\B/, '$1.')
          .replace(/(\d{3})\B/, '$1.')
          .replace(/(\d{3})\B/, '$1-')
          .replace(/(\d{2})\B/, '$1');

      case 'cep':
        if (value.length > 9) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{5})\B/, '$1-')
            .replace(/(\d{3})\B/, '$1');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{5})\B/, '$1-')
          .replace(/(\d{3})\B/, '$1');

      case 'cnpj':
        if (value.length > 18) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{2})\B/, '$1.')
            .replace(/(\d{3})\B/, '$1.')
            .replace(/(\d{3})\B/, '$1/')
            .replace(/(\d{4})\B/, '$1-')
            .replace(/(\d{2})\B/, '$1');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{2})\B/, '$1.')
          .replace(/(\d{3})\B/, '$1.')
          .replace(/(\d{3})\B/, '$1/')
          .replace(/(\d{4})\B/, '$1-')
          .replace(/(\d{2})\B/, '$1');

      case 'cnae':
        if (value.length > 9) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{4})\B/, '$1-')
            .replace(/(\d{2})$/, '/$1');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{4})\B/, '$1-')
          .replace(/(\d{2})$/, '/$1');

      case 'date':
        if (value.length > 10) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{2})\B/, '$1/')
            .replace(/(\d{2})\B/, '$1/')
            .replace(/(\d{4})\B/, '$1');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{2})\B/, '$1/')
          .replace(/(\d{2})\B/, '$1/')
          .replace(/(\d{4})\B/, '$1');

      case 'currency':
        if (value.length > 14) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/(\d)(\d{2})$/, '$1,$2')
            .replace(/(?=(\d{3})+(\D))\B/g, '.');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/(\d)(\d{2})$/, '$1,$2')
          .replace(/(?=(\d{3})+(\D))\B/g, '.');

      case 'integer':
        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      case 'numeric':
        return value.toString().replace(/\D/g, '');

      case 'letters':
        return value
          .toString()
          .replace(/[^\p{L}\sáéíóúâêîôûàèìòùãẽĩõũç]/gu, '');

      case 'alphanumeric':
        return value.toString().replace(/[^a-zA-Z0-9 ]/g, '');

      case 'alphanumericWithAccents':
        return value.toString().replace(/[^a-zA-Z0-9À-ÖØ-öø-ÿ ]/g, '');

      case 'legalNature':
        if (value.length > 4) {
          return value
            .slice(0, -1)
            .replace(/\D/g, '')
            .replace(/^(\d{3})\B/, '$1-');
        }

        return value
          .toString()
          .replace(/\D/g, '')
          .replace(/^(\d{3})\B/, '$1-');

      case 'cpf-cnpj':
        if (value.replace(/\D/g, '').length > 11) {
          return this.apply('cnpj', value);
        }

        return this.apply('cpf', value);

      case 'credit-card':
        return value
          .replace(/\D/g, '')
          .substring(0, 16)
          .replace(/^(\d{4})\B/, '$1 ')
          .replace(/(\d{4})\B/, '$1 ')
          .replace(/(\d{4})\B/, '$1 ');

      case 'date-mm/yy':
        return value
          .replace(/\D/g, '')
          .substring(0, 4)
          .replace(/^(\d{2})\B/, '$1/');

      default:
        return value;
    }
  }

  remove(value: string): string {
    if (!value) return '';

    return value.toString().replace(/\D/g, '');
  }

  crop(value: string, length: number): string {
    return value.substring(0, length);
  }
}

export default new Mask();
