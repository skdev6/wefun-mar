import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function Roadmaps() {
  return (
    <Flex
      w="100%"
      pt="47px"
      mt="117px"
      justify="center"
      direction="column"
      alignItems="center"
    >
      <Flex w="85%" direction="column" fontFamily="Sk-Modernist-Regular">
        <Text
          fontFamily="PilatExtended-Regular"
          fontWeight="400"
          fontSize="22px"
        >
          RoadMap
        </Text>
        <Flex
          mt="15px"
          mb="100px"
          direction="row"
          fontFamily="PilatExtended-Regular"
          fontWeight="700"
          fontSize="35px"
        >
          <Text color="#00A3FF">WeFund&nbsp;</Text>
          <Text>Technical RoadMap</Text>
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Timeline className="timeline" />
          <Flex
            id="sphere"
            position="relative"
            style={{ transition: 'transform 0.5s' }}
          >
            <Image alt={'Wefund'} src="/sphere.svg" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

const Timeline = () => {
  return (
    <div className="wrapper">
      <div id="timeline1" className="timeline" />
      <div className="circleWrapper">
        <div id="circle1" className="circle">
          1
        </div>
        <div className="message">
          Make running the platform with the basic functionality, create a
          project, back a project and stak the amount in Anchor, project done
          and project fail + yield transfer, will be done in December 2021
        </div>
      </div>
      <div id="timeline2" className="timeline" />
      <div className="circleWrapper">
        <div id="circle2" className="circle">
          2
        </div>
        <div className="message">
          Set up the Core Team, in terms of knowledge, responsability, team
          management and following the same vision, will be done in December
          2021
        </div>
      </div>
      <div id="timeline3" className="timeline" />
      <div className="circleWrapper">
        <div id="circle3" className="circle">
          3
        </div>
        <div className="message">
          Whitepaper 2.0, will be done in December 2021
        </div>
      </div>
      <div id="timeline4" className="timeline" />
      <div className="circleWrapper">
        <div id="circle4" className="circle">
          4
        </div>
        <div className="message">
          Set up the tokenomics, the date for closing the seed, when and how
          long for the Pre Sale and understand what kind of IDO we want to apply
          and when, will be done in January 2022
        </div>
      </div>
      <div id="timeline5" className="timeline" />
      <div className="circleWrapper">
        <div id="circle5" className="circle">
          5
        </div>
        <div className="message">
          Have full functionality platform with all the function mentioned on
          the Whitepaper2.0, on the TGE
        </div>
      </div>
      <div id="timeline6" className="timeline" />
      <div className="circleWrapper">
        <div id="circle6" className="circle">
          6
        </div>
        <div className="message">
          Have full functionality platform with all the function mentioned on
          the Whitepaper2.0, on the TGE
        </div>
      </div>
    </div>
  );
};
