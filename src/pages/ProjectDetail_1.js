import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import {chakra, Box, Flex, SimpleGrid, Text, Stack, Stat,StatNumber, StatLabel, Icon,Image,HStack, VStack} from "@chakra-ui/react";

import React, { useEffect, useState,  useCallback, useContext, useRef, useMemo } from 'react';
import { MdOutlinePlace } from "react-icons/md";
import {WasmAPI, LCDClient, } from '@terra-money/terra.js'
import { Router, Link } from '@reach/router'

import { BsArrowUpRight,BsBookmarksFill, BsBox, BsPerson, BsCashCoin } from "react-icons/bs"
import { ImageTransition, InputTransition, InputTransitiongrey } from "../components/ImageTransition";
import { useStore } from '../store'
import Notification from '../components/Notification'
import Footer from "../components/Footer"

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet =
        require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ProjectDetail() {
  const { state, dispatch } = useStore();
  const [totalBackedMoney, setTotalBackedMoney] = useState(0)

  //------------extract project id----------------------------
  let queryString, urlParams, project_id;
  if(typeof window != 'undefined'){
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    project_id = urlParams.get('project_id')
  }


  //------------connect wallet ---------------------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
      connectedWallet = useConnectedWallet()
  }

  //------------init api, lcd ----------------------------------------------------
  const lcd = useMemo(() => {
    if (!connectedWallet) {
        return null
    }
    return new LCDClient({
        URL: connectedWallet.network.lcd,
        chainID: connectedWallet.network.chainID,
    })
  }, [connectedWallet]);

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
  //------------fectch project data------------------------------------
  async function fetchContractQuery() 
  {
    let _project_id = 1;
    if(project_id != null)
      _project_id = project_id;

    
    try {
      const projectData = await api.contractQuery(
        state.WEFundContractAddress,
          {
              get_project: {
                project_id: `${_project_id}`
              },
          }
      )
      if(!projectData)
        return;

      dispatch({
          type: 'setOneprojectdata',
          message: projectData,
      })
  
      let i, j
      let totalBacked = 0;
      for(j=0; j<projectData.backer_states.length; j++){
          totalBacked += parseInt(projectData.backer_states[j].ust_amount.amount);
      }

      totalBacked /= 10**6;
      setTotalBackedMoney(totalBacked);
    } catch (e) {
        console.log(e)
    }
  };

  useEffect(() => {
      // console.log("in exploer project - fetchContractQuery");
      // if(connectedWallet){
        fetchContractQuery();
      // }
  }, [connectedWallet, lcd])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <div style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist-Regular', fontWeight:'500' }}>
        <div style={{backgroundImage:"url('/createproject_banner_emphasis.svg')", 
        boxShadow:"0px 5px 50px 0px #000000A6", width:'100%', zIndex:'10'}}>
        <div style={{backgroundImage:"url('/createproject_banner.svg')", width:'100%', width:'100%', zIndex:'11',backgroundPosition:'left', backgroundRepeat:'no-repeat', backgroundSize:'cover',zIndex:'11'}}>
          <Flex pt='64px' ml='100px' justify="left">
            <Text fontSize='16px' fontWeight='normal' color={'rgba(255, 255, 255, 0.54)'}>Home &gt;&nbsp;</Text>
            <Text fontSize='16px' fontWeight='normal' color={'rgba(255, 255, 255, 0.54)'}>Projects &gt;&nbsp;</Text>
            <Text fontSize='16px' color={'rgba(255, 255, 255, 0.84)'}>{state.oneprojectData.project_name}</Text>
          </Flex>
          <Flex mt='11px' ml={'100px'} pb='75px' mb="75px" justify='left'
            style={{fontFamily:'PilatExtended-Bold'}}>
            <Text fontSize='40px' fontWeight={'900'}>{state.oneprojectData.project_name}</Text>
          </Flex>
        </div>
        </div>
        <Flex width='100%' justify='center' mt='50px'>
          <Box style={{fontFamily:'Sk-Modernist-Regular'}} >
            
            {/* ------------Details------------ */}
            <Flex width='100%' justify='center' zIndex={'1'}>
              <HStack width={'100%'} alignContent={'center'} mb={'40px'} ml='100px' mr='100px'>
                <Flex width={'100%'}>
                  <VStack>
                    <Flex alignSelf={'flex-start'}>
                      <chakra.p color={"gray.100"} fontSize="15px">
                        Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                      </chakra.p>
                      <Icon as={MdOutlinePlace} h={6} w={6} mr={2} />

                      <chakra.h1 fontSize="sm">
                        {state.oneprojectData.project_category}
                      </chakra.h1>
                    </Flex>
                    <Flex mt={'75px'}>
                      {/* ------------Details on key factors, as SimpleGrid with 1 Col at base, and 4 when in medium res. Stack of Stats------------ */}
                      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
                        <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            shadow={'xl'}
                            border={'1px solid'}
                            borderColor={'gray.800'}
                            rounded={'lg'}>
                            <Flex justifyContent={'space-between'}>
                            <Box pl={{ base: 2, md: 4 }}>
                              <HStack>
                                <BsPerson size={'1em'} />
                                <StatLabel fontWeight={'medium'} isTruncated>
                                'Backer'
                                </StatLabel>
                              </HStack>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {totalBackedMoney}
                                </StatNumber>
                                
                            </Box>
                            
                            </Flex>
                        </Stat>
                        <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            shadow={'xl'}
                            border={'1px solid'}
                            borderColor={'gray.800'}
                            rounded={'lg'}>
                            <Flex justifyContent={'space-between'}>
                            <Box pl={{ base: 2, md: 4 }}>
                            <HStack>
                                <BsCashCoin size={'1em'} />
                                <StatLabel fontWeight={'medium'} isTruncated>
                                'Funding Pool'
                                </StatLabel>
                              </HStack>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {state.oneprojectData.project_collected}
                                </StatNumber>
                            </Box>
                            </Flex>
                        </Stat>
                        <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            shadow={'xl'}
                            border={'1px solid'}
                            borderColor={'gray.500'}
                            rounded={'lg'}>
                            <Flex justifyContent={'space-between'}>
                            <Box pl={{ base: 2, md: 4 }}>
                            <HStack>
                                <BsBookmarksFill size={'1em'} color="blue.200" />
                                <StatLabel fontWeight={'medium'} isTruncated>
                                'Category'
                                </StatLabel>
                              </HStack>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {state.oneprojectData.project_category}
                                </StatNumber>
                            </Box>
                            </Flex>
                        </Stat>
                        <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            shadow={'xl'}
                            border={'1px solid'}
                            borderColor={'gray.800'}
                            rounded={'lg'}>
                            <Flex justifyContent={'space-between'}>
                            <Box pl={{ base: 2, md: 4 }}>
                            <HStack>
                                <BsPerson size={'1em'} />
                                <StatLabel fontWeight={'medium'} isTruncated>
                                'Platform'
                                </StatLabel>
                              </HStack>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                Cardano
                                </StatNumber>
                            </Box>
                            </Flex>
                        </Stat>
                      </SimpleGrid>
                    </Flex>
                    <Flex mt="40px">
                      {/* ------------Description of Project------------ */}
                        <chakra.p py={2} color={"rgba(255, 255, 255, 0.84)"} fontSize= {"18px"} lineHeight={"150%"}>
                        {state.oneprojectData.project_description}
                          <br/><br/>
                        </chakra.p>
                    </Flex>
                    <Flex as={Stack}>
                      {/* ------------Descriptions on Founder of project------------ */}
                      <chakra.h1 color="white" fontWeight="900" fontSize="22px" fontFamily={'Pilat Extended'} mb="20px">
                        Project Founder Speaks
                      </chakra.h1>
                      <Box background="rgba(255, 255, 255, 0.05)" border="1.5px solid rgba(255, 255, 255, 0.15)" boxSizing="border-box" borderRadius="10px">
                        <Text fontSize={'18px'} fontWeight={'bold'}>Incredible Experience</Text>
                        <Text color= {"rgba(255, 255, 255, 0.54)"}>Aliquip mollit sunt qui irure. Irure ullamco Lorem excepteur dolor qui ea ad quis. 
                                Enim fugiat cillum enim ad occaecat sint qui elit labore mollit sunt laborum fugiat consequat. 
                                Voluptate labore sunt duis eu deserunt. Occaecat do ut ut labore cillum enim dolore ad enim enim id. 
                                Aliquip do veniam ad excepteur ad cillum qui deserunt nostrud sunt aliqua duis sunt occaecat. 
                                Laborum incididunt commodo ullamco proident quis.</Text>
                        <HStack border={"1.5px solid rgba(255, 255, 255, 0.15)"} spacing={10}>
                          <Image mt='23px' height='35px' objectFit='cover' src='/WeFund Logos only.png' alt='UST Avatar'/>
                          <VStack justify={'left'}> 
                            <Text>Founder Name</Text>
                            <Text>CEO</Text>
                          </VStack>
                        </HStack>
                      </Box>
                        
                    </Flex>
                  </VStack>
                </Flex>
                <Flex width={'300px'}>
                  <VStack>
                    <Flex 
                      my={"6px"}
                      mx={"6px"}
                      width="240px"
                      height="249px"
                      bg="#FFFFFF"
                      boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                      borderRadius={"2xl"}
                      justify={'center'}
                      >
              
                      {state.oneprojectData.project_icon && 
                        <Image 
                        src={state.request+"/download?filename="+ state.oneprojectData.project_icon} alt="avatar" />
                      }
                      {!state.oneprojectData.project_icon && 
                        <Image src="/sheep.svg" alt="avatar" />
                      }
                    </Flex>
                    <Flex >
                      <ImageTransition
                          unitid='visit'
                          border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                          background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                          border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                          background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                          border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                          background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                          selected={false}
                          width='240px' height='50px' rounded='33px'
                      >
                        <a href={state.oneprojectData.project_website}>
                        <Box variant="solid" color="white" justify='center' align='center'
                            onClick = {()=>{}} >
                          Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                        </Box>
                        </a>
                      </ImageTransition>
                  </Flex>
                  <Flex>
                    <ImageTransition 
                      unitid='view'
                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                      selected={false}
                      width='240px' height='50px' rounded='33px'
                    >
                      <Box variant="solid" color="white" justify='center' align='center'
                          onClick = {()=>{}} >
                        See Whitepaper
                      </Box>
                    </ImageTransition>
                  </Flex>
                  <Flex>
                    <ImageTransition 
                      unitid='back'
                      border1='linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)' 
                      background1='linear-gradient(180deg, #DEDBDB 0%, #DEDBDB  100%)'
                      border2='linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)'
                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                      border3="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                      selected={false}
                      width='240px' height='50px' rounded='33px'
                    >
                      <Link to={"/back?project_id=" + state.oneprojectData.project_id}>
                      <Box variant="solid" color="white" justify='center' align='center'
                          onClick = {()=>{}} >
                        Back {state.oneprojectData.project_name}
                      </Box>
                      </Link>
                    </ImageTransition>
                  </Flex>
                </VStack>
                </Flex>
              </HStack>
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