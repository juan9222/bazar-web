import { Status } from "../card/interfaces";

export const getStatusTag = (status: string, isCard?: boolean) => {
  switch (status) {
    case Status.public:
      return <span className={ `${ isCard ? 'header-status' : 'status-product' } status-public` }>Public</span>;
    case Status.approved:
      return <span className={ `${ isCard ? 'header-status' : 'status-product' }  status-approved` }>Approved</span>;
    case Status.review:
      return <span className={ `${ isCard ? 'header-status' : 'status-product' }  status-review` }>Review</span>;
    case Status.hidden:
      return <span className={ `${ isCard ? 'header-status' : 'status-product' }  status-hidden` }>Hidden</span>;
    case Status.rejected:
      return <span className={ `${ isCard ? 'header-status' : 'status-product' }  status-rejected` }>Rejected</span>;
  }
};