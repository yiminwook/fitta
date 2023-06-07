type GenderType = 'FEMALE' | 'MALE';
type RoleType = 'OWNER' | 'MEMBER' | 'STAFF';
type GenderDivisionType = 'FEMALE_ONLY' | 'MALE_ONLY' | 'UNISEX';

export interface EssentialBaseType {
  id: number;
  name: string;
}

export interface PersonalBaseType extends EssentialBaseType {
  address: string | null;
  bithdate: string;
  gender: GenderType;
}

export interface MemberType extends PersonalBaseType {}

export interface StaffType extends PersonalBaseType {
  phoneNumber: string;
}

export interface GymType extends EssentialBaseType {
  ownerName: string;
  address: string;
  phoneNumber: string;
  genderDivision: GenderDivisionType;
  members: MemberType[];
  staffs: StaffType[];
}

export interface MyDataType extends EssentialBaseType {
  role: RoleType;
  profileImage: string;
}

export interface OwnerMyDataType extends PersonalBaseType {
  phoneNumber: string;
  role: RoleType;
  businessRegistrationNumber: string;
  email: number;
  gymList: GymType[];
  staffs: StaffType[];
}

interface GenderRateType {
  femaleCount: number;
  femaleRate: number;
  maleCount: number;
  maleRate: number;
  totalCount: number;
}

export interface OwnerMyAllDataType {
  allgymCount: { gymCount: number; memberCount: number; teamCount: number };
  memberAgeRate: Record<string, number>;
  memberRate: GenderRateType;
  memberTodayRate: GenderRateType;
}

//signUp
export interface SignUpDataBaseType {
  email: string;
  address: string;
  password: string;
  passwordConfirm?: string; //post 날리기전에 삭제
  name: string;
  phoneNumber: string;
  birthdate: string;
  gender: string;
}

export interface SignUpMemberDataType extends SignUpDataBaseType {
  occupation: string;
}
export interface SignUpOwnerDataType extends SignUpDataBaseType {
  businessRegistrationNumber: string; //삭제예정
}
