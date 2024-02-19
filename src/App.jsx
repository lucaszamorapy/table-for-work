import { useMemo, useState } from "react";
import fakeData from "./config/data.json";
import { useTable, useSortBy } from "react-table";
import InputTable from "./components/InputTable"; // Importe o componente InputTable
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [passwords, setPasswords] = useState(
    fakeData.map((item) => item.senha)
  );

  // Modificando os links para incluir target="_blank"
  const data = useMemo(() => {
    return fakeData.map((item, index) => ({
      ...item,
      senha: passwords[index],
      link_site: `<a href="${item.link_site}" target="_blank">Link</a>`,
      link_admin: `<a href="${item.link_admin}" target="_blank">Admin</a>`,
      whois: `<a href="${item.whois}" target="_blank">Whois</a>`,
      google_page_speed: `<a href="${item.google_page_speed}" target="_blank">Google Page Speed</a>`,
    }));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortType: "basic",
      },
      {
        Header: "Cliente",
        accessor: "nome_cliente",
      },
      {
        Header: "Site",
        accessor: "link_site",
      },
      {
        Header: "Admin",
        accessor: "link_admin",
      },
      {
        Header: "Tipo",
        accessor: "tipo",
      },
      {
        Header: "Hospedagem",
        accessor: "hospedagem",
      },
      {
        Header: "Usuário",
        accessor: "usuario",
      },
      {
        Header: "Senha",
        accessor: "senha",
      },
      {
        Header: "Whois",
        accessor: "whois",
      },
      {
        Header: "Page Speed",
        accessor: "google_page_speed",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const [search, setSearch] = useState("");

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    toast.success("Senha copiada!");
  };

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => {
      const searchTerm = search.toLowerCase();
      return (
        (item.nome_cliente ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.tipo ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.link_site ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.link_admin ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.usuario ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.senha ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.status ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.hospedagem ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.whois ?? "").toLowerCase().startsWith(searchTerm) ||
        (item.google_page_speed ?? "").toLowerCase().startsWith(searchTerm)
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
      <div className="min-h-[929px] ">
        <div className=" flex justify-center items-center py-8 px-10 lg:px-16">
          <div className="flex-col items-center justify-center">
            <InputTable setSearch={setSearch} />
            <div className="overflow-y-auto rounded-lg">
              <table className="shadow-lg  " {...getTableProps()}>
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
                              className={` text-left px-4 py-2 ${
                                cellIndex === 7 ? "cursor-pointer" : ""
                              } `}
                              {...cell.getCellProps()}
                              dangerouslySetInnerHTML={{
                                __html:
                                  cell.column.id === "senha"
                                    ? cell.value.replace(/./g, "*") // Display asterisks for password
                                    : cell.value,
                              }}
                              onClick={() => {
                                if (cell.column.id === "senha") {
                                  handleCopyPassword(passwords[rowIndex]);
                                }
                              }}
                            />
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
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
