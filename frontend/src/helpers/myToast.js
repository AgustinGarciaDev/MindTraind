import { ToastHeader } from 'react-bootstrap';
import { toast } from 'react-toastify';
const defaultConfiguration = (position) => {
    return {
        position,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
}

export function showToast(type, message, position = "top-right",) {

    switch (type) {
        case "error":
            toast.error(message, defaultConfiguration(position));
            break;
        case "success":
            toast.success(message, defaultConfiguration(position));
            break;
        case "info":
            toast.info(message, defaultConfiguration(position));
            break;
        default:
            toast.error(`error myToast, type: "${type}" is invalid`,"bottom-left" )
    }
}

export function mostrarTostadaError500(position = "top-right",) {
    toast.error("ups , something went wrong, please try again... ",defaultConfiguration(position) );
}
