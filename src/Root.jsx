import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./Provider/AuthProvider";

const Root = () => {

  return (<AuthProvider>
    <Header />
    <main className="dark:bg-dark pt-[82px]">
      <Outlet />
    </main>
    <Footer />
  </AuthProvider>)
}

export default Root;
