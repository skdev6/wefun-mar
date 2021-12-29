import React, { Component, Suspense, useContext } from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import './styles/base.scss'
import { Head } from 'react-static'
import { popper } from '@popperjs/core'

let bootstrap = {}
if (typeof document !== 'undefined') {
    bootstrap = require('bootstrap')
}
import { StoreProvider } from './store'

import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme';

import Navbar from './components/Navbar'
import Index from 'pages/Index'
import ExplorerProject from 'pages/ExplorerProject'
import CreateProject from 'pages/CreateProject'
import BackProject from 'pages/BackProject'
import DetailProject from 'pages/ProjectDetail'
import Invest_step1 from 'pages/Invest_step1'
import Invest_step2 from 'pages/Invest_step2'
import Invest_step3 from 'pages/Invest_step3'
import Invest_step4 from 'pages/Invest_step4'
import NotFound from 'pages/NotFound'

class App extends Component {
 
    render() {
        return (
            <Suspense
                fallback={
                    <div className="vh-100 d-flex">
                        <div className="align-self-center w-100 text-center">
                            <img src="logo.png" className="img-fluid mb-4" />
                            <p
                                style={{
                                    color: '#f038f0',
                                    textTransform: 'uppercase',
                                    fontSize: '36px',
                                    fontWeight: '300',
                                    textShadow: '0px 0px 26px #ff36ff',
                                    fontFamily: "'Monoton', cursive",
                                }}
                                className="loading_animation"
                            >
                                Loading...{' '}
                            </p>
                        </div>
                    </div>
                }
            >
                <Root>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                        />
                        <title>
                            WeFund - Back to Our Project on Terra blockchain
                        </title>
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href="https://loterra.io/favicon.ico"
                        />
                        <link
                            data-hid="shortcut-icon"
                            rel="shortcut icon"
                            href="https://loterra.io/favicon.ico"
                        />
                        <meta property="og:title" content="LoTerra" />
                        <meta
                            property="og:image"
                            content="https://loterra.io/loterra.png"
                        />
                        <meta property="og:image:alt" content="LoTerra icon" />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:site_name"
                            content="LoTerra interface"
                        />
                        <meta
                            property="og:description"
                            content="LoTerra is a lottery contract, buy tickets as a player or join the governance! DAO allows making decisions together! Manage the casino 🎰 Set the prize 🏆 Up the ticket price or go cheap 🏷 Extract max profits 🤑 Keep the vault secure at all times!"
                        />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="LoTerra" />
                        <meta
                            name="twitter:title "
                            content="LoTerra - Decentralized lottery on Terra blockchain"
                        />
                        <meta
                            name="twitter:description"
                            content="LoTerra is a lottery contract, buy tickets as a player or join the governance! DAO allows making decisions together! Manage the casino 🎰 Set the prize 🏆 Up the ticket price or go cheap 🏷 Extract max profits 🤑 Keep the vault secure at all times!"
                        />
                        <meta
                            name="twitter:image"
                            content="https://loterra.io/loterra.png"
                        />
                        <script
                            src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"
                            async
                        />
                    </Head>
                    <StoreProvider>
                    <ChakraProvider resetCSS theme={theme}>
                        {/* <Routes default /> */}
                        {/* <AppRouter /> */}
                        <Navbar/>
                        <Router>
                            <Index path="/" />
                            <CreateProject path="create" />
                            <BackProject path="back" />
                            <ExplorerProject path="explorer" />
                            <DetailProject path="detail" />
                            <Invest_step1 path="invest_step1" />
                            <Invest_step2 path='invest_step2' />
                            <Invest_step3 path='invest_step3' />
                            <Invest_step4 path='invest_step4' />
                            <NotFound default />
                        </Router>
                    </ChakraProvider>
                    </StoreProvider>
                </Root>
            </Suspense>
        )

    }
}

export default App
