// Hooks
import useDarkMode from '../hooks/useDarkMode';

// Components
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import FontAwesomeIcon from './FontAwesomeIcon';

const Header = () => {

    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <AppBar position="static" color="default" className="header">
            <Toolbar>
                <Typography variant="h6" className="title">
                    Where in the world?
                </Typography>

                <Button onClick={() => setDarkMode(!darkMode)} className="switch">
                    <FontAwesomeIcon iconName="fa-moon" type={darkMode ? 'fas' : 'fal'} className="mr-2" /> Dark Mode
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
