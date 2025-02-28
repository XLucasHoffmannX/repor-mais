import ReactDOM from 'react-dom';

import { type IPortalProps } from './Portal.types';

export function Portal({
  children,
  containerId = 'portal-root'
}: IPortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(<>{children}</>, container);
}
