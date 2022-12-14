import { toast } from "react-toastify";

export function Success(props) {
    return toast.success(`${props.message}`, {
        position: "center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function Error(props) {
    return toast.error(`${props.message}`, {
        position: "center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}