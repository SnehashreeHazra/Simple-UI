import type { Meta, StoryObj } from "@storybook/react";
import { Input, type InputProps } from "./index";

const meta: Meta<Partial<InputProps>> = {
  title: "Components/InputField",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["outlined", "filled", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: {
      control: "select",
      options: ["default", "disabled", "invalid", "loading"],
    },
    showClear: { control: "boolean" },
    showPasswordToggle: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: "Insert text here",
    label: "Default Input",
    helperText: "Helper text",
    variant: "outlined",
    
    state: "default",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    label: "Password",
    type: "password",
    showPasswordToggle: true,
    variant: "outlined",

    state: "default",
  },
};

export const WithClearButton: Story = {
  args: {
    placeholder: "Type and clear",
    label: "Clearable Input",
    showClear: true,
    variant: "filled",

    state: "default",
    value: "Hello",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    label: "Disabled",
    state: "disabled",
    variant: "ghost",
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid input",
    label: "Invalid",
    state: "invalid",
    errorText: "This field is required",
    variant: "outlined",
   
  },
};

export const Loading: Story = {
  args: {
    placeholder: "Loading...",
    label: "Loading",
    state: "loading",
    variant: "outlined",
    
  },
};

export const AllSizes: Story = {
  args: {
    placeholder: "Input sizes",
    label: "Small",
    variant: "outlined",
    
  },
};
