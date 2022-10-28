export interface IProfilePhotoProps {
  fullname?: string;
  onPressEdit?: (event?: any) => void;
  onlyPhoto?: boolean;
  url?: string;
  selected?: boolean;
  onSelectAvatar?: (avatar: any) => void;
  avatar?: any;
}