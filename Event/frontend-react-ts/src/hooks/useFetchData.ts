import { useQuery } from "react-query";
// import axios from "axios";

const fetchExampleData = async () => {
    const { example: data } = { example: [{ name: "Example 1" }, { name: "Example 2" }] };
    return data;
};

export const useFetchData = () => {
    return useQuery("exampleData", fetchExampleData);
};
