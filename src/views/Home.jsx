import Body from "../components/Body";
import Header from "../components/Header";

const Home = ({ setLoginStatus }) => {
  return (
    <>
      <Header setLoginStatus={setLoginStatus} />
      <Body />
    </>
  );
};

export default Home;
