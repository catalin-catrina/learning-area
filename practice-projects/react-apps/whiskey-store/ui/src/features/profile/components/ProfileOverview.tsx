import { useAuthContext } from "../../../shared/context/auth/AuthContext";

function ProfileOverview() {
  const { user } = useAuthContext();

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default ProfileOverview;
