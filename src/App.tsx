import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation/Navigation";
import Authorization from "./pages/Authorization/Authorization";
import AddProduct from "./pages/AddProduct/AddProduct";
import { ToastContainer } from "react-toastify";
import BasketPage from "./pages/BasketPage/BasketPage";

function App() {
    
    return (
        <>
            <Navigation />
            <div className="container mx-auto px-2 pt-14">
                <Routes>
                    <Route path={"/"} element={<ProductsPage />}>
                        <Route path={"page=:id"} element={<ProductsPage />} />
                    </Route>
                    <Route
                        path={"/authorization"}
                        element={<Authorization />}
                    />
                    <Route path={"/addProduct"} element={<AddProduct />} />
                    <Route path={"/basket"} element={<BasketPage />} />
                    <Route
                        path={"/product/:id"}
                        element={<ProductDetailPage />}
                    />
                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;
