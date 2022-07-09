import { UsersV1Controller } from "../controllers/UsersController.v1";
import { CreateUserV1Service } from "../services/CreateUserService.v1";

function usersFactoryV1(): UsersV1Controller {
  const createUserServiceV1 = new CreateUserV1Service();

  const usersControllerV1 = new UsersV1Controller(createUserServiceV1);

  return usersControllerV1;
}

export { usersFactoryV1 };
