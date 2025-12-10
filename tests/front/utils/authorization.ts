import { AuthPage } from "auth/auth.page";
import { RegistrationrPage } from "../registration/registration.page";
import { Page } from "playwright/test";
import { authorizedUser as user } from "../_shared/credits";

export const authorization = async (page: Page)=>{
    const authPage = new AuthPage(page);
    const registerPage = new RegistrationrPage(page);

    authPage.registerLink.click();
    registerPage.register(user.email, user.username, user.password);
    
    await authPage.open();
};