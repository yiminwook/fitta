export interface SignUpDataBase {
  email: string;
  address: string;
  password: string;
  passwordConfirm?: string; //post 날리기전에 삭제
  name: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
}

export interface SignUpMemberData extends SignUpDataBase {
  occupation: string;
}
export interface SignUpOwnerData extends SignUpDataBase {
  businessRegistrationNumber: string; //삭제예정
}
