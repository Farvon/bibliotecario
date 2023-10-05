import { toast, Flip } from "react-toastify";

const config = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Flip,
};

const useAlert = () => {
  const alertSuccess = (message) => {
    toast.success(message, config);
  };

  const alertError = (message) => {
    toast.error(message, config);
  };

  const alertWarning = (message) => {
    toast.warn(message, config);
  };

  const alertInfo = (message) => {
    toast.info(message, config);
  };

  return { alertSuccess, alertError, alertWarning, alertInfo };
};

export default useAlert;
