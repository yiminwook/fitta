import ReactDOM from 'react-dom/client';
import App from '@/pages/App';
import RootLayout from '@/components/layout/RootLayout';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '@/styles/Global.scss';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <HelmetProvider>
      <BrowserRouter>
        <RootLayout>
          <App />
        </RootLayout>
      </BrowserRouter>
    </HelmetProvider>
  </>,
);
