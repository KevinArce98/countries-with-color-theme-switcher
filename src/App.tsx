import { ThemeProvider } from '@material-ui/styles';
import './assets/css/all.min.css';
import './assets/css/general.css';
import './assets/css/tailwind.output.css';

// Components
import Header from './components/Header';

// Config
import theme from './config/theme';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<i className="fab fa-whatsapp" style={{ width: 250, height: 250, fontSize: 250 }}></i>
		</ThemeProvider>
	)
}

export default App
