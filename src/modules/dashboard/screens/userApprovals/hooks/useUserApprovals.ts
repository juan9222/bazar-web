import { useEffect, useState } from "react";
import useUserListProviders from "../providers";

const useProductList = () => {
  const [userList, setUserList] = useState<any>([]);

  //Providers
  const { getUsersList } = useUserListProviders();

  const statusToClassFormatter = (status: string) => {
    switch (status) {
      case 'Pending review':
        return 'userApprovals__inProcess';
      case 'Approved':
        return 'userApprovals__approved';
      case 'Rejected':
        return 'userApprovals__rejected';
      case 'Published':
        return 'userApprovals__published';
      case 'Hidden':
        return 'userApprovals__hidden';
      case 'Deleted':
        return 'userApprovals__deleted';
      default:
        break;
    }
  };

  const statusFormatter = (status: string) => {
    switch (status) {
      case 'Pending review':
        return 'In Process';
      default:
        return status;
    }
  };

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };


  const onGetUserList = async () => {
    const resp = await getUsersList(0);
    const users = resp.data.results.map((user: any) => ({
      id: user.uuid,
      companyName: user.company[0].company_name,
      userName: `${ user.first_name } ${ user.last_name }`,
      profile: capitalizeFirstLetter(user.rol),
      status: statusFormatter(user.status),
      statusClass: statusToClassFormatter(user.status)
    }));
    setUserList(users);
  };


  useEffect(() => {
    onGetUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userList
  };
};

export default useProductList;