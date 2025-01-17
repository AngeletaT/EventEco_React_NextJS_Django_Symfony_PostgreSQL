import React from "react";
import { useFetchData } from "../hooks/useFetchData";

const ExampleComponent: React.FC = () => {
    const { data, isLoading, error } = useFetchData();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ExampleComponent;
