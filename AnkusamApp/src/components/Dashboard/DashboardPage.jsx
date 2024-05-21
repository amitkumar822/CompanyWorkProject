import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-full text-center mt-[68px] bg-yellow-500">
        <button onClick={handleLogOut}
        className=" bg-red-500 py-2 px-4 mt-6 rounded-lg text-white font-bold"
        >LogOut</button>
      <div className="w-full h-screen flex items-center ">
        <p className="text-lg">
        <h1 className="text-3xl text-white mb-4">DashboardPage</h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta nemo
          pariatur deserunt aperiam aut necessitatibus at provident fuga beatae
          tempore, assumenda omnis ipsum cumque repellat nam culpa ullam iure
          maiores! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Dicta nemo pariatur deserunt aperiam aut necessitatibus at provident
          fuga beatae tempore, assumenda omnis ipsum cumque repellat nam culpa
          ullam iure maiores!
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
