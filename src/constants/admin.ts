import { Role } from "./global";

export const admins = [
  {
    email: "sudoadmin@educaso.com",
    password: "admin@educaso@321",
    role: Role.SUPER_ADMIN,
    fullName: "Super Admin",
    currentCity: "",
    phoneNumber: "+9779806291760",
    isEmailVerified: true,
    isPhoneVerified: true,
    resetToken: null,
    resetPasswordExpire: null,
    confirmEmailToken: null,
  },
];
