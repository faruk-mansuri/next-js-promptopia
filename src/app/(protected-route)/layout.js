import { Nav, Provider } from '@/components';

export default function RootLayout({ children }) {
  return (
    <Provider>
      <div className='main'>
        <div className='gradient' />
      </div>

      <main className='app'>
        <Nav />
        {children}
      </main>
    </Provider>
  );
}
