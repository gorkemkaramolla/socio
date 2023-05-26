function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported'));
    }
  });
}

import axios from 'axios';

interface Location {
  city: string;
  country: string;
  // Add more properties as needed
}

async function getLocationDetails(
  latitude: number,
  longitude: number
): Promise<Location> {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await axios.get(apiUrl);
    const { address } = response.data;

    const city = address.city || address.town || address.village || '';
    const country = address.country || '';

    return { city, country };
  } catch (error) {
    throw new Error('Error retrieving location details');
  }
}

export { getLocation, getLocationDetails };
