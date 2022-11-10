export interface ITabGroupProps {
  tabs: Array<string>;
  currentTabIndex?: number;
  handleTabSwitch: (index: number) => void;
  disabled?: boolean;
  style?: Record<string, unknown>;
}
