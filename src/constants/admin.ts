import { Role } from "./global";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const admins = [
  {
    email: "admin@ppsona.com",
    password: "Admin@123",
    role: Role.ADMIN,
    fullName: "PPSONA admin",
    currentCity: "",
    house: "Satluj",
    houseNumber: "",
    phoneNumber: "",
    profession: "",
    yearPassedOut: "",
  },
];
