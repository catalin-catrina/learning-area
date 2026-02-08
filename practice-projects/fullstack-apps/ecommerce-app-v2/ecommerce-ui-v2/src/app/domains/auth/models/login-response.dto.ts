import { UserDto } from './user.dto';

export interface LoginResponseDto {
  message: string;
  payload: UserDto;
}
