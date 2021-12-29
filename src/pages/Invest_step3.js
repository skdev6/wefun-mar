import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import {chakra, Box, Flex, Text, Input, InputGroup,  VStack, Image, InputLeftElement, Button
  } from "@chakra-ui/react";
import React, { useEffect, useState,  useCallback, useContext, useRef, } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { IoCheckbox,  IoCloudUploadOutline } from 'react-icons/io5';
import { navigate } from '@reach/router'

import { useStore } from '../store'
import { ImageTransition, ButtonTransition, InputTransition } from "../components/ImageTransition";
import Notification from '../components/Notification'

export default function Invest_step3() {
  const [signature, setSignature] = useState('');
  const [InsTitle, setInsTitle] = useState('');
  const [InsName, setInsName] = useState('');
  const [InsEmail, setInsEmail] = useState('');
  const {state, dispatch} = useStore();

  const canvasRef = useRef({});
  
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
    console.log(notification)
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
  //----------------upload signature----------------------------
  function openUpload(){
    if(typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      fileSelector.click();
    }
  }

  function onChangeSignature(e){
    if(typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      var fileName = fileSelector.value;
      setSignature(fileName.substr(fileName.lastIndexOf('\\')+1, fileName.length-1));
      dispatch({
        type: 'setInvestsignature',
        message: e.target.files[0],
      })

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        console.log(reader.result);
        canvasRef.current.fromDataURL(reader.result);
      };
      
    }    
  }
  //---------------on next------------------------------------

  function onNext(){
    dispatch({
      type: 'setInvestname',
      message: InsName,
    })
    dispatch({
      type: 'setInvestemail',
      message: InsEmail,
    })
    dispatch({
      type: 'setInvesttitle',
      message: InsTitle
    })

    const currentDate = new Date();

    let date = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + 
          "/" + currentDate.getFullYear();
    dispatch({
      type: 'setInvestDate',
      message: date,
    })
    
    var formData = new FormData();
    formData.append("investName", InsName);
    formData.append("investTitle", InsTitle);
    formData.append("investEmail", InsEmail);
    formData.append("investAmount", state.investAmount);
    formData.append("investDate", date);
    formData.append("investSignature", canvasRef.current.toDataURL());
    // formData.append("file", state.investSignature);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    showNotification("Uploading", 'success', 100000)

    fetch(state.request + '/pdfmake', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      hideNotification();
console.log("from server:");
console.log(data);
      dispatch({
        type: 'setPdffile',
        message: data.data,
      })
      navigate('/invest_step4');
    })
    .catch((e) =>{
      console.log("Error:"+e);
    })
  }

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
                <Text fontSize='22px' fontWeight={'300'}>Input your investment amount</Text>
            <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'}>Please enter your UST amount and we will convert the WFD amount for you</Text>
          </Flex>
          <Flex direction='row' mt='40px' justify="center">
            <Box w='100%'>
              <Flex justify="space-between">
                <Text mb='20px'>Name</Text>
              </Flex>
              <InputTransition 
                unitid='projectemail'
                selected={InsName==''?false:true}
                width='100%' height='55px' rounded='md' width='290px'
              >      
                <InputGroup size="sm" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                  <InputLeftElement style={{background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                  <Input style={{ }} type="text" h='55px'placeholder="Type Name" focusBorderColor="purple.800" rounded="md"  value={InsName} onChange={(e)=>{setInsName(e.target.value)}} />
                </InputGroup>
              </InputTransition>
            </Box>
            <Box ml='20px' w='100%'>
              <Flex justify="space-between">
                <Text mb='20px'>Title</Text>
              </Flex>
              <InputTransition 
                unitid='projectemail'
                selected={InsTitle==''?false:true}
                width='100%' height='55px' rounded='md' width='290px'
              >      
                <InputGroup size="sm" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                  <InputLeftElement style={{background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                  <Input style={{ }} type="text" h='55px'placeholder="Your title" focusBorderColor="purple.800" rounded="md"  value={InsTitle} onChange={(e)=>{setInsTitle(e.target.value)}} />
                </InputGroup>
              </InputTransition>
            </Box>
          </Flex>
          
          <Flex direction='row' mt='40px' justify="center">
            <Box w='100%'>
              <Flex justify="space-between">
                <Text mb='20px'>Email</Text>
              </Flex>
              <InputTransition 
                unitid='projectemail'
                selected={InsEmail==''?false:true}
                width='100%' height='55px' rounded='md' width='290px'
              >      
                <InputGroup size="sm" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                  <InputLeftElement style={{background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                  <Input style={{ }} type="email" h='55px'placeholder="example@email.com" focusBorderColor="purple.800" rounded="md"  value={InsEmail} onChange={(e)=>{setInsEmail(e.target.value)}} />
                </InputGroup>
              </InputTransition>
            </Box>
            <Box ml='20px' w='100%'>
              <Flex justify="space-between">
                <Text mb='20px'>Signature</Text>
              </Flex>
              <Box>
                <Flex justify = 'center' w='300px' rounded="md" bg='white' >
                  <SignatureCanvas ref={canvasRef} penColor='black'
                    canvasProps={{width: 300, height: 100}}/>
                </Flex>
                <Flex style={{cursor:'pointer'}} mt='20px' justify='left' fontSize='14px'>
                  <ButtonTransition unitid="clear"
                    selected={false}
                    width='100px' height='40px' rounded='20px'
                  >
                    <Box onClick={()=>{canvasRef.current.clear()}}>Clear</Box>
                  </ButtonTransition>
                  <ButtonTransition unitid="Open Signature"
                    selected={false}
                    width='150px' height='40px' rounded='20px' ml='40px'
                  >
                    <Box onClick={()=>openUpload()}>Open Signature</Box>
                  </ButtonTransition>
                </Flex>
              </Box>
              <input type='file' id="fileSelector" name='userFile' style={{display:'none'}}
                onChange={(e)=>onChangeSignature(e)}/>
              {/* 
              {signature == '' && 
                <InputGroup size="sm" width='290px'>
                  <InputLeftElement width='290px' h='55px' pointerEvents='none' children={<IoCloudUploadOutline color='#00A3FF' width='30px' height='30px'/>} />
                  <Input type="text" h='55px' bg='#FFFFFF' borderColor="#FFFFFF33" placeholder="Upload here" focusBorderColor="purple.800"  rounded="md"  
                  onClick={()=>{openUpload()}}  /> 
                </InputGroup>}
              {signature != '' && 
                <InputGroup size="sm" width='290px'>
                  <InputLeftElement h='55px' pointerEvents='none' children={<IoCheckbox color='00A3FF'  width='30px' height='30px' />} />
                  <Input type="text" h='55px' bg='#FFFFFF' borderColor="#FFFFFF33" placeholder={signature} focusBorderColor="purple.800"  rounded="md"  
                  onClick={()=>{openUpload()}} /> 
                </InputGroup>}
               */}
            </Box>
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
                onClick={()=>onNext()}
              >
                Submit
              </Box>
            </ImageTransition>
          </Flex>
           {/* -----------------------sroadmap-------------------------------- */}
          
           <Flex pb='75px' mb="20px" justify='center'
            style={{fontFamily:'PilatExtended-Bold'}}>
              <VStack>
                <Flex>
                  <Text fontSize='22px'>Our Funding&nbsp;</Text>
                  <Text fontSize='22px' color='#4790f5'>Approach</Text>
                </Flex>
                <Flex>
                  <Image alignSelf={'center'} alt={'Wefund'} src={ 'saftroadmap.svg' } />
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