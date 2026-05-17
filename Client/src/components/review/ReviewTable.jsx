import "../../styles/reviewTable.css";

const ReviewTable = ({ records }) => {
  const hasIssue = (record, field) => {
    return record.issues?.some((issue) => issue.field === field);
  };

  if (!records || records.length === 0) {
    return <p>No records found</p>;
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
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.serialNumber}</td>

              <td>{record.date}</td>

              <td>{record.shift}</td>

              <td
                className={
                  hasIssue(record, "employeeNumber") ? "issue-cell" : ""
                }
              >
                {record.employeeNumber}
              </td>

              <td
                className={
                  hasIssue(record, "operationCode") ? "issue-cell" : ""
                }
              >
                {record.operationCode}
              </td>

              <td
                className={
                  hasIssue(record, "machineNumber") ? "issue-cell" : ""
                }
              >
                {record.machineNumber}
              </td>

              <td>{record.workOrderNumber}</td>

              <td
                className={
                  hasIssue(record, "quantityProduced") ? "issue-cell" : ""
                }
              >
                {record.quantityProduced}
              </td>

              <td
                className={
                  hasIssue(record, "timeTakenHours") ? "issue-cell" : ""
                }
              >
                {record.timeTakenHours}
              </td>

              <td className={`confidence-${record.confidence}`}>
                {record.confidence}
              </td>

              <td className={`status-${record.status}`}>{record.status}</td>

              <td>
                {record.issues && record.issues.length > 0 ? (
                  <ul>
                    {record.issues.map((issue, i) => (
                      <li key={i}>⚠️ {issue.issue}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No Issues</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
