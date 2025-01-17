import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../hooks/useFetchData";
import { RootState } from "../store";
import { increment, decrement } from "../features/counter/counterSlice";

const ExamplesPage = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state: RootState) => state.counter.value);

    const { data, isLoading, error } = useFetchData();

    return (
        <div style={{ padding: "20px" }}>
            <h1>React + Redux + React Query Example</h1>

            {/* Redux Counter */}
            <section style={{ marginBottom: "20px" }}>
                <h2>Redux Counter</h2>
                <p>Counter Value: {counter}</p>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())} style={{ marginLeft: "10px" }}>
                    Decrement
                </button>
            </section>

            {/* React Query Data Fetch */}
            <section>
                <h2>React Query Example</h2>
                {isLoading && <p>Loading data...</p>}
                {error instanceof Error && <p>Error fetching data: {error.message}</p>}
                {data && (
                    <ul>
                        {data.map((item: any, index: number) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default ExamplesPage;
