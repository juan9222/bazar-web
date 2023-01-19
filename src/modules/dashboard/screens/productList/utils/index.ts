import { Status } from "../../../../common/components/card/interfaces";

export const getMappedStatus = (status: string): Status => {
  switch (status) {
    case "Approved":
      return Status.public;
    case "Pending review":
      return Status.review;
    case "Hidden":
      return Status.hidden;
    default:
      return Status.rejected;
  }
};