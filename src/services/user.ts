import Users from "@_models/Users";
import { UserInfo } from "@_types/user";

class UserService {
  getUserInfo = async (id: string): Promise<UserInfo | null> => {
    const updatedUser = await Users.findByPk(id);
    if (updatedUser) {
      return {
        id,
        nickname: updatedUser.nickname,
        profile_image: updatedUser.profile_image,
        wallet: updatedUser.wallet,
      };
    } else {
      return null;
    }
  };

  updateUserInfo = async (
    id: string,
    userInfo: UserInfo
  ): Promise<UserInfo | null> => {
    // const update = {
    //   nickname: userInfo.nickname,
    //   profile_image: userInfo.profile_image,
    //   wallet: userInfo.wallet,
    // };
    const [rowsUpdated] = await Users.update(userInfo, {
      where: { id },
    });

    if (rowsUpdated > 0) {
      const updatedUser = await Users.findByPk(id);
      if (updatedUser) {
        return {
          id,
          nickname: updatedUser.nickname,
          profile_image: updatedUser.profile_image,
          wallet: updatedUser.wallet,
        };
      }
    }

    console.log("No user was updated.");
    return null;
  };
}

export const userService = new UserService();
