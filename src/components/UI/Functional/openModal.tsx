import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

const openModal = (children: ReactNode, onClose: () => void) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return;

  const modalContainer = document.createElement("div");
  modalRoot.appendChild(modalContainer);

  const closeModal = () => {
    root.unmount(); // Размонтировать React-компонент
    modalRoot.removeChild(modalContainer); // Удалить контейнер из DOM
    onClose();
  };

  const modalContent = (
    <div className="ModalWindow">
      <div className="ModalWindow_content animated-scaleup">
        <div className="ModalWindow_close" onClick={closeModal}>
          ✖ Close
        </div>
        {children}
      </div>
    </div>
  );

  const root = createRoot(modalContainer);
  root.render(modalContent);
};

export default openModal;
