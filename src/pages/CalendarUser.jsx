import React from "react";
import ProfileCard from "../components/user/ProfileCard";
import RoutineCalendar from "../components/user/RoutineCalendar";
import NavegacionUser from "../components/user/NavegacionUser";

const CalendarUser = () => {


  return (
    <div className="dashboard-container">
      <ProfileCard />
      <NavegacionUser />
      <RoutineCalendar />
    </div>
  );
};

export default CalendarUser;