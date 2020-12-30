import React from 'react'
import ReactDOM from 'react-dom'

import Profile from '../components/Profile/Profile'
import PieChart from '../components/PieChart/PieChart'
import Commits from '../components/Commits/Commits'
import Navbar from '../components/Navbar/Navbar'
import Social from '../components/Social/Social'

import './home.sass'

class Home extends React.Component {

    render() {
        return (
            <div className="Home">
                <Navbar />
                <div className="Home_Body">
                    <div className="SmallElements">
                        <Profile />
                        <Commits />
                        <PieChart />
                        <Social/>
                    </div>
                </div>
                <div className="largestElements">

                </div>
            </div>
        )
    }
}

export default Home
