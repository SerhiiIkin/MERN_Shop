import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation/Navigation";
import Authorization from "./pages/Authorization/Authorization";
import AddProduct from "./pages/AddProduct/AddProduct";

function App() {
    return (
        <>
            <Navigation />
            <div className="container mx-auto px-2 pt-14">
                <Routes>
                    <Route path={"/shop"} element={<ProductsPage />}>
                        <Route path={"page=:id"} element={<ProductsPage />} />
                    </Route>
                    <Route path={"/shop/authorization"} element={<Authorization/>}/>
                    <Route path={"/shop/addProduct"} element={<AddProduct/>}/>
                    <Route path={"/shop/product/:id"} element={<ProductDetailPage />} />
                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
