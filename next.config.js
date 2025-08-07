/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.itdg.com.br',
        port: '',
        pathname: '/**',
      },
      // NOVO DOMÍNIO ADICIONADO AQUI
      {
        protocol: 'https',
        hostname: 'lirp.cdn-website.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;