import React from 'react';
import { requestNotificationPermission } from '../utils/notificationUtils';
import './NotificationBanner.css';

function NotificationBanner({ hasPermission, onPermissionChange }) {
  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (onPermissionChange) {
      onPermissionChange(granted);
    }
  };

  if (hasPermission) {
    return null;
  }

  return (
    <div className="notification-banner">
      <div className="notification-banner-content">
        <i className="nf nf-md-bell_ring"></i>
        <span>¿Quieres recibir notificaciones cuando encuentres un Pokémon?</span>
        <button 
          className="btn btn-sm btn-light"
          onClick={handleRequestPermission}
        >
          Activar notificaciones
        </button>
      </div>
    </div>
  );
}

export default NotificationBanner;
