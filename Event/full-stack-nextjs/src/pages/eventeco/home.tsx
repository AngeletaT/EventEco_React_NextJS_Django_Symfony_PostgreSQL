import React from "react";
import { fetchCategories } from "@/services/eventeco/actions/getCategories";

const EventecoHomePage = async () => {
    const categories = await fetchCategories();
    console.log(categories);
    return (
        <div>
            <h1>Eventeco Home Page</h1>
        </div>
    );
};

export default EventecoHomePage;
