
import { FaTruckLoading, FaTruckMoving } from 'react-icons/fa';
import { CiAvocado } from 'react-icons/ci';
import { GiCoffeeBeans } from 'react-icons/gi';
import { TbPaperBag, TbPlant2 } from 'react-icons/tb';
import IconAvocado from '../../../../assets/svg/icons/iconAvocado';

export const getProductIcon = (label: string) => {
  switch (label) {
    case "Coffee":
      return <GiCoffeeBeans />;
    case "Cocoa":
      return <TbPlant2 />;
    default:
      return <CiAvocado />;
    // return <IconAvocado className={ 'icon-av' } />;
  }
};

export const getMinimumOrderIcon = (label: string) => {
  switch (label) {
    case "Bags (DHL)":
      return <TbPaperBag />;
    case "A Container":
      return <FaTruckLoading />;
    default:
      return <FaTruckMoving />;
  }
};

export const getOptionIconLabel = (dropdown: string, label: string) => {
  return <>
    { dropdown === 'product' ? getProductIcon(label) : getMinimumOrderIcon(label) } { label }
  </>;
};