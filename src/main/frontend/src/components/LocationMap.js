import React, { useEffect, useRef } from 'react';

const LocationMap = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && locations.length > 0) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { 
          lat: locations[0].latitude, 
          lng: locations[0].longitude 
        },
        zoom: 12,
      });

      locations.forEach(location => {
        new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
          title: location.name || location.address,
        });
      });
    }
  }, [locations]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default LocationMap;
