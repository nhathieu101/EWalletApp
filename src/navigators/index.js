import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import EnterNumber from '../screens/EnterNumber'
import SelectPayment from '../screens/SelectPayment'
import Confirm from '../screens/Confirm'

const Main = createSwitchNavigator({
    EnterNumber: { screen: EnterNumber },
    SelectPayment: { screen: SelectPayment },
    Confirm: { screen: Confirm },
},
{
    initialRouteName: 'EnterNumber',
}
);

export default createAppContainer(Main);