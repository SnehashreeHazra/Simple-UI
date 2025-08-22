import  { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { DataTable } from "./DataTable";
import type { DataTableProps } from "./DataTable";
import type { Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const meta: Meta = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;

// Sample data
const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 },
];

// Columns definition
const columns: Column<User>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "age", label: "Age", sortable: true },
];

// Template with loading toggle
const Template: StoryFn<DataTableProps<User>> = (args) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setLoading((prev) => !prev)}
      >
        Toggle Loading
      </button>
      <DataTable {...args} loading={loading} />
    </div>
  );
};

// Default story (with data)
export const Default = Template.bind({});
Default.args = {
  columns,
  data: sampleData,
  selectable: true,
  multiSelect: true,
  emptyMessage: "No users found",
};

// Empty state story
export const EmptyState = Template.bind({});
EmptyState.args = {
  columns,
  data: [],
  selectable: true,
  multiSelect: true,
  emptyMessage: "No users found",
};
