import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
    return (
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider>
                <Component {...pageProps} />
            </PrimeReactProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
