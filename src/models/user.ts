
export interface User {
  id: string;
  name: string;
  username: string;
  profileImageUrl?: string;
  followers?: User[];
  following?: User[];
}