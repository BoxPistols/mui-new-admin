import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormCheckboxGroup, { type CheckboxOption } from "./FormCheckboxGroup";

const meta = {
  title: "Forms/CheckboxGroup",
  component: FormCheckboxGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "複数選択用のチェックボックスグループコンポーネント。",
      },
    },
  },
  argTypes: {
    row: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    labelRequired: { control: "boolean" },
  },
} satisfies Meta<typeof FormCheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultOptions: CheckboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export const Default: Story = {
  args: {
    label: "Interests",
    value: [],
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(args.value || []);
    return <FormCheckboxGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Row: Story = {
  args: {
    label: "Row Layout",
    value: ["react"],
    options: defaultOptions,
    row: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(args.value || []);
    return <FormCheckboxGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    value: [],
    options: defaultOptions,
    required: true,
    labelRequired: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(args.value);
    return <FormCheckboxGroup {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: "With Error",
    value: [],
    options: defaultOptions,
    error: true,
    helperText: "At least one option must be selected.",
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(args.value);
    return <FormCheckboxGroup {...args} value={value} onChange={setValue} />;
  },
};
