
import React, { useEffect, useState } from "react";
import { useTable } from 'react-table'
import csv from "csvtojson";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function Location1() {

  const [result, setResult] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Loan Data',
        columns: [
          {
            Header: 'Loan ID',
            accessor: 'Loan_ID',
          },
          {
            Header: 'Loan Status',
            accessor: 'loan_status',
          },
          {
            Header: 'Principal',
            accessor: 'Principal',
          },
          {
            Header: 'Terms',
            accessor: 'terms',
          },
          {
            Header: 'Effective date',
            accessor: 'effective_date',
          },
          {
            Header: 'Due date',
            accessor: 'due_date',
          },
          {
            Header: 'Paid off time',
            accessor: 'paid_off_time',
          },
          {
            Header: 'Past due days',
            accessor: 'past_due_days',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Education',
            accessor: 'education',
          },
          {
            Header: 'Gender',
            accessor: 'Gender',
          },
        ],
      }
    ],
    []
  )

  useEffect(() => {
    fetch("http://localhost:12059/react-interview/getLoanData", {
      headers: {
        'Content-Type': 'text/csv'
      }
    })
      .then(res => res.text())
      .then(
        (result) => {
          console.log("result =>", result)
          csv({
            noheader: false,
          })
            .fromString(result)
            .then((csvRow) => {
              console.log("csvRow =>", csvRow)
              setResult(csvRow)
            })
        },
      )
  }, [])

  return (
    <div>
      <Table columns={columns} data={result} />
    </div>
  );
}



export default Location1;
