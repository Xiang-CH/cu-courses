import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";

function MenuItem({ title, path }: {title: string, path: string}) {
    return (
        <NavigationMenuItem>
            <Link to={path} className={`${navigationMenuTriggerStyle()} text-secondary-foreground bg-secondary mx-2 font-light hover:text-secondary hover:bg-primary active:text-secondary active:bg-primary`}>{title}</Link>
        </NavigationMenuItem>
    )
}

function NavBar() {
    const { t } = useTranslation();
    return (
        <div className="w-screen bg-secondary relative flex justify-between px-6">
            <NavigationMenu className="bg-secondary h-16">
                    <img src={logo} alt="logo" className="h-10 w-10 ml-2 mr-6 bg-white rounded-full"/>
                    <p className="text-accent text-2xl mr-10">{t('navbar-app-name')}</p>
                    <NavigationMenuList>
                        <MenuItem title={t('navbar-home')} path='/home'/>
                        <MenuItem title={t('navbar-class-platform')} path='/courses'/>
                        <MenuItem title={t('navbar-my-calendar')} path='/calendar'/>
                    </NavigationMenuList>
            </NavigationMenu>
            <Button className="bg-accent self-center mr-2">{t('navbar-login-register')}</Button>
        </div>
    );
}

export default NavBar;
  