import './assets/css/all.min.css';
import './assets/css/general.css';
import './assets/css/tailwind.output.css';

// Components
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './components/Layout';

// Pages
import DetailCountry from './pages/DetailCountry';
import Home from './pages/Home';

// Config
import theme from './config/theme';

const App = () => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Layout>
					<Switch>
						<Route path="/details/:alphaCode" component={DetailCountry} />
						<Route path="/" component={Home} />
					</Switch>
				</Layout>
			</ThemeProvider>
		</Router>
	)
}

export default App
