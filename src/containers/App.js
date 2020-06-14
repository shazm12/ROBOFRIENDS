import React,{ Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Errorboundary from '../components/Errorboundary';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state= {
			robots: [],
			searchfield:' '
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => {
			return response.json();
		})
		.then(users => { this.setState({robots:users})
			
		});
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})

	}

	render() {
		const {robots,searchfield }=this.state;
		const filteredRobot=robots.filter(robot => { 
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return robots.lenght? 
		<h1>Loading</h1> :
		 (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<Errorboundary>
						<Cardlist robots={ filteredRobot }/>
					</Errorboundary>
				</Scroll>
			</div>
			);

		}
		
}

export default App;