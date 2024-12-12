import { useState, useEffect } from "react";

function useConfirm() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState(() => { });

    const showConfirm = (message, fn) => {
        setMessage(message);
        setOnConfirm(fn);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        onConfirm();
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return { isOpen, message, showConfirm, handleConfirm, handleCancel };
}

export default useConfirm;
