import Body from "../components/Body";

const Home = ({ user }) => {
  return (
    <>
      <Body user={user} admin={false} />
    </>
  );
};

export default Home;
