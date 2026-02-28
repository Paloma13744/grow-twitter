
export interface User {
  id: string;
  name: string;
  username: string;
  imageUrl?: string;      
  followers?: User[];
  following?: User[];
}