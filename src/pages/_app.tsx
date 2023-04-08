import { RecoilRoot } from "recoil";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { theme } from "../chakra/styles/theme";
import Layout from "../components/Layout";
import "../firebase/clientApp";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
