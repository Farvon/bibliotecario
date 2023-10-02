import UserBasicTabs from "../components/UserBasicTabs";

const PerfilUser = ({ notificar, user }) => {
  return (
    <>
      <UserBasicTabs user={user} notificar={notificar} />
    </>
  );
};

export default PerfilUser;
