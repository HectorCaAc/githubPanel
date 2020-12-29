import React from 'react'
import ReactDOM from 'react-dom'

import Profile from '../components/Profile/Profile'
import PieChart from '../components/PieChart/PieChart'
import Commits from '../components/Commits/Commits'

import './home.sass'

class Home extends React.Component {

    render() {
        return (
            <div className="Home">
                <div className="SmallElements">
                    <Profile />
                    <Commits />
                    <PieChart />
                </div>
                <div className="largestElements">
                    
                </div>
            </div>
        )
    }
}

export default Home
