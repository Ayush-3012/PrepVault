/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useAuth();
  const { userId, userDetails } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) await auth?.profile(userId);
    };
    fetchProfile();
  }, [userId]);

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {userDetails && (
        <>
          <div>
            <h1>{userDetails?.name}</h1>
            <h1>{userDetails?.email}</h1>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
