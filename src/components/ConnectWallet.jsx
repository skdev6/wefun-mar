import React, { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import { LCDClient, WasmAPI } from '@terra-money/terra.js'
import {
    useWallet,
    WalletStatus,
    useConnectedWallet,
    ConnectType,
} from '@terra-money/wallet-provider'
import { Wallet, CaretRight, Power, Check } from 'phosphor-react'
import numeral from 'numeral'
import { useStore } from '../store'


const DialogButton = {
    margin: '10px 20px 10px 20px',
}
export default function ConnectWallet() {
    let connectedWallet = ''
    const [bank, setBank] = useState()
    const [connected, setConnected] = useState(false)
    const { state, dispatch } = useStore()

    let wallet = ''
    if (typeof document !== 'undefined') {
        wallet = useWallet()
        connectedWallet = useConnectedWallet()
    }

    const lcd = useMemo(() => {
      if (!connectedWallet) {
        setConnected(false);
        return null
      }
      setConnected(true);

      return new LCDClient({
          URL: connectedWallet.network.lcd,
          chainID: connectedWallet.network.chainID,
      })
    }, [connectedWallet])

    function connectTo(to) {
        if (to == 'extension') {
            wallet.connect(wallet.availableConnectTypes[1])
        } else if (to == 'mobile') {
            wallet.connect(wallet.availableConnectTypes[2])
        } else if (to == 'disconnect') {
            wallet.disconnect()
            dispatch({ type: 'setWallet', message: {} })
        }
        // setConnected(!connected)
    }

    async function contactBalance() {
      if (connectedWallet && connectedWallet.walletAddress && lcd) {
        //   setShowConnectOptions(false);
        dispatch({ type: 'setWallet', message: connectedWallet })

        let coins

        try {
            const api = new WasmAPI(lcd.apiRequester)
            coins = await lcd.bank.balance(connectedWallet.walletAddress)

        } catch (e) {
            console.log(e)
        }

        //Store coins global state
        dispatch({ type: 'setAllNativeCoins', message: coins })
        // console.log(coins)

        let uusd = coins.filter((c) => {
            return c.denom === 'uusd'
        })
        let ust = parseInt(uusd) / 1000000
        setBank(numeral(ust).format('0,0.00'))
        dispatch({ type: 'setUstBalance', message: ust })

        // connectTo("extension")
      } else {
        setBank(null)
        dispatch({ type: 'setWallet', message: {} })
      }
    }

    function returnBank() {
      return (
        <>
          <Wallet
            size={24}
            // color="#0F0038"
            color = 'white'
            style={{ display: 'inline-block', marginTop: '-3px' }}
          />{' '}
          {bank ? (
            <>
              <Check
                  size={16}
                  // color="#0F0038"
                  color = 'white'
                  weight="bold"
                  style={{
                      display: 'inline-block',
                      marginTop: '-8px',
                      marginLeft: '-5px',
                  }}
              />
            </>
          ) : (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </>
      )
    }

    const [scrolled, setScrolled] = React.useState(false)
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 25) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    useEffect(() => {
        if (connectedWallet) {
            contactBalance()
        }

        //console.log(connectedWallet)
        window.addEventListener('scroll', handleScroll)
    }, [
        connectedWallet,
        lcd,
    ])

    
    return (
      <>
        <div className="navbar-nav ms-auto" style={{flexDirection:'row'}}>
          {!connected && (
            <>
              <div className="btn-group" style={{width:'185px'}}>
                <button
                    className="btn btn-green nav-item dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    width="150px"
                    style={{color:'white', backGroundColor:'red', width:'100%', background: 'linear-gradient(180deg, rgba(254, 134, 0, 0.2) 0%, rgba(254, 134, 0, 0) 100%)', 
                    backdropFilter: 'blur(54px)', borderRadius:'30px'}}
                >
                  Connect Wallet +
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <button
                      onClick={() => connectTo('extension')}
                      className="dropdown-item"
                      style={{display:'flex', flexDirection:'row', alignItems:'center'}}
                  >
                    <CaretRight
                        size={16}
                    />{' '}
                    Terra Station (extension/mobile)
                  </button>
                  <button
                      onClick={() => connectTo('mobile')}
                      className="dropdown-item"
                      style={{display:'flex', flexDirection:'row', alignItems:'center'}}
                  >
                      <CaretRight
                          size={16}
                      />{' '}
                      Terra Station (mobile for desktop)
                  </button>
                </ul>
              </div>
            </>
          )}
          {connected && (
            <>
                {/* <button
                    className="btn btn-green nav-item dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                > */}
                <button
                    className="btn btn-green nav-item dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                    id="dropdownMenuButton1"
                    width="150px"
                    style={{color:'white', backGroundColor:'red', width:'100%', background: 'linear-gradient(180deg, rgba(254, 134, 0, 0.2) 0%, rgba(254, 134, 0, 0) 100%)', 
                    backdropFilter: 'blur(54px)', borderRadius:'30px'}}
                >
                    {returnBank() ? returnBank() : 'loading'}
                </button>
                <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton2"
                    style={{ top: '70px' }}
                >
                    {bank && (
                        <div
                            className="wallet-info d-inline-block text-start px-3"
                            style={{ fontSize: '13px' }}
                        >
                            <span className="d-block">
                                <strong>YOUR WALLET:</strong>
                            </span>
                            <span
                                className="d-block"
                                style={{ marginBottom: '-5px' }}
                            >
                                {bank}{' '}
                                <span className="text-sm">UST</span>
                            </span>
                        </div>
                    )}
                    <button
                        onClick={() => connectTo('disconnect')}
                        className="dropdown-item"
                    >
                        <Power
                            size={16}
                            style={{ marginTop: '-2px' }}
                        />{' '}
                        <span style={{ fontSize: '13px' }}>
                            Disconnect
                        </span>
                    </button>
                </ul>
            </>
          )}
        </div>
      </>
    )
}