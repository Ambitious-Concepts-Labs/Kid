import React, { useState } from "react";

// Custom Dropdown components
const DropdownMenu = ({ children }) => (
  <div className="relative inline-block text-left">{children}</div>
);

const DropdownMenuTrigger = ({ children, asChild }) => (
  <div className="inline-block">{children}</div>
);

const DropdownMenuContent = ({ children, align }) => (
  <div
    className={`absolute ${
      align === "end" ? "right-0" : "left-0"
    } mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
  >
    {children}
  </div>
);

const DropdownMenuItem = ({ children }) => (
  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    {children}
  </div>
);

// Custom Input component
const Input = ({ placeholder, value, onChange, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded-md px-4 py-2 ${className}`}
  />
);

// Custom Button component
const Button = ({ children, onClick, variant, size, disabled }) => {
  const baseStyle = "px-4 py-2 rounded-md";
  const variantStyle =
    variant === "outline"
      ? "border border-gray-400 text-gray-600"
      : "bg-blue-500 text-white";
  const sizeStyle = size === "sm" ? "text-sm" : "text-base";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Table components
const Table = ({ children }) => (
  <table className="min-w-full border-collapse">{children}</table>
);

const TableHead = ({ children, handleClick }) => (
  <th
    onClick={handleClick}
    className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const TableBody = ({ children }) => <tbody>{children}</tbody>;

const TableRow = ({ children, dataState }) => (
  <tr className={dataState === "selected" ? "bg-gray-100" : ""}>{children}</tr>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
    {children}
  </td>
);

const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">{children}</thead>
);

// Main DataTable component
const DataTableSort = ({ columns, data, continueStep }) => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "instructor",
    direction: "ascending",
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    alert("test");
    alert(key);
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = sortedData.filter((row) =>
    columns.some((column) =>
      row[column.accessorKey]
        ?.toString()
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter course..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button onClick={continueStep}>New Course</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessorKey}
                  handleClick={() => requestSort(column.accessorKey)}
                >
                  {column.header}
                  {sortConfig.key === column.accessorKey ? (
                    <span>
                      {sortConfig.direction === "ascending" ? " ↑" : " ↓"}
                    </span>
                  ) : (
                    <span>{" ↑↓"}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.accessorKey}>
                      {column.accessorKey === "price"
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(row[column.accessorKey])
                        : column.accessorKey === "isPublished"
                        ? row[column.accessorKey]
                          ? "Published"
                          : "Draft"
                        : row[column.accessorKey]}
                    </TableCell>
                  ))}
                  <DropdownMenu>
                    <a href={`/dashboard/course/${row.courseId}`}>
                      <DropdownMenuTrigger asChild>...</DropdownMenuTrigger>
                    </a>
                    <DropdownMenuContent align="end">
                      {/* <a href={`/courses/${row.id}`}>
                        <DropdownMenuItem> */}
                      {/* <Pencil className="h-4 w-4 mr-2" /> */}
                      {/* Edit
                        </DropdownMenuItem>
                      </a> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((prev) =>
              paginatedData.length < rowsPerPage ? prev : prev + 1
            )
          }
          disabled={paginatedData.length < rowsPerPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTableSort;
