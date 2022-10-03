const useLogin = () => {
  const { innerWidth: viewPortWidth } = window;
  const isTabletWidthOrLess = () => viewPortWidth <= 768;
  return {
    isTabletWidthOrLess,
  };
};

export default useLogin;