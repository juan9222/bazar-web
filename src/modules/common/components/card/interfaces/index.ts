import React, { ReactElement } from "react";

export enum Status {
  public = "Public",
  review = "Review",
  hidden = "Hidden",
  rejected = "Rejected"
}

export interface ICardProps {
  status: Status;
  productImage?: string;
  avatar?: string;
  icon: ReactElement;
  product: string;
  hasCertificates?: boolean;
  productType: string;
  variety: string;
  pricePerKg: number;
  availableForSale: number;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  likeable?: boolean;
  isLiked?: boolean;
  onLiked?: (event: React.MouseEvent) => void;
}