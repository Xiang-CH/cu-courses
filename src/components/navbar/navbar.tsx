import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import "./navbar.css";

function Icons({iconName}:{iconName: string}) {
    const icons: { [key: string]: JSX.Element } = {
        'home': <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"></path><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"></path></svg>,
        'course': <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="white" d="M1760 1590q66 33 119 81t90 107t58 128t21 142h-128q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149h-128q0-73 20-142t58-128t91-107t119-81q-75-54-117-135t-43-175q0-79 30-149t82-122t122-83t150-30q79 0 149 30t122 82t83 123t30 149q0 94-42 175t-118 135m-224-54q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m-512 80q-32 37-58 77t-46 86q-53-55-128-85t-152-30H256V384H128v1408h787q-14 31-23 63t-15 65H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256v640q-58-57-128-95V384h-128v369q-32-9-64-13t-64-4V256h-256q-70 0-136 24t-120 71zm-128-13V351q-54-46-120-70t-136-25H384v1280h256q67 0 132 17t124 50"></path></svg>,
        'myCalendar': <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"></path><path fill="white" fillRule="evenodd" d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z" clipRule="evenodd"></path></svg>
    }
	return (<div className="mr-2">{icons[iconName]}</div>);
}

function MenuItem({ title, path, iconName }: {title: string, path: string, iconName: string}) {
    return (
        <NavigationMenuItem className="flex items-center mx-4">
            <Link to={path} className={`${navigationMenuTriggerStyle()} text-secondary-foreground bg-secondary font-light hover:text-secondary hover:bg-primary active:text-secondary active:bg-primary menuItem`}>
                <Icons iconName={iconName}/>
                {title}
            </Link>
        </NavigationMenuItem>
    )
}

function NavBar() {
    const { t } = useTranslation();
    return (
        <div className="w-screen bg-secondary relative flex justify-between px-6">
            <NavigationMenu className="bg-secondary h-16">
                    <img src={logo} alt="logo" className="h-10 w-10 ml-2 mr-4 bg-white rounded-full"/>
                    <Label className="text-accent text-2xl mr-8 font-semibold w-fit">{t('navbar-app-name')}</Label>
                    <NavigationMenuList>
                        <MenuItem title={t('navbar-home')} path='/home' iconName="home"/>
                        <MenuItem title={t('navbar-class-platform')} path='/courses' iconName="course"/>
                        <MenuItem title={t('navbar-my-calendar')} path='/calendar' iconName="myCalendar"/>
                    </NavigationMenuList>
            </NavigationMenu>
            <Button className="bg-accent self-center mr-2">{t('navbar-login-register')}</Button>
        </div>
    );
}

export default NavBar;
  