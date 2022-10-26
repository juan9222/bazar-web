import { ITabGroupProps } from "./interfaces";

const TabGroup: React.FC<ITabGroupProps> = (props) => {
  const { tabs, currentTabIndex, handleTabSwitch, disabled, style } = props;

  return (
    <div className="tabs">
      { tabs.map((tab, index) => {
        return (
          <button
            id={ tab }
            key={ index }
            value={ index }
            className={ `tab__${ currentTabIndex === index ? "active" : "inactive" }` }
            onClick={ () => handleTabSwitch(index) }
            disabled={ disabled }
            style={ style }>
            { tab }
          </button>
        );
      }
      ) }
    </div>
  );
};

export default TabGroup;