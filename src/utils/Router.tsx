import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '@pages';

/*
 *
 * @description Router component
 * @route "/": Landing page
 * @route "*": Error page
 *
 */
export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            {/* <Route path="*" element={ <ErrorPage /> } /> */}
        </Routes>
    </BrowserRouter>
);
