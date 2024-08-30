import Users from "@_models/Users";
import { UserInfo } from "@_types/index";

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
    userId: string,
    profile: UserInfo
  ): Promise<UserInfo | null> => {
    const [rowsUpdated] = await Users.update(profile, {
      where: { id: userId },
    });

    if (rowsUpdated > 0) {
      const updatedUser = await Users.findByPk(userId);
      if (updatedUser) {
        return {
          id: userId,
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
