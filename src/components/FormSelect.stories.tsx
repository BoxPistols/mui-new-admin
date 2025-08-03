import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormSelect, { SelectOption } from "./FormSelect";

const meta = {
  title: "Forms/Select",
  component: FormSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "ドロップダウンセレクトコンポーネント。",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    multiple: { control: "boolean" },
    error: { control: "boolean" },
    labelRequired: { control: "boolean" },
  },
} satisfies Meta<typeof FormSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const countryOptions: SelectOption[] = [
  { value: "jp", label: "日本" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

export const Default: Story = {
  args: {
    label: "Country",
    options: countryOptions,
  },
};

export const Required: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    required: true,
    labelRequired: true,
  },
};

export const Multiple: Story = {
  args: {
    label: "Countries",
    options: countryOptions,
    multiple: true,
  },
  render: () => {
    const [value, setValue] = useState<string | number>("");
    return (
      <FormSelect
        label="Countries"
        options={countryOptions}
        value={value}
        onChange={setValue}
        multiple
      />
    );
  },
};
