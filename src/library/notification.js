import {store} from "react-notifications-component";

export const notify = (message, type='success', time=5000) => {
    store.addNotification({
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            showIcon: true,
            duration: time,
            onScreen: true
        }
    });
}
