import { ChakraProvider } from "@chakra-ui/react";
import {StdFee, MsgExecuteContract, WasmAPI, LCDClient } from '@terra-money/terra.js'
import { Box, Flex, Text, Input, InputGroup, InputRightElement, Img } from "@chakra-ui/react";
import React, { useEffect, useState,  useCallback, useContext, useRef, } from 'react';
import { IoChevronUpOutline, IoChevronDownOutline, IoCheckmark } from 'react-icons/io5';
import { ButtonTransition, InputTransition, InputTransitiongrey } from "../components/ImageTransition";
import theme from '../theme';
import Footer from "../components/Footer"
import { useStore } from '../store'
import Notification from '../components/Notification'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet =
        require('@terra-money/wallet-provider').useConnectedWallet
}

export default function BackProject() {
  const { state, dispatch } = useStore();
  const [condition, setCondition] = useState(false);
  const [backAmount, setBackAmount] = useState('');
  const [wfdAmount, setWfdamount] = useState('');

  const [blog1, setBlog1] = useState(false);
  const [blog2, setBlog2] = useState(false);
  const [blog3, setBlog3] = useState(false);
  const [blog4, setBlog4] = useState(false);
  const [blog5, setBlog5] = useState(false);

//----------extract project id------------------------------------------
  let queryString, urlParams, project_id;
  if(typeof window != 'undefined'){
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    project_id = urlParams.get('project_id')
  }
//-----------connect wallet and init lcd api ---------------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
      connectedWallet = useConnectedWallet()
  }
  const api = new WasmAPI(state.lcd_client.apiRequester);

//------------notification setting---------------------------------
  const [notification, setNotification] = useState({
    type: 'success',
    message: '',
    show: false,
  })

  function hideNotification() {
    setNotification({
        message: notification.message,
        type: notification.type,
        show: false,
    })
  }

  function showNotification(message, type, duration) {
    // console.log('fired notification')
    setNotification({
        message: message,
        type: type,
        show: true,
    });
    console.log(message + type + duration);
    // Disable after $var seconds
    setTimeout(() => {
        setNotification({
            message: message,
            type: type,
            show: false,
        })
        // console.log('disabled',notification)
    }, duration)
  }
//----------------------change Amount--------------------------
  function changeAmount(e)
  {
    setBackAmount(e.target.value);
    let amount = parseInt(e.target.value) *5 / 100;
    if(amount > 0)
      setWfdamount(amount);
    else
      setWfdamount('');
  }
//---------------------back project-----------------------------
  async function backProject()
  {
    if(connectedWallet == '' || typeof connectedWallet == 'undefined'){
      showNotification("Please connect wallet first!", 'error', 6000);
      return;
    }
console.log(connectedWallet);
    let _project_id = 1;
    if(project_id != null)
      _project_id = project_id;

    const projectData = await api.contractQuery(
      state.WEFundContractAddress,
        {
            get_project: {
              project_id: `${_project_id}`
            },
        }
    )

    if(projectData == ''){
      showNotification("Can't fetch Project Data", 'error', 6000);
      return;
    }

    if(projectData.project_needback == false){
      showNotification("Project already collected! You can't back", 'error', 6000);
      return;
    }

    let wefundContractAddress = state.WEFundContractAddress;

    const obj = new StdFee(10_000, { uusd: 4500})
    let BackProjectMsg = {
        back2_project: {
          backer_wallet: connectedWallet.walletAddress,
          project_id: `${_project_id}`
        },
    }

    let amount = parseInt(backAmount * 1000000 * 105 / 100);
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      BackProjectMsg,
      {uusd: amount}
    )

    await connectedWallet
      .post({
          msgs: [msg],
          // fee: obj,
          gasPrices: obj.gasPrices(),
          gasAdjustment: 1.7,
      })
      .then((e) => {
          if (e.success) {
            showNotification('Back to Project Success', 'success', 4000);
          } else {
              showNotification(e.message, 'error', 4000)
          }
      })
      .catch((e) => {
          showNotification(e.message, 'error', 4000)
      })
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <div style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist-Regular', fontWeight:'500' }}>
        <div style={{backgroundImage:"url('/createproject_banner_emphasis.svg')", 
        boxShadow:"0px 5px 50px 0px #000000A6", width:'100%', zIndex:'10'}}>
        <div style={{backgroundImage:"url('/createproject_banner.svg')", width:'100%', width:'100%', zIndex:'11',backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover',zIndex:'11'}}>
          <Flex pt='95px' justify="center">
            <Text fontSize='16px' fontWeight='normal' color={'rgba(255, 255, 255, 0.54)'}>Home &gt;&nbsp;</Text>
            <Text fontSize='16px' color={'rgba(255, 255, 255, 0.84)'}>Back the Project</Text>
          </Flex>
          <Flex mt='11px' pb='150px' justify='center'
            style={{fontFamily:'PilatExtended-Bold'}}>
            <Text fontSize='40px' fontWeight={'900'}>Contribute to&nbsp;</Text>
            <Text fontSize='40px' color='#4790f5' fontWeight={'900'}>Project Pool</Text>
          </Flex>
        </div>
        </div>
        <Flex width='100%' justify='center' px='175px' mt='0px'>
        <Box width='900px' bg='#FFFFFF0D' px='50px' style={{fontFamily:'Sk-Modernist'}} >
          <Flex mt='83px' justify='center' align='center' direction='column'
            style={{fontFamily:'PilatExtended-Regular'}}>
            <Text fontSize='22px' fontWeight={'300'}>
              Back the Project</Text>
            <Text fontSize='28px' color='#4790f5' fontWeight={'bold'}>
              {state.oneprojectData.project_name}
            </Text>
          </Flex>
          {/* --------amount to back----------- */}
          <Flex mt='83px' justify='center' align='center' direction='column'>
          <Flex alignSelf={'flex-start'} marginLeft={'25%'}>
                <Text mb='20px'>Select Tokens and Entry Amount to back</Text>
              </Flex>
          <InputTransition 
            unitid='backamount'
            selected={backAmount==''?false:true}
            width='380px' height='55px' rounded='md' mb='42px'
          >      
            <InputGroup size="sm" style={{border:'0', background: 'rgba(255, 255, 255, 0.05)'}}>
              <Input type="text"  h='55px' style={{border:'0', background:'transparent',  paddingLeft:'25px'}} placeholder="Type here" focusBorderColor="purple.800" rounded="md"  value={backAmount} 
              onChange={(e)=>changeAmount(e)}/>
              <InputRightElement w='60px'  h='55px' pointerEvents='none' children={<Text>UST</Text>} 
              />          
            </InputGroup>
          </InputTransition>
          <Flex alignSelf={'flex-start'} marginLeft={'25%'}>
              <Text mb='20px' >WFD Fees</Text>
              </Flex>
          <InputTransition 
            unitid='WFDamount'
            selected={backAmount==''?false:true}
            width='380px' height='55px' rounded='md'
          >      
            <InputGroup size="sm" style={{border:'0', background:'rgba(255, 255, 255, 0.05)'}}>
              <Input type="text"  h='55px' style={{border:'0', background:'transparent', paddingLeft:'25px'}} placeholder="Type here" focusBorderColor="purple.800" rounded="md"  value={wfdAmount}
              onChange={(e)=>{}} />
              <InputRightElement w='60px' h='55px' pointerEvents='none' children={<Text>WFD</Text>} 
              />          
            </InputGroup>
          </InputTransition>

          <Flex mt='25px' direction="row">
            {/* <Input type="checkbox"  h='55px' bg='#FFFFFF0D' borderColor="#FFFFFF33" placeholder="Type here" focusBorderColor="purple.800" rounded="md"  onChange={(e)=>{}} /> */}
            <InputTransition 
              unitid='conditioncheck'
              selected={false}
              width='24px' height='24px' rounded='md'
              onClick={()=>{setCondition(!condition)}}
            >
              {condition &&
              <IoCheckmark width='24px' height='24px' color='#FE8600'></IoCheckmark>
              }
            </InputTransition>

            <Text ml='10px' fontSize='14px' fontWeight='400'>I agree will all condition of this Project and WeFund</Text>
          </Flex>
          </Flex>
          {/* -----------------Back Project----------------- */}
          <Flex w='100%' mt='60px'justify='center' mb='170px'>
            <ButtonTransition 
              unitid='backproject'
              selected={false}
              width='200px' height='50px' rounded='33px'
            >
              <Box variant="solid" color="white" justify='center' align='center'
                  onClick = {()=>backProject()} >
                Back Project
              </Box>
            </ButtonTransition>
          </Flex>
          {/* -----------------------space line-------------------------------- */}
          <Img mt='102px' height='1px' objectFit='cover' src='/line.svg' alt='UST Avatar'/>

          {/* ---------------------------blog------------------------------ */}

          <Flex fontSize='15px' w='100%' direction='column' fontWeight='500' justify='center'>
            <Flex mt='37px' fontFamily='PilatExtended-Bold' fontSize='22px' justify='center'>FAQ</Flex>
             <InputTransitiongrey 
              unitid='wefundabout'
              selected={blog1} onClick={()=>{setBlog1(!blog1)}}
              width='100%' height={blog1?'250px':'55px'} rounded='md' mt='25px'
            >
              <Flex direction='column' w='100%'  >
                  <Flex justify="space-between" align='center'  w='100%' h='55px'>
                    <Box ml='25px' ><Text>What is WeFund About?</Text></Box>
                    <Box mr='25px'>
                      {blog1 && <IoChevronUpOutline />}
                      {!blog1 && <IoChevronDownOutline/>}
                    </Box>
                  </Flex>
                  {blog1 && 
                  <>
                    <Img mt='17px' mx='35px' height='1px' objectFit='cover' src='/line.svg' alt='UST Avatar'/>
                    <Text fontSize='15px' mt='17px' mb='22px' px='25px' fontWeight='400' w='100%' h='auto'>
                      WFD Tokens will be used to operate WeFund Platforms. Projects for example converts 1% of their funding into WFD tokens. WFD Tokens also used as governance tokens for voting and govern the project trajectory.
                    </Text>
                  </>}
              </Flex>
            </InputTransitiongrey>             
            <InputTransitiongrey 
              unitid='howback'
              selected={blog2} onClick={()=>{setBlog2(!blog2)}}
              width='100%' height={blog2?'250px':'55px'} rounded='md' mt='25px'
            >
              <Flex direction='column' w='100%'>
                  <Flex justify="space-between" align='center'  w='100%' h='55px'>
                    <Box ml='25px'><Text>How does one back a Project?</Text></Box>
                    <Box mr='25px'>
                      {blog2 && <IoChevronUpOutline />}
                      {!blog2 && <IoChevronDownOutline/>}
                    </Box>
                  </Flex>
                  {blog2 && 
                  <>
                    <Img mt='17px' mx='35px' height='1px' objectFit='cover' src='/line.svg' alt='UST Avatar'/>
                    <Text fontSize='15px' mt='17px' mb='22px' px='25px' fontWeight='400' w='100%' h='auto'>
                      WFD Tokens will be used to operate WeFund Platforms. Projects for example converts 1% of their funding into WFD tokens. WFD Tokens also used as governance tokens for voting and govern the project trajectory.
                    </Text>
                  </>}
              </Flex>
            </InputTransitiongrey> 
            <InputTransitiongrey 
              unitid='backerget'
              selected={blog3} onClick={()=>{setBlog3(!blog3)}}
              width='100%' height={blog3?'250px':'55px'} rounded='md' mt='25px'
            >
              <Flex direction='column' w='100%'>
                  <Flex justify="space-between" align='center'  w='100%' h='55px'>
                    <Box ml='25px'><Text>What do backer get?</Text></Box>
                    <Box mr='25px'>
                      {blog3 && <IoChevronUpOutline />}
                      {!blog3 && <IoChevronDownOutline/>}
                    </Box>
                  </Flex>
                  {blog3 && 
                  <>
                    <Img mt='17px' mx='35px' height='1px' objectFit='cover' src='/line.svg' alt='UST Avatar'/>
                    <Text fontSize='15px' mt='17px' mb='22px' px='25px' fontWeight='400' w='100%' h='auto'>
                      WFD Tokens will be used to operate WeFund Platforms. Projects for example converts 1% of their funding into WFD tokens. WFD Tokens also used as governance tokens for voting and govern the project trajectory.
                    </Text>
                  </>}
              </Flex>
            </InputTransitiongrey>            
            <InputTransitiongrey 
              unitid='ustothertoken'
              selected={blog4} onClick={()=>{setBlog4(!blog4)}}
              width='100%' height={blog4?'250px':'55px'} rounded='md' mt='25px'
            >
              <Flex direction='column' w='100%'>
                  <Flex justify="space-between" align='center'  w='100%' h='55px'>
                    <Box ml='25px'><Text>What my UST or other tokens will be used for?</Text></Box>
                    <Box mr='25px'>
                      {blog4 && <IoChevronUpOutline />}
                      {!blog4 && <IoChevronDownOutline/>}
                    </Box>
                  </Flex>
                  {blog4 && 
                  <>
                    <Img mt='17px' mx='35px' height='1px' objectFit='cover' src='/line.svg' alt='UST Avatar'/>
                    <Text fontSize='15px' mt='17px' mb='22px' px='25px' fontWeight='400' w='100%' h='auto'>
                      WFD Tokens will be used to operate WeFund Platforms. Projects for example converts 1% of their funding into WFD tokens. WFD Tokens also used as governance tokens for voting and govern the project trajectory.
                    </Text>
                  </>}
              </Flex>
            </InputTransitiongrey>
            <InputTransitiongrey 
              unitid='whatwfdfee'
              selected={blog5} onClick={()=>{setBlog5(!blog5)}}
              width='100%' height={blog5?'250px':'55px'} rounded='md' mt='25px' mb='210px'
            >
              <Flex direction='column' w='100%'>
                  <Flex justify="space-between" align='center'  w='100%' h='55px'>
                    <Box ml='25px'><Text>What is WFD Fees?</Text></Box>
                    <Box mr='25px'>
                      {blog5 && <IoChevronUpOutline />}
                      {!blog5 && <IoChevronDownOutline/>}
                    </Box>
                  </Flex>
                  {blog5 && 
                  <>
                    <Img mt='17px' mx='35px' height='1px' objectFit='cover' src='/line.svg' alt='UST Avatar'/>
                    <Text fontSize='15px' mt='17px' mb='22px' px='25px' fontWeight='400' w='100%' h='auto'>
                      WFD Tokens will be used to operate WeFund Platforms. Projects for example converts 1% of their funding into WFD tokens. WFD Tokens also used as governance tokens for voting and govern the project trajectory.
                    </Text>
                  </>}
              </Flex>
            </InputTransitiongrey>
          </Flex>
        </Box>
        </Flex>
        <Footer/>
        <Notification
            notification={notification}
            close={() => hideNotification()}
        />
      </div>
    </ChakraProvider>
  )
}