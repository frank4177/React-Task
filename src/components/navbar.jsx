import React, { useContext } from "react";
import Button from "./button";
import MainContainer from "./mainContainer";
import { UserIcon } from "../assets/Icons";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { dispatch, state } = useContext(AuthContext);
  const navigate = useNavigate()

  console.log(state.role);

  const handleLogout = () => {
    const role = state.role;
    console.log(role);
    dispatch({
      type: "LOGOUT",
    });
    // window.location.href = "/admin/login";
    navigate("/admin/login")
  };
  return (
    <>
      <div className="">
        <MainContainer>
          <div className="flex flex-row items-center justify-between">
            <div className="font-bold text-[39px] text-white">App</div>
            <Button
              title="Logout"
              icon={<img src={UserIcon} alt="icon" className="" />}
              handleClick={handleLogout}
            />
          </div>
        </MainContainer>
      </div>
    </>
  );
};

export default Navbar;
