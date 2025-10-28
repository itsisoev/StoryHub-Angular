export interface IUser {
  uuid: string;
  username: string;
  password: string;
  aboutMe?: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}
