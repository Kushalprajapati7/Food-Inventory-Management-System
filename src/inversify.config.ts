import { Container } from "inversify";
import { UserController } from "./controllers/UserContoller";
import { UserService } from "./Services/UserServices";
import { TYPES } from "./types/types";
import { CategoryController } from "./controllers/CategoryController";
import { CategoryService } from "./Services/CategoryService";
import { SupplierController } from "./controllers/SupplierController";
import { SupplierService } from "./Services/SupplierService";


const container = new Container();
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<CategoryController>(TYPES.CategoryController).to(CategoryController);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService)

container.bind<SupplierController>(TYPES.SupplierController).to(SupplierController)
container.bind<SupplierService>(TYPES.SupplierService).to(SupplierService)

export { container };