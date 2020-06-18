import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Errorboundary from '../components/Errorboundary';
import './App.css';

import { setSearchfield,requestRobots } from '../actions'

const mapStateToProps= state => {
	return {
		searchField: state.searchRobots.searchField,
		robots : state.requestRobots.robots,
		isPending : state.requestRobots.isPending,
		error : state.requestRobots.error
	}
}
const mapDispactToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
		onRequestRobots : () => dispatch(requestRobots())
	}
}
class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	

	render() {

		const { searchField , onSearchChange,robots,isPending } =this.props;
		const filteredRobot=robots.filter(robot => { 
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending? 
		<h1 className='tc mt3'>Loading</h1> :
		 (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={ onSearchChange }/>
				<Scroll>
					<Errorboundary>
						<Cardlist robots={ filteredRobot }/>
					</Errorboundary>
				</Scroll>
			</div>
			);

		}
		
}

export default connect(mapStateToProps, mapDispactToProps)(App);