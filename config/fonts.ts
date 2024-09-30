import localFont from 'next/font/local';

export const fontHeading = localFont({
  src: [
    {
      path: '../public/font/c1.otf',
      weight: '700',
      style: 'bold'
    },
    {
      path: '../public/font/c2.otf',
      weight: '400',
      style: 'regular'
    },
    {
      path: '../public/font/c3.otf',
      weight: '100',
      style: 'light'
    }
  ],
  variable: '--font-heading'
});

export const fontBody = localFont({
  src: [
    {
      path: '../public/font/HelveticaNeueBold.otf',
      weight: '700',
      style: 'bold'
    },
    {
      path: '../public/font/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../public/font/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'regular'
    },
    {
      path: '../public/font/HelveticaNeueLight.otf',
      weight: '100',
      style: 'light'
    }
  ],
  variable: '--font-body'
});
