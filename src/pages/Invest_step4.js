import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import {Box, Flex, Text,Table,Thead,Tbody,Tr,Th,Td,TableCaption, VStack,Image, HStack, Img
  } from "@chakra-ui/react";
import React, { useEffect, useState,  useCallback, useContext, useRef, } from 'react';
import { IoChevronUpOutline, IoChevronDownOutline, IoCheckmark } from 'react-icons/io5';
import { navigate } from "@reach/router";
// import download from "js-file-download";
// import { post, get } from "axios";

import { useStore } from '../store'
import { ImageTransition, ButtonTransition } from "../components/ImageTransition";
import Notification from '../components/Notification'

export default function Invest_step4() {
  const {state, dispatch} = useStore();

  //---------------notification setting---------------------------------
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
    })
    // console.log(notification)
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
  
  function download_pdf(){
    showNotification("Downloading", "success", 10000);

    window.URL = window.URL || window.webkitURL;

    var xhr = new XMLHttpRequest(),
          a = document.createElement('a'), file;

    xhr.open('GET', state.request + '/download_pdf?filename='+state.pdfFile, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        file = new Blob([xhr.response], { type : 'application/octet-stream' });
        a.href = window.URL.createObjectURL(file);
        a.download = 'confirm.pdf';
        a.click();
    };
    xhr.send();

    // hideNotification();
  }

  useEffect(() => {
    download_pdf();
  }, [])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <div style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist-Regular', fontWeight:'500' }}>
        <div style={{backgroundImage:"url('/createproject_banner_emphasis.svg')", 
        boxShadow:"0px 5px 50px 0px #000000A6", width:'100%', zIndex:'10'}}>
        <div style={{backgroundImage:"url('/createproject_banner.svg')", width:'100%', width:'100%', zIndex:'11',backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover',zIndex:'11'}}>
          <Flex pt='64px' justify="center">
            <Text fontSize='16px' fontWeight='normal' color={'rgba(255, 255, 255, 0.54)'}>Home &gt;&nbsp;</Text>
            <Text fontSize='16px' color={'rgba(255, 255, 255, 0.84)'}>Back the Project</Text>
          </Flex>
          <Flex mt='11px' pb='75px' mb="20px" justify='center'
            style={{fontFamily:'PilatExtended-Bold'}}>
            <Text fontSize='40px' color='#4790f5'>Invest</Text>
            <Text fontSize='40px'>&nbsp;in WeFund</Text>
          </Flex>
        </div>
        </div>
        <Flex width='100%' justify='center' mt='-80px' px='175px'>
        <Box width='900px' bg='#FFFFFF0D' px='50px' style={{fontFamily:'Sk-Modernist-Regular'}} >
          <Flex mt='83px' justify='center' align='center' direction='column'
            style={{fontFamily:'PilatExtended-Regular'}}>
            <HStack>
              <Text fontSize='22px' fontWeight={'300'}>
                <Image src={ 'popperleft.svg' } />
                Congratulations 
                <Image src={ 'popperright.svg' } />
              </Text>
            </HStack>
            <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} maxWidth={'500px'} justifyContent={'center'}>
              You have invested in WeFund. For more update, please get in touch with us. We will confirm your investment status via email. 
            </Text>
          </Flex>
          {/* --------amount to back----------- */}
          <Flex mt='83px' justify='center' align='center' direction='column'>
          <Text fontSize='16px' fontWeight={'300'}>Transaction History</Text>
          <Table variant='simple'>
            <TableCaption>
              Your download has been procced automatically. Do you want to download again? Click on <Text color={'#F83600'}>Download</Text>
            </TableCaption>
            <Thead bgColor={'rgba(255, 255, 255, 0.12)'} borderRadius={'10px 10px 0px 0px'}>
              <Tr>
                <Th isNumeric>Date</Th>
                <Th isNumeric>UST You Invested</Th>
                <Th isNumeric>WFD You Get</Th>
                <Th >SAFT Details</Th>
              </Tr>
            </Thead>
            <Tbody bgColor={' rgba(196, 196, 196, 0.08)'} borderRadius={'10px 10px 0px 0px'}> 
              <Tr>
                <Td isNumeric>{state.investDate}</Td>
                <Td isNumeric borderLeft={'1px solid rgba(255, 255, 255, 0.1)'} borderRight={'1px solid rgba(255, 255, 255, 0.1)'}>{state.investAmount}</Td>
                <Td isNumeric borderLeft={'1px solid rgba(255, 255, 255, 0.1)'} borderRight={'1px solid rgba(255, 255, 255, 0.1)'}>{state.investWfdamount}</Td>
                <Td cursor='pointer'>
                  {/* <a href={state.request+"/download_pdf?filename=" + state.pdfFile} 
                      download="confirm.pdf"> */}
                  <a onClick={()=>{download_pdf()}}>
                    <Text color={'#F83600'}>Download</Text>
                  </a>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          </Flex>
          {/* -----------------Back Project----------------- */}
          <Flex w='100%' mt='60px'justify='center' mb='170px'>
            <ImageTransition 
              unitid='submit'
              border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
              background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
              border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
              background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
              border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
              selected={false}
              width='200px' height='50px' rounded='33px'
            >
              <Box variant="solid" color="white" justify='center' align='center'
                  onClick = {()=>{navigate('/')}} >
                Go Home
              </Box>
            </ImageTransition>
          </Flex>
          
          {/* -----------------------sroadmap-------------------------------- */}
          
          <Flex pb='75px' mb="20px" justify='center' style={{fontFamily:'PilatExtended-Bold'}}>
            <VStack>
              <Flex>
                <Text fontSize='22px'>Our Funding&nbsp;</Text>
                <Text fontSize='22px' color='#4790f5'>Approach</Text>
              </Flex>
              <Flex>
                <Image
                  alignSelf={'center'}
                    alt={'Wefund'}
                    src={
                      'saftroadmap.svg'
                    }
                  />
              </Flex>  
            </VStack>
          </Flex>
        </Box>
        </Flex>
        <Notification
            notification={notification}
            close={() => hideNotification()}
        />
      </div>
    </ChakraProvider>
  )
}