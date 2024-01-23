import React from "react";
import Navbar from "../components/navbar";
import LeaderboardSection from "../components/LeaderboardSection";

const AdminDashboardPage = () => {

  return (
    <>
      <div className="bg-black">
      <Navbar />
      <LeaderboardSection />
      </div>
    </>
  );
};

export default AdminDashboardPage;
