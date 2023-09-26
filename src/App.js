import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/LoginForm';



const App = () => {
	return (<>
		<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginForm />} />
		</Routes>
		</Router>
	</>);
};

export default App;
