export interface IUser {
  uuid: string;
  username: string;
  password: string;
  aboutMe?: string | null;
  profilePhoto?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
