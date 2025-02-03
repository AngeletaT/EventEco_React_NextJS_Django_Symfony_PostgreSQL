import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/globals.css";

import { Provider } from "react-redux";
import store_e from "../store/eventeco";
import store_p from "@/store/pawnity";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: any) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Provider store={store_e || store_p}>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                </HydrationBoundary>
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
