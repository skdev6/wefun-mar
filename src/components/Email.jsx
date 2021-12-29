import React from 'react';

import { Image, Text, Flex, Box } from '@chakra-ui/react';
import { ButtonTransition } from '../components/ImageTransition';

export default function Email() {
  return (
    <Flex
      w="100%"
      h="600px"
      mt="150px"
      alignItems="center"
      position="relative"
      flexDirection="column"
      justifyContent="center"
    >
      <Image src="/EmailBg.png" className="EmailBg" />
      <Flex id="emailInnerBox">
        <Flex flexDirection="column" textAlign="center">
          <Text
            fontFamily="PilatExtended-Regular"
            fontWeight="400"
            fontSize="22px"
          >
            GET IN WEFUND
          </Text>

          <Text
            fontFamily="PilatExtended-Regular"
            fontWeight="700"
            fontSize="35px"
            mt="10px"
          >
            Grow With Us Now
          </Text>
        </Flex>
        <Flex justify="center">
          <ButtonTransition
            unitid="investinwefund"
            selected={false}
            width="210px"
            height="50px"
            rounded="100px"
          >
            <Flex direction="row">
              Invest in WeFund
              <Image ml="10px" alt="startfunding" src="/investface.svg" />
            </Flex>
          </ButtonTransition>
        </Flex>
      </Flex>
    </Flex>
  );
}
