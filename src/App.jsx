import { useMemo, useState } from "react";
import fakeData from "./config/data.json";
import { useTable, useSortBy } from "react-table";
import InputTable from "./components/InputTable"; // Importe o componente InputTable
import Footer from "./components/Footer";

function App() {
  const data = useMemo(() => fakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortType: "basic",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "University",
        accessor: "university",
      },
    ],
    []
  );

  const [search, setSearch] = useState("");
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => {
      return (
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.gender.toLowerCase().includes(search.toLowerCase()) ||
        item.university.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredData,
      },
      useSortBy
    );

  return (
    <>
      <div className="min-h-[929px]">
        <div className="container py-8 px-10 lg:px-0">
          <InputTable setSearch={setSearch} />
          <div className="overflow-y-auto h-[800px] rounded-lg">
            <table className="shadow-lg " {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, columnIndex) => (
                      <th
                        key={columnIndex}
                        className="text-left px-4 py-2 bg-blueTable"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ↓"
                              : " ↑"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr key={rowIndex} {...row.getRowProps()}>
                      {row.cells.map((cell, cellIndex) => {
                        return (
                          <td
                            key={cellIndex}
                            className="text-left px-4 py-2"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
