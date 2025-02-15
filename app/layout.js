import './globals.css';
import Head from 'next/head';

export const metadata = {
  title: 'DVert',
  description: 'Convert your images.'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
	  <Head>
		  <link href='https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet' />
	  </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
