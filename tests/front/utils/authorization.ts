import { AuthPage } from "../auth/auth.page";
import { RegistrationPage } from "../registration/registration.page";
import { Page } from "@playwright/test";
import { authorizedUser as user } from "../_shared/credits";

export const authorization = async (page: Page)=>{
    const authPage = new AuthPage(page);
    const registerPage = new RegistrationPage(page);

    await authPage.registerLink.click();
    await registerPage.register(user.userName, user.email, user.password, user.password);
    
    await authPage.open();
};
