import React from 'react';

const PopupForm = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <h2>Formulario</h2>
        <form>
          <div style={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  formGroup: {
    marginBottom: '15px',
  },
};

export default PopupForm;