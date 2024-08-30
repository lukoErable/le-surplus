import Footer from './components/footer';
import Navbar from './components/navbar';
import './globals.css';
import SandParticles from './Utils/SandParticles';

export const metadata = {
  title: 'Le surplus',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-blackOps flex flex-col min-h-screen bg-primary-olive">
        <div className="relative z-20">
          <Navbar />
        </div>
        <div className="relative z-10 flex-grow">
          <SandParticles />
          {children}
        </div>
        <div className="relative z-10 mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
