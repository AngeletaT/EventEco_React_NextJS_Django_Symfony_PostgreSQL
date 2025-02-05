import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Details Event",
};

export default async function Page(props: { params: Promise<{ eventslug: string }> }) {
    const params = await props.params;
    const eventslug = params.eventslug;

    return (
        <section>
            <h1>event Details {eventslug}</h1>
        </section>
    );
}
