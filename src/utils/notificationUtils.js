export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Este navegador no soporta notificaciones');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendPokemonNotification = async (pokemon) => {
  if (!pokemon) return;

  if (Notification.permission !== 'granted') {
    return;
  }

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const notificationTitle = `¡${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} encontrado!`;
      const notificationOptions = {
        body: `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')} | Altura: ${pokemon.height / 10}m | Peso: ${pokemon.weight / 10}kg`,
        icon: pokemon.sprites.front_default || '/pikachu.png',
        badge: '/icon-192.png',
        tag: `pokemon-${pokemon.id}`,
        vibrate: [200, 100, 200],
        data: {
          pokemonId: pokemon.id,
          pokemonName: pokemon.name,
          url: window.location.href
        },
        actions: [
          {
            action: 'view',
            title: 'Ver detalles'
          },
          {
            action: 'close',
            title: 'Cerrar'
          }
        ]
      };

      await registration.showNotification(notificationTitle, notificationOptions);
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }
};


export const getNotificationPermissionStatus = () => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
};
