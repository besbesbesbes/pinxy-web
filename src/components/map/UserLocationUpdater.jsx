import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const UserLocationUpdater = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.setView(userPosition, 18); // Update map position
    }
  }, [userPosition, map]);

  return null;
};

export default UserLocationUpdater;
