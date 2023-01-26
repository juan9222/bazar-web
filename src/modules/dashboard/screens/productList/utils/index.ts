import { Status } from "../../../../common/components/card/interfaces";

export const getMappedStatus = (status: string): Status => {
  switch (status) {
    case "Published":
      return Status.public;
    case "Approved":
      return Status.approved;
    case "Pending review":
      return Status.review;
    case "Hidden":
      return Status.hidden;
    default:
      return Status.rejected;
  }
};

export const isCurrentFilter = (filteredProducts: string | undefined, product: string) => {
  return filteredProducts ? filteredProducts === product : true;
};