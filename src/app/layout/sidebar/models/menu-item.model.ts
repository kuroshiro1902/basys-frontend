export type TMenuItem = {
  label?: React.ReactNode;
  url?: string;
  id?: string;
  icon?: React.ReactNode;
  children?: TMenuItem[];
};
