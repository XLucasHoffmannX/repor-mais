import { FileClock, Layers, Settings } from 'lucide-react';

import { routes } from '@/app/router/router.constant';

export const sidebarItems = {
  principalItems: [
    {
      title: 'Ações',
      url: routes.create_product,
      icon: Layers,
      items: [
        {
          title: 'Retirada',
          url: '#remove'
        },
        {
          title: 'Entrada',
          url: '#entry'
        },
        {
          title: 'Adicionar Produto',
          url: routes.create_product
        }
      ]
    },
    {
      title: 'Histórico',
      url: routes.history,
      icon: FileClock,
      items: [
        {
          title: 'Entradas e saídas',
          url: routes.history
        },
        {
          title: 'Lixeira',
          url: routes.trash
        }
      ]
    }
  ],
  moreItems: [
    {
      title: 'Configurações',
      url: '',
      icon: Settings,
      dropdown: false
    }
  ]
};
