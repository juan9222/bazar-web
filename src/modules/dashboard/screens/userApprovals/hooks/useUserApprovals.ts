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

  const onGetUserList = async () => {
    const resp = await getUsersList(0);
    const users = resp.data.results.map((user: any) => ({
      id: user.uuid,
      companyName: user.company[0].company_name,
      userName: `${ user.first_name } ${ user.last_name }`,
      profile: capitalizeFirstLetter(user.rol),
      status: user.status,
    }));
    setUserList(users);
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
    await approveUser(requestBody);
    onCloseManageUserModal();
  };

  const onChangeUserStatus = (status: string) => {
    const newSelectedUser = { ...selectedUser };
    newSelectedUser.status = status;
    setSelectedUser(newSelectedUser);
    document.body.click();
  };

  const onChangeProductStatus = (productId: string, status: string) => {
    const newProductsMap = { ...productsMap };
    const newProductStatus = { ...productsMap![productId] };
    newProductStatus.status = status;
    newProductStatus.statusChanged = true;
    newProductsMap[productId] = newProductStatus;
    setProductsMap(newProductsMap);
    document.body.click();
  };

  const onCloseManageUserModal = () => setShowManageUserModal(false);

  const onOpenManageUser = (user: any) => {
    setSelectedUser(user);
    setShowManageUserModal(true);
  };


  useEffect(() => {
    onGetUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedUser && onGetSellerProducts();
  }, [selectedUser?.id]);

  return {
    register,
    handleSubmit,
    userList,
    showManageUserModal,
    onCloseManageUserModal,
    onOpenManageUser,
    selectedUser,
    productsMap,
    onChangeUserStatus,
    onChangeProductStatus,
    onSave,
    statusToClassFormatter,
  };
};

export default useProductList;