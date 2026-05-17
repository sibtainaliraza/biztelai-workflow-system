import "../styles/reviewTable.css";

const ReviewTable = ({
  records,
}) => {

  if (
    !records ||
    records.length === 0
  ) {

    return (
      <p>
        No records found
      </p>
    );

  }

  return (

    <div className="table-wrapper">

      <table className="review-table">

        <thead>

          <tr>

            <th>S.No</th>

            <th>Date</th>

            <th>Shift</th>

            <th>Emp. No</th>

            <th>Opn Code</th>

            <th>Machine No</th>

            <th>Work Order</th>

            <th>Qty. Prod.</th>

            <th>Time (hrs)</th>

            <th>Confidence</th>

            <th>Status</th>

            <th>Issues</th>

          </tr>

        </thead>

        <tbody>

          {
            records.map(
              (
                record,
                index
              ) => (

                <tr
                  key={index}
                >

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.serialNumber
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.date
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.shift
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.employeeNumber
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.operationCode
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.machineNumber
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.workOrderNumber
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.quantityProduced
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      defaultValue={
                        record.timeTakenHours
                      }
                    />

                  </td>

                  <td
                    className={`confidence-${record.confidence}`}
                  >

                    {
                      record.confidence
                    }

                  </td>

                  <td
                    className={`status-${record.status}`}
                  >

                    {
                      record.status
                    }

                  </td>

                  <td>

                    {
                      record.issues &&
                      record.issues.length > 0 ? (

                        <ul>

                          {
                            record.issues.map(
                              (
                                issue,
                                i
                              ) => (

                                <li
                                  key={i}
                                >

                                  ⚠️
                                  {" "}

                                  {
                                    issue.issue
                                  }

                                </li>

                              )
                            )
                          }

                        </ul>

                      ) : (

                        <span>

                          No Issues

                        </span>

                      )
                    }

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  );

};

export default
  ReviewTable;