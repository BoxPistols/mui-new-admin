import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "./Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "warning", "info", "success"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    loading: {
      control: "boolean",
    },
    loadingText: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "contained",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "outlined",
    children: "Secondary Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Loading: Story = {
  args: {
    variant: "contained",
    loading: true,
    children: "Save Changes",
  },
};

export const LoadingWithCustomText: Story = {
  args: {
    variant: "contained",
    loading: true,
    loadingText: "Saving...",
    children: "Save Changes",
  },
};

export const Disabled: Story = {
  args: {
    variant: "contained",
    disabled: true,
    children: "Disabled Button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "contained",
    startIcon: React.createElement(SaveIcon),
    children: "Save",
  },
};

export const Sizes: Story = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "16px", alignItems: "center" } },
      React.createElement(
        Button,
        { variant: "contained", size: "small" },
        "Small"
      ),
      React.createElement(
        Button,
        { variant: "contained", size: "medium" },
        "Medium"
      ),
      React.createElement(
        Button,
        { variant: "contained", size: "large" },
        "Large"
      )
    ),
};

export const Variants: Story = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "16px", alignItems: "center" } },
      React.createElement(Button, { variant: "contained" }, "Contained"),
      React.createElement(Button, { variant: "outlined" }, "Outlined"),
      React.createElement(Button, { variant: "text" }, "Text")
    ),
};

export const Colors: Story = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        },
      },
      React.createElement(
        Button,
        { variant: "contained", color: "primary" },
        "Primary"
      ),
      React.createElement(
        Button,
        { variant: "contained", color: "secondary" },
        "Secondary"
      ),
      React.createElement(
        Button,
        { variant: "contained", color: "error" },
        "Error"
      ),
      React.createElement(
        Button,
        { variant: "contained", color: "warning" },
        "Warning"
      ),
      React.createElement(
        Button,
        { variant: "contained", color: "info" },
        "Info"
      ),
      React.createElement(
        Button,
        { variant: "contained", color: "success" },
        "Success"
      )
    ),
};

export const IconButtons: Story = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "16px", alignItems: "center" } },
      React.createElement(
        Button,
        { variant: "contained", startIcon: React.createElement(AddIcon) },
        "Add Item"
      ),
      React.createElement(
        Button,
        { variant: "outlined", startIcon: React.createElement(SaveIcon) },
        "Save"
      ),
      React.createElement(
        Button,
        {
          variant: "text",
          startIcon: React.createElement(DeleteIcon),
          color: "error",
        },
        "Delete"
      )
    ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Button variant="contained" fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
};
