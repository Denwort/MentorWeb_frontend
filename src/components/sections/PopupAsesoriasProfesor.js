import React from "react";

const PopupForm = ({ isVisible, onClose, asesoria }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <button
          onClick={onClose}
          className="text-red-500 font-bold float-right"
        >
          X
        </button>
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Detalles de Asesoría
          </h2>
        </div>
        <div className="text-gray-600 mb-2">
          <p>
            <span className="font-medium">Fecha:</span> {asesoria.fecha}
          </p>
          <p>
            <span className="font-medium">Hora:</span> {asesoria.hora_inicio} -{" "}
            {asesoria.hora_fin}
          </p>
          <p>
            <span className="font-medium">Ambiente:</span> {asesoria.ambiente}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
