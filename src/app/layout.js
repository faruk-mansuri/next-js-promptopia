import './globals.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI prompts',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <ToastContainer position='top-center' autoClose={2000} />
      </body>
    </html>
  );
}
