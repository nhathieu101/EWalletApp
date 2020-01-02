import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EnterNumber from '../screens/EnterNumber'
import SelectPayment from '../screens/SelectPayment'
import Confirm from '../screens/Confirm'
import OTPConfirm from '../screens/OTPConfirm'
import CompleteTransaction from '../screens/CompleteTransaction'

// const Main = createStackNavigator({
//     EnterNumber: { screen: EnterNumber },
//     SelectPayment: { screen: SelectPayment },
//     Confirm: { screen: Confirm },
//     OTPConfirm:{screen:OTPConfirm},
//     Complete:{screen:CompleteTransaction},
// },
// {
//     headerMode: 'none',
//     initialRouteName: 'EnterNumber',
// }
// );
export const Logged = createStackNavigator({
    EnterNumber: { screen: EnterNumber },
    SelectPayment: { screen: SelectPayment },
    Confirm: { screen: Confirm },
    OTPConfirm:{screen:OTPConfirm},
    // Complete:{screen:CompleteTransaction},
},
    {
        headerMode: 'none',
        initialRouteName: 'EnterNumber',
    }
);
export const LoggedIn =createAppContainer(Logged)
export const Main = createSwitchNavigator({
    logged: Logged,
    Complete:{screen:CompleteTransaction},
},
    {
        headerMode: 'none',
        initialRouteName: 'logged',
    }
);


export default createAppContainer(Main);