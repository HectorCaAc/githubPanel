import React from 'react'
import ReactDOM from 'react-dom'

import { useSelector } from 'react-redux'

import Profile from '../components/Profile/Profile'
import PieChart from '../components/PieChart/PieChart'
import Commits from '../components/Commits/Commits'
import Navbar from '../components/Navbar/Navbar'
import Social from '../components/Social/Social'

import EnterHome from './EnterName'

import './home.sass'

const Home = () => {

    let currentUser = useSelector(storage => storage.currentUser)
    const USERENTER = <div className="Home">
        <Navbar />
        <div className="Home_Body">
            <div className="SmallElements">
                <Profile />
                <Commits />
                <PieChart />
                <Social />
            </div>
        </div>
        <div className="largestElements">
        </div>
    </div>

    let body = currentUser.user === '' ? <EnterHome /> : USERENTER

    return (
        body
    )
}

export default Home
