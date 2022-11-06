import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';

import Create from './create'
import Goto from './goto'
import Random from './random'

const App = () => { return (
    <HashRouter>
        <Routes>
            <Route exact path={ '/' } element={ <Create /> } />
            <Route exact path={ '/random' } element={ <Random /> } />
            <Route exact path={ '/:short_url' } element={ <Goto /> } />
        </Routes>
    </HashRouter>
)}

export default App;