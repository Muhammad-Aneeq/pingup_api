export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  cpassword: string;
  phoneNumber: number;
  cnic: number;
  city: string;
  country: string;
  role: string;
}

export class getUserDto {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: number;
  cnic: number;
  city: string;
  country: string;
  role: string;
}

export class loginUserDto {
  email: string;
  password: string;
}
