import Footer from "../../components/footers/Footer";
import Header from "../../components/headers/Header";
import Router from "../../routes/user/Router";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
