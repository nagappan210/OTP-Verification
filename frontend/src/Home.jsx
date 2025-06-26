import Nav from "./common files/Nav";
import Footer from "./common files/Footer";
import Body from "./body";
import Body1 from "./body1";
const Home = () => {
  return (
    <div className="bg-zinc-200">
      <Nav />
      <Body/>
      <Body1/>
      <Footer/>
    </div>
  );
};

export default Home;
