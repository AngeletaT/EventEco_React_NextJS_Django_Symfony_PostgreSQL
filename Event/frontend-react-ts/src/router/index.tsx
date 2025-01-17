import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExamplesPage from "../pages/ExamplesPage";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/examples" element={<ExamplesPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
