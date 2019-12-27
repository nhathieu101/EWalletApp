import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EnterNumber from '../screens/EnterNumber'
import SelectPayment from '../screens/SelectPayment'
import Confirm from '../screens/Confirm'

const Main = createStackNavigator({
    EnterNumber: { screen: EnterNumber },
    SelectPayment: { screen: SelectPayment },
    Confirm: { screen: Confirm },
},
{
    headerMode: 'none',
    initialRouteName: 'EnterNumber',
}
);

export default createAppContainer(Main);