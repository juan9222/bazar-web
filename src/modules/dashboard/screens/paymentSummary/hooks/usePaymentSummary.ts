import usePaymentSummaryProvider from "../providers";

const usePaymentSummary = () => {

  const { getSellerWhatsappLink } = usePaymentSummaryProvider();

  const onGetSellerWhatsappLink = async (sellerId: string) => {
    const link = await getSellerWhatsappLink(sellerId);
    if (link.data?.whatsapp_phone) {
      window.open(`${ link.data.whatsapp_phone }`, '_blank');
    }
  };

  return {
    onGetSellerWhatsappLink,
  };
};

export default usePaymentSummary;