import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import "./Dashboard.scss";
import { getOverview } from "../../../services/apiService";

const Dashboard = () => {
  const [dataOverview, setDataOverview] = useState([]);

  const data = [
    {
      name: "User",
      Us: dataOverview?.users?.countUsers,
    },
    {
      name: "Quiz",
      Qz: dataOverview?.others?.countQuiz,
    },
    {
      name: "Question",
      Qs: dataOverview?.others?.countQuestions,
    },
    {
      name: "Answer",
      As: dataOverview?.others?.countAnswers,
    },
  ];

  useEffect(() => {
    const fetchDataOverview = async () => {
      let data = await getOverview();
      if (data && data.EC === 0) {
        setDataOverview(data.DT);
      }
    };
    fetchDataOverview();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content row">
        <div className="content-left col-4">
          <div className="content-left-child col-5">
            Total User{" "}
            <span>
              {dataOverview.users ? dataOverview.users.countUsers : 0}
            </span>
          </div>
          <div className="content-left-child col-5">
            Total Quiz{" "}
            <span>
              {dataOverview.others ? dataOverview.others.countQuiz : 0}
            </span>
          </div>
          <div className="content-left-child col-5">
            Total Question{" "}
            <span>
              {dataOverview.others ? dataOverview.others.countQuestions : 0}
            </span>
          </div>
          <div className="content-left-child col-5">
            Total Answer{" "}
            <span>
              {dataOverview.others ? dataOverview.others.countAnswers : 0}
            </span>
          </div>
        </div>
        <div className="content-right col-8">
          <BarChart width={730} height={250} data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Bar dataKey="Us" fill="#8884d8" />
            <Bar dataKey="Qz" fill="#82ca9d" />
            <Bar dataKey="Qs" fill="#ed2626" />
            <Bar dataKey="As" fill="#e8de1f" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
