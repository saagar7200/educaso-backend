import { BcryptService } from "../utilities/bcrypt.service";
import dataSource from "../config/database.config";
import { admins } from "../constants/admin";
import { UserEntity } from "../entities/allEntities/user/user.entity";

dataSource
  .initialize()
  .then(async () => {
    const adminRepository = dataSource.getRepository(UserEntity);
    for (const el of admins) {
      const admin = adminRepository.create(el as UserEntity);

      admin.password = await new BcryptService().hash(el.password as string);
      await adminRepository.save(admin);
      console.info("Admin seed completed");
    }
  })
  .catch((err: any) => {
    console.error(err);
  })
  .finally(() => {
    dataSource.destroy();
  });
