import React, { useState, useEffect, useRef } from "react";
import { OrderData } from "../data/Data";
import "./Datatable.css";
import { NavLink } from "react-router-dom";

const PrintButton = ({ tableRef, setPrinting }) => {
  const handlePrint = () => {
    setPrinting(true);
    printData(tableRef);
  };

  return <button onClick={handlePrint}>Print</button>;
};

const printData = (tableRef) => {
  const printContents = tableRef.current.outerHTML;

  const printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write(`
    <html>
    <head>
      <title>Print</title>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        .hide-print {
          display: none;
        }
      </style>
    </head>
    <body>
      ${printContents}
    </body>
  </html>
    `);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 100);
};

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [printing, setPrinting] = useState(false);
  const itemsPerPage = 10;
  const tableRef = useRef();

  useEffect(() => {
    setData(OrderData);
  }, []);

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const deleteItem = (itemId) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const editItem = (itemId) => {
    // Implement edit logic here
    console.log("Edit item:", itemId);
  };

  const exportToCSV = () => {
    const csvContent = [
      "ID,Name,Date,Status",
      ...data.map(
        (item) => `${item.id},${item.name},${item.date},${item.status}`
      ),
    ].join("\n");

    const encodedURI = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => goToPage(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

  const tableRows = currentPageData.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.date}</td>
      <td>{item.total}</td>
      <td>{item.status}</td>

      <td>
        <NavLink to="/EditOder" state={item}>
          <button onClick={() => editItem(item.id)} style={{ marginRight: 5 }}>
            Edit
          </button>
        </NavLink>
        <button onClick={() => deleteItem(item.id)}>Delete</button>
      </td>
    </tr>
  ));

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredData = OrderData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery) || 
      item.id.toString().includes(searchQuery) || 
      item.date.toString().includes(searchQuery) || 
      item.total.toString().includes(searchQuery) || 
      item.status.toLowerCase().includes(searchQuery) 
    );
    setData(filteredData);
  }, [searchQuery]);


  // const printData = (tableRef) => {
  //   const printContents = tableRef.current.outerHTML;

  //   const opt = {
  //     margin: 0.5,
  //     filename: 'data.pdf',
  //     image: { type: 'jpeg', quality: 1 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  //   };

  //   window.html2pdf().set(opt).from(printContents).save();
  // };

  // const exportToPDF = () => {
  //   printData(tableRef);
  // };

  return (
    <div>
      <div className="Section1">
        <div className="PrintGroup">

          <PrintButton tableRef={tableRef} setPrinting={setPrinting}/>

          <button onClick={exportToCSV} className="export-button" style={{marginLeft: 5}}>
            Export to Excel
          </button>
        </div>

        <input
          className="DataSearch"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <table className="datatable" ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

      <div className="pagination-container">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {paginationButtons}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* <button onClick={exportToPDF} className="export-button">
        Export to PDF
      </button> */}
    </div>
  );
};

export default DataTable;