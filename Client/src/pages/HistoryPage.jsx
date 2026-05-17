import { useEffect, useState } from "react";

import { getRecords, updateRecord } from "../services/recordService";

import "../styles/historyPage.css";

// Review and validation workflow page
const HistoryPage = () => {
  // Component state
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [shiftFilter, setShiftFilter] = useState("");

  // Check whether a field contains validation issues
  const hasIssue = (record, field) => {
    return record.issues?.some((issue) => issue.field === field);
  };

  // Load records on initial render
  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch workflow records
  const fetchRecords = async () => {
    try {
      const data = await getRecords();
      setRecords(data.records);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle inline table edits
  const handleChange = (index, field, value) => {
    const updatedRecords = [...records];

    updatedRecords[index][field] = value;

    setRecords(updatedRecords);
  };

  // Save updated record
  const handleSave = async (recordId, record) => {
    try {
      await updateRecord(recordId, record);

      alert("Record updated successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to update record");
    }
  };

  // Search and filter logic
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.machineNumber?.toLowerCase().includes(search.toLowerCase()) ||
      record.employeeNumber?.toLowerCase().includes(search.toLowerCase()) ||
      record.workOrderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      record.operationCode?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? record.status === statusFilter : true;

    const matchesShift = shiftFilter ? record.shift === shiftFilter : true;

    return matchesSearch && matchesStatus && matchesShift;
  });

  return (
    <div className="history-page">
      <h1>Review Workflow</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Machine, Employee, Work Order, Operation Code"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="filter-row">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Needs Review">Needs Review</option>
          <option value="Auto Approved">Auto Approved</option>
        </select>

        <select
          value={shiftFilter}
          onChange={(e) => setShiftFilter(e.target.value)}
        >
          <option value="">All Shifts</option>
          <option value="I">Shift I</option>
          <option value="II">Shift II</option>
          <option value="III">Shift III</option>
        </select>
      </div>

      {/* Workflow Records Table */}
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Shift</th>
              <th>Emp. No</th>
              <th>Opn Code</th>
              <th>Machine</th>
              <th>Work Order</th>
              <th>Qty</th>
              <th>Time</th>
              <th>Status</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={record._id}>
                <td>
                  <input
                    value={record.serialNumber || ""}
                    onChange={(e) =>
                      handleChange(index, "serialNumber", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={record.date || ""}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={record.shift || ""}
                    onChange={(e) =>
                      handleChange(index, "shift", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className={
                      hasIssue(record, "employeeNumber") ? "issue-input" : ""
                    }
                    value={record.employeeNumber || ""}
                    onChange={(e) =>
                      handleChange(index, "employeeNumber", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className={
                      hasIssue(record, "operationCode") ? "issue-input" : ""
                    }
                    value={record.operationCode || ""}
                    onChange={(e) =>
                      handleChange(index, "operationCode", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className={
                      hasIssue(record, "machineNumber") ? "issue-input" : ""
                    }
                    value={record.machineNumber || ""}
                    onChange={(e) =>
                      handleChange(index, "machineNumber", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={record.workOrderNumber || ""}
                    onChange={(e) =>
                      handleChange(index, "workOrderNumber", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className={
                      hasIssue(record, "quantityProduced") ? "issue-input" : ""
                    }
                    value={record.quantityProduced || ""}
                    onChange={(e) =>
                      handleChange(index, "quantityProduced", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className={
                      hasIssue(record, "timeTakenHours") ? "issue-input" : ""
                    }
                    value={record.timeTakenHours || ""}
                    onChange={(e) =>
                      handleChange(index, "timeTakenHours", e.target.value)
                    }
                  />
                </td>

                <td>{record.status}</td>

                <td>
                  <a
                    href={`${import.meta.env.VITE_API_URL}/uploads/${record.uploadedFile}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open File
                  </a>
                </td>

                <td>
                  <button
                    className="save-btn"
                    onClick={() => handleSave(record._id, record)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
