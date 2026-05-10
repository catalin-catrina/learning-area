import { useAuthContext } from "../../../shared/context/auth/AuthContext";

const Home = () => {
  const { user } = useAuthContext();
  return <div>Welcome {user?.name}</div>;
};

export default Home;
