// Components
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import FontAwesomeIcon from './FontAwesomeIcon';

const Header = () => {
    return (
        <AppBar position="static" color="default" className="header">
            <Toolbar>
                <Typography variant="h6" className="title">
                    Where in the world?
                </Typography>

                <Button>
                    <FontAwesomeIcon iconName="fa-moon" type="fas" className="mr-2"/> Dark Mode
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
