import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useProductListProviders from "../../productList/providers";
import { IApproveUserProps } from "../interfaces";
import useUserListProviders from "../providers";

const useProductList = () => {
  const [userList, setUserList] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>();
  const [productsMap, setProductsMap] = useState<Record<string, any>>();
  const [showManageUserModal, setShowManageUserModal] = useState(false);
  const [activePage, setActivePage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [enableSave, setEnableSave] = useState<boolean>(false);

  //Providers
  const { getUsersList, approveUser } = useUserListProviders();
  const { getSellerProducts } = useProductListProviders();

  const { register, handleSubmit } = useForm<IApproveUserProps>({});

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

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const onGetUserList = async (pageIndex: number) => {
    const resp = await getUsersList(pageIndex);
    const users = resp.data.results.map((user: any) => ({
      id: user.uuid,
      companyName: user.company[0].company_name,
      userName: `${ user.first_name } ${ user.last_name }`,
      profile: capitalizeFirstLetter(user.rol),
      status: user.status,
    }));
    setUserList(users);
    setPages(resp.data.total_pages);
  };

  const onGetSellerProducts = async () => {
    const resp = await getSellerProducts(selectedUser.id);
    const productsMap: Record<string, any> = {};
    resp.data.results.forEach((product: any) => {
      productsMap[product.uuid] = {
        name: product.basic_product,
        status: product.status,
      };
    });
    setProductsMap(productsMap);
  };

  const onChangePage = (pageIndex: number) => {
    setActivePage(pageIndex);
  };

  const onSave = async (data: IApproveUserProps) => {
    const products = productsMap ? Object.keys(productsMap).filter(productId => productsMap[productId].statusChanged).map(productId => productsMap[productId].statusChanged && ({
      "product_status": productsMap[productId].status,
      "uuid_product": productId,
    })) : [];
    const requestBody = {
      "uuid_user": selectedUser.id,
      "user_status": selectedUser.status,
      "products": products,
      "comment_approval": data.additionalComments
    };
    const approvedUser = await approveUser(requestBody);
    const newUserList = [...userList];
    const userIndex = newUserList.findIndex(user => user.id === approvedUser.data.uuid_user);
    newUserList[userIndex] = { ...userList[userIndex], status: approvedUser.data.user_status };
    setUserList(newUserList);
    onCloseManageUserModal();
  };

  const onChangeUserStatus = (status: string) => {
    const newSelectedUser = { ...selectedUser };
    newSelectedUser.status = status;
    setSelectedUser(newSelectedUser);
    setEnableSave(true);
    document.body.click();
  };

  const onChangeProductStatus = (productId: string, status: string) => {
    const newProductsMap = { ...productsMap };
    const newProductStatus = { ...productsMap![productId] };
    newProductStatus.status = status;
    newProductStatus.statusChanged = true;
    newProductsMap[productId] = newProductStatus;
    setProductsMap(newProductsMap);
    setEnableSave(true);
    document.body.click();
  };

  const onCloseManageUserModal = () => {
    setShowManageUserModal(false);
    setProductsMap(undefined);
    setEnableSave(false);
  };

  const onOpenManageUser = (user: any) => {
    setSelectedUser(user);
    setShowManageUserModal(true);
  };


  useEffect(() => {
    onGetUserList(activePage * 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, activePage]);

  useEffect(() => {
    selectedUser && onGetSellerProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?.id]);

  return {
    register,
    handleSubmit,
    userList,
    pages,
    activePage,
    setActivePage,
    showManageUserModal,
    onCloseManageUserModal,
    onOpenManageUser,
    selectedUser,
    productsMap,
    onChangeUserStatus,
    onChangeProductStatus,
    onSave,
    statusToClassFormatter,
    onChangePage,
    enableSave,
  };
};

export default useProductList;