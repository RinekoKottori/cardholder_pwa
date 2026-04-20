import { AuthPage } from "../auth/auth.page";
import { RegistrationPage } from "../registration/registration.page";
import { Page } from "playwright/test";
import { authorizedUser as user } from "../_shared/credits";

export const authorization = async (page: Page)=>{
    const authPage = new AuthPage(page);
    const registerPage = new RegistrationPage(page);

    authPage.registerLink.click();
    registerPage.register(user.email, user.userName, user.password, user.password);
    
    await authPage.open();
};