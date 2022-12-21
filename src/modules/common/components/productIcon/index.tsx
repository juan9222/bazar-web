
import { GiCoffeeBeans } from 'react-icons/gi';
import { TbPlant2 } from 'react-icons/tb';
import IconAvocado from '../../../../assets/svg/icons/iconAvocado';

export const getProductIcon = (label: string) => {
  switch (label) {
    case "Coffee":
      return <GiCoffeeBeans />;
    case "Cocoa":
      return <TbPlant2 />;
    default:
      return <IconAvocado className={ 'icon-av' } />;
  }
};