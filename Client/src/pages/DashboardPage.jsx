import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../services/dashboardService";

import "../styles/dashboardPage.css";

const DashboardPage = () => {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const data =
          await getDashboardStats();

        setStats(
          data.stats
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!stats) {

    return (
      <p>
        Loading dashboard...
      </p>
    );

  }

  return (

    <div className="dashboard-page">

      <h1>
        Operations Dashboard
      </h1>

      <div className="stats-grid">

        <div className="stat-card">

          <h2>
            {stats.totalRecords}
          </h2>

          <p>
            Total Records
          </p>

        </div>

        <div className="stat-card">

          <h2>
            {stats.needsReview}
          </h2>

          <p>
            Validation Failures
          </p>

        </div>

        <div className="stat-card">

          <h2>
            {stats.autoApproved}
          </h2>

          <p>
            Auto Approved
          </p>

        </div>

        <div className="stat-card">

          <h2>
            {stats.totalMachines}
          </h2>

          <p>
            Machines Processed
          </p>

        </div>

        <div className="stat-card">

          <h2>
            {stats.totalQuantity}
          </h2>

          <p>
            Total Quantity
          </p>

        </div>

      </div>

      <div className="summary-section">

        <div className="summary-card">

          <h2>
            Shift-wise Summary
          </h2>

          {
            stats.shiftSummary.map(
              (
                shift,
                index
              ) => (

                <p
                  key={index}
                >

                  Shift
                  {" "}

                  <strong>
                    {shift._id}
                  </strong>

                  :
                  {" "}

                  {shift.total}

                  {" "}
                  records

                </p>

              )
            )
          }

        </div>

        <div className="summary-card">

          <h2>
            Machine-wise Summary
          </h2>

          {
            stats.machineSummary.map(
              (
                machine,
                index
              ) => (

                <p
                  key={index}
                >

                  <strong>
                    {
                      machine._id
                    }
                  </strong>

                  :
                  {" "}

                  {
                    machine.totalRecords
                  }

                  {" "}
                  records

                </p>

              )
            )
          }

        </div>

      </div>

    </div>

  );

};

export default
  DashboardPage;