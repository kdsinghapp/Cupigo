

// import IniializeData from '../screens/WelcomeScreen/IniializeData';

import TabNavigator from "../navigators/TabNavigator";
import SplashScreen from "../screen/Wellcome/SplashScreen";
import Wellcome from "../screen/Wellcome/Wellcome";
import AskSelf from "../screen/auth/AskSelf";
import Askabout from "../screen/auth/Askabout";
import Askage from "../screen/auth/Askage";
import Askfinal from "../screen/auth/Askfinal";
import Asklive from "../screen/auth/Asklive";
import Addressask from "../screen/auth/Asklive";
import Asklooking from "../screen/auth/Asklooking";
import Askname from "../screen/auth/Askname";
import Askrelationship from "../screen/auth/Askrelationship";
import Login from "../screen/auth/Login";
import OtpScreen from "../screen/auth/OtpScreen";
import SignupMethod from "../screen/auth/SignupMethod";
import Subscription from "../screen/bottomTab/Subscription";
import chat from "../screen/bottomTab/chat/chat";
import chatPage from "../screen/bottomTab/chat/chatPage";
import Biography from "../screen/profilesection/Biography";
import Distance from "../screen/profilesection/Distance";
import GeneralCondions from "../screen/profilesection/GeneralCondions";
import changeIdentifier from "../screen/profilesection/changeIdentifier";
import contactUs from "../screen/profilesection/contactUs";
import privacypolicy from "../screen/profilesection/privacypolicy";
import setting from "../screen/profilesection/setting";

import ScreenNameEnum from "./screenName.enum";



const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component:SplashScreen,
    },
    {
      name: ScreenNameEnum.WELLCOME_SCREEN,
      Component:Wellcome,
    },
    {
      name: ScreenNameEnum.BOTTOM_TAB,
      Component:TabNavigator,
    },
    {
      name: ScreenNameEnum.SIGNUP_METHOD,
      Component:SignupMethod,
    },
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component:Login,
    },
    {
      name: ScreenNameEnum.OTP_SCREEN,
      Component:OtpScreen,
    },
    {
      name: ScreenNameEnum.ASK_NAME,
      Component:Askname,
    },
    {
      name: ScreenNameEnum.ASK_LIVE,
      Component:Asklive,
    },
    {
      name: ScreenNameEnum.ASK_AGE,
      Component:Askage,
    },
    {
      name: ScreenNameEnum.ASK_SELF,
      Component:AskSelf,
    },
    {
      name: ScreenNameEnum.ASK_LOOKING,
      Component:Asklooking,
    },
    {
      name: ScreenNameEnum.ASK_RELATIONSHIP,
      Component:Askrelationship,
    },
    {
      name: ScreenNameEnum.ASK_ABOUT,
      Component:Askabout,
    },
    {
      name: ScreenNameEnum.ASK_FINAL,
      Component:Askfinal,
    },
    {
      name: ScreenNameEnum.CHAT_SCREEN,
      Component:chat,
    },

    {
      name: ScreenNameEnum.BIOGRAPHY,
      Component:Biography,
    },
    {
      name: ScreenNameEnum.CHANGE_IDENTIFIER,
      Component:changeIdentifier,
    },
    {
      name: ScreenNameEnum.DISTANCE,
      Component:Distance,
    },
    {
      name: ScreenNameEnum.PRIVACY_POLICY,
      Component:privacypolicy,
    },
    {
      name: ScreenNameEnum.CONTACT_US,
      Component:contactUs,
    },
    {
      name: ScreenNameEnum.GENERAL_CONDITIONS,
      Component:GeneralCondions,
    },
    {
      name: ScreenNameEnum.SETTINGS,
      Component:setting,
    },
    {
      name: ScreenNameEnum.SUBSCRIPTION,
      Component:Subscription,
    },
   
    
  ],
  
  // PROFILE_ROUTE: [
  //   {
  //     name: ScreenNameEnum.PROFILE_SCREEN,
  //     Component:Profile,
  //   }
 
   
    



  // BOTTOMTAB_ROUTE:[
    
  //   {
  //     name: ScreenNameEnum.HOME_SCREEN,
  //     Component:Home,
  //     logo:require('../assets/croping/HomeUnactive3x.png'),
  //     lable:'Home'
  //   },
  //   {
  //     name: ScreenNameEnum.Orders,
  //     Component:Orders,
  //     logo:require('../assets/croping/HomeUnactive3x.png'),
  //     lable:'Order'
  //   },
  //   {
  //     name: ScreenNameEnum.WALLET_SCREEN,
  //     Component:Wallet,
  //     logo:require('../assets/croping/IconPlus3x.png'),
  //     lable:'Wallet'
  //   },
  //   {
  //     name: ScreenNameEnum.PROFILE_STACK,
  //     Component:ProfileRoutes,
  //     logo:require('../assets/croping/Profile3x.png'),
  //     lable:'Profile'
  //   },
  // ]

};

export default _routes;
