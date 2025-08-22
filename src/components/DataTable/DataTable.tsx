import  { useState, useMemo } from "react";
import clsx from "clsx";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  emptyMessage?: string;
}

export const DataTable = <T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  selectable = false,
  multiSelect = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSelect = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (multiSelect) {
      if (newSelected.has(id)) newSelected.delete(id);
      else newSelected.add(id);
    } else {
      if (newSelected.has(id)) newSelected.clear();
      else newSelected.clear(), newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortKey, sortOrder]);

  if (loading)
    return <div className="p-4 text-center text-gray-500">Loading...</div>;

  if (data.length === 0)
    return <div className="p-4 text-center text-gray-500">{emptyMessage}</div>;

  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2 border-b"></th>}
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => col.sortable && handleSort(col.key)}
            >
              {col.label}{" "}
              {sortKey === col.key && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className={clsx(
              selectedRows.has(row.id) && "bg-blue-100",
              "hover:bg-gray-50"
            )}
          >
            {selectable && (
              <td className="p-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => handleSelect(row.id)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2 border-b">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
