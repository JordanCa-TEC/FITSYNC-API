import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../redux/trainersSlice";
import { fetchRoutine } from "../redux/routineSlice";
import ProfileCard from "../components/user/ProfileCard";
import TrainersList from "../components/user/TrainersList";
import EventSchedule from "../components/user/EventSchedule";
import DaySummary from "../components/user/DaySummary";
import MenuOptions from "../components/user/MenuOptions";
//import "../sass/_UserDashboard";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.list);
  const routine = useSelector((state) => state.routine.today);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchRoutine());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <ProfileCard />
      <div className="main-content">
        <TrainersList trainers={trainers} />
        <EventSchedule routine={routine} />
        <DaySummary />
        <MenuOptions />
      </div>
    </div>
  );
};

export default UserDashboard;
