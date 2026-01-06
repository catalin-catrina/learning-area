import { UserDto } from "./user.dto";

export interface LoginResponseDto {
  message: string;
  accessToken: string;
  payload: UserDto;
}
