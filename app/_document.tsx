import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* Add your custom fonts here */}
        https://fonts.googleapis.com
        https://fonts.gstatic.com
        https://fonts.googleapis.com/css2?family=Franklin+Gothic:wght@400;700&display=swap
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}