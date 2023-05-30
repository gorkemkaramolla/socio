interface User {
  name: string;
  email: string;
  image?: Buffer;
  id: string;
  bio: string;
  imageUri: string;
  username: string;
  location: string;
}
interface LocationUser {
  city: string;
  country: string;
}
