/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gilbert-production.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.catalogue.mp-sec.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.madeinchasse.com',
      },
      {
        protocol: 'https',
        hostname: 'gkpro.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.promodis.net',
      },
      {
        protocol: 'https',
        hostname: 'www.equipements-militaire.com',
      },
      {
        protocol: 'http',
        hostname: 'www.military1st.fr',
      },
      {
        protocol: 'http',
        hostname: 'billyeight.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'www.helikon-tex.com',
      },
      {
        protocol: 'https',
        hostname: 'www.quaerius.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vsmdiffusion.fr',
      },
      {
        protocol: 'https',
        hostname: 'summit-outdoor.com',
      },
      {
        protocol: 'https',
        hostname: 'brandit-wear.com',
      },
    ],
  },
};

export default nextConfig;
