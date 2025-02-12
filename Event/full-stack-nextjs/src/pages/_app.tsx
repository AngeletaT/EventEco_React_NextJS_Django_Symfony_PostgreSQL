import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import EventecoProvider from "@/store/eventeco";
import PawnityProvider from "@/store/pawnity";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
    const router = useRouter();

    useEffect(() => {
        const { pathname } = router;
        if (pathname.includes("eventeco")) {
            document.body.classList.add("eventeco");
            document.body.classList.remove("pawnity");
        } else if (pathname.includes("pawnity")) {
            document.body.classList.add("pawnity");
            document.body.classList.remove("eventeco");
        } else {
            document.body.classList.remove("eventeco", "pawnity");
        }
    }, [router.pathname]);

    return (
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider>
                {router.pathname.includes("eventeco") ? (
                    <Provider store={EventecoProvider}>
                        <Component {...pageProps} />
                    </Provider>
                ) : router.pathname.includes("pawnity") ? (
                    <Provider store={PawnityProvider}>
                        <Component {...pageProps} />
                    </Provider>
                ) : (
                    <Component {...pageProps} />
                )}
            </PrimeReactProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
