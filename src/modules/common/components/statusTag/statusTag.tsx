import { Status } from "../card/interfaces";

export const getStatusTag = (status: string) => {
  switch (status) {
    case Status.public:
      return <span className="header-status status-public">Public</span>;
    case Status.approved:
      return <span className="header-status status-approved">Approved</span>;
    case Status.review:
      return <span className="header-status status-review">Review</span>;
    case Status.hidden:
      return <span className="header-status status-hidden">Hidden</span>;
    case Status.rejected:
      return <span className="header-status status-rejected">Rejected</span>;
  }
};