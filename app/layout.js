import "./globals.css";

export const metadata = {
  title: 'DVert',
  description: 'Convert your images.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
