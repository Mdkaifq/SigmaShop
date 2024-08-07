
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import { Container } from "react-bootstrap";
import {
  createHashRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen.jsx";
import { OrderScreen } from "./screens/OrderScreen.jsx";
import UserListScreen from "./screens/UserListScreen.jsx";
import EditUserDetailsScreen from "./screens/EditUserDetailsScreen.jsx";
import ProductListScreen from "./screens/ProductListScreen.jsx";
import ProductEditScreen from "./screens/ProductEditScreen.jsx";
import OrderListScreen from "./screens/OrderListScreen.jsx";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={
            <main className="py-1">
              <Container>
                <HomeScreen />
              </Container>
            </main>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Container>
              <ProductScreen />
            </Container>
          }
        />
        <Route
          path="/cart/:id?"
          element={
            <Container>
              <CartScreen />
            </Container>
          }
        />
        <Route
          path="/login"
          element={
            <Container>
              <LoginScreen />
            </Container>
          }
        />
        <Route
          path="/register"
          element={
            <Container>
              <RegisterScreen />
            </Container>
          }
        />
        <Route
          path="/profile"
          element={
            <Container>
              <ProfileScreen />
            </Container>
          }
        />
        <Route
          path="/shipping"
          element={
            <Container>
              <ShippingScreen />
            </Container>
          }
        />
        <Route
          path="/payment"
          element={
            <Container>
              <PaymentScreen />
            </Container>
          }
        />
        <Route
          path="/placeorder"
          element={
            <Container>
              <PlaceOrderScreen />
            </Container>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Container>
              <OrderScreen />
            </Container>
          }
        />
        <Route
          path="/admin/userlist"
          element={
            <Container>
              <UserListScreen />
            </Container>
          }
        />
        <Route
          path="/admin/user/:id/edit"
          element={
            <Container>
              <EditUserDetailsScreen />
            </Container>
          }
        />
        <Route
          path="/admin/productlist"
          element={
            <Container>
              <ProductListScreen />
            </Container>
          }
        />
        <Route
          path="/admin/product/:id/edit"
          element={
            <Container>
              <ProductEditScreen />
            </Container>
          }
        />
        <Route
          path="/admin/orderlist"
          element={
            <Container>
              <OrderListScreen />
            </Container>
          }
        />
        
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
     <main>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>

     </main>

      <Footer/>
      
    </>
  );
};

export default App;
