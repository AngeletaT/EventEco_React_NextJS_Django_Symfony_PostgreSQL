import { GetStaticPaths, GetStaticProps } from "next";
import { Metadata } from "next";
import EventecoDetailsClient from "@/components/eventeco/event/EventecoDetailsClient";
import { getEventBySlug, getEvents } from "@/services/eventeco/queries/getEvents";
import { Event } from "@/types/Event";

interface EventDetailsPageProps {
    params: {
        eventslug: string;
    };
}

export const metadata: Metadata = {
    title: "EventEco - Detalles",
    description: "Detalles del evento.",
};

export const getStaticPaths: GetStaticPaths = async () => {
    const events = await getEvents();
    const paths = events.map((event) => ({
        params: { eventslug: event.eventslug },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { eventslug } = context.params as { eventslug: string };
    const event = await getEventBySlug(eventslug);

    return {
        props: {
            event,
        },
    };
};

export async function generateMetadata({ params }: EventDetailsPageProps): Promise<Metadata> {
    const event = await getEventBySlug(params.eventslug);
    return {
        title: event.name,
        description: event.description,
        openGraph: {
            title: event.name,
            description: event.description,
            images: [
                {
                    url: event.urlposter,
                    width: 800,
                    height: 600,
                    alt: event.name,
                },
            ],
        },
    };
}

const EventecoDetaisPage = ({ event }: { event: Event }) => {
    return <EventecoDetailsClient event={event} />;
};

export default EventecoDetaisPage;
