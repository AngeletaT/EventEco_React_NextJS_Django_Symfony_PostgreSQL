import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/globals.css";

import { Provider } from "react-redux";
import store_e from "../store/eventeco";
import store_p from "../store/pawnity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider store={store_e || store_p}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
