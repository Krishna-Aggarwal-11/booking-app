import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams, redirect } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "../components/AccountNav";

const Account = () => {
  const [home, sethome] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function Logout() {
    await axios.post("http://localhost:4000/logout");
    sethome("/");
    setUser(null);
  }

  if (!ready) {
    return "loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (home) {
    return <Navigate to={home} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={Logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default Account;
