// import './side-effects';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();

  if (window.location.pathname.startsWith('/admin')) {
    const root = document.getElementById('root');
    const { AdminApp } = await import('@wsh-2024/admin/src/index');
    ReactDOM.createRoot(root!).render(<AdminApp />);
  } else {
    const root = document.getElementById('root');
    const { ClientApp } = await import('@wsh-2024/app/src/index');
    ReactDOM.hydrateRoot(
      root!,
      <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  }
};

main().catch(console.error);
