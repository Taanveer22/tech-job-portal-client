import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/application/me?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, [user?.email]);
  return (
    <div>
      <h1>{apps.length}</h1>
    </div>
  );
};

export default MyApplications;
