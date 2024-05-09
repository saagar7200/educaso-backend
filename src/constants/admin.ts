import { Role } from "./global";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const admins = [
  {
    email: "sudoadmin@quiz.com",
    password: "MasterQuiz@321",
    role: Role.SUPER_ADMIN,
    fullName: "Super Admin",
    currentCity: "",
    phoneNumber: "+9779806291760",
    profession: "Engineer",
    isEmailVerified: true,
    isPhoneVerified: true,
    resetToken: null,
    resetPasswordExpire: null,
    confirmEmailToken: null,
  },
];
