import {Menu} from 'react-admin';
//import LabelIcon from '@mui/icons-material/Label';

export const AdminMenu = () => (
    <Menu>
        <Menu.DashboardItem/>
        <Menu.ResourceItem name="newsletter"/>
        <Menu.ResourceItem name="conferences"/>
        <Menu.ResourceItem name="agenda"/>
        {/*<Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/>*/}
    </Menu>
);

export default AdminMenu;