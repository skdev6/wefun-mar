import React, { useState } from 'react';
import { Image, Flex, Text, Box } from '@chakra-ui/react';
import { ButtonTransition } from '../components/ImageTransition';

export default function Industry() {
  const [choice, setChoice] = useState(1);

  return (
    <Flex
      mt="50px"
      pt="47px"
      pb="47px"
      width="100%"
      bg="#351939"
      justify="center"
      alignItems="center"
      flexDirection="column"
      fontFamily="Sk-Modernist-Regular"
    >
      <Flex
        width="85%"
        direction="row"
        fontSize="35px"
        fontWeight="bolder"
        fontFamily="PilatExtended-Regular"
      >
        <Text color="#00A3FF">WeFund&nbsp;</Text>
        <Text>Supports All</Text>
      </Flex>
      <Flex
        direction="row"
        mt="45px"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        {/* ----------crypto startup industry--------------- */}
        <Box
          w="17%"
          h="165px"
          bg="#FFFFFF0D"
          borderRadius="10% 0 0 0"
          style={{ borderBottomWidth: choice == 0 ? '3px' : '0px' }}
          onClick={() => setChoice(0)}
        >
          <a href="#Crypto Project">
            <Flex ml="15px" h="90px" align="center">
              <Image alt="Crypto Industry" src="/CryptoIndustry.svg" h="90px" />
            </Flex>
            <Box ml="15px">
              <Text mt="14px" fontSize="15px" fontWeight="700">
                Crypto-Startup Industry
              </Text>
              <Text fontSize="12px" fontWeight="700" color="#2AC54D">
                Ongoing
              </Text>
            </Box>
          </a>
        </Box>
        {/* --------------Gaming industry-------------------------- */}
        <Box
          w="17%"
          h="165px"
          bg="#FFFFFF14"
          style={{ borderBottomWidth: choice == 1 ? '3px' : '0px' }}
          onClick={() => setChoice(1)}
        >
          <a href="#GamingIndustry">
            <Flex ml="15px" h="90px" align="center">
              <Image alt="Crypto Industry" src="/GamingIndustry.svg" h="90px" />
            </Flex>
            <Box ml="15px">
              <Text mt="14px" fontSize="15px" fontWeight="700">
                Gaming Industry
              </Text>
              <Text fontSize="12px" fontWeight="700" color="#FE8600">
                Coming soon
              </Text>
            </Box>
          </a>
        </Box>
        {/* --------------Creatie industry------------------ */}
        <Box
          w="17%"
          h="165px"
          bg="#FFFFFF0D"
          onClick={() => setChoice(2)}
          style={{ borderBottomWidth: choice == 2 ? '3px' : '0px' }}
        >
          <a href="#CreativeProject">
            <Flex ml="15px" h="90px" align="center">
              <Image
                alt="Crypto Industry"
                src="/CreativeIndustry.svg"
                h="90px"
              />
            </Flex>
            <Box ml="15px">
              <Text mt="14px" fontSize="15px" fontWeight="700">
                Creative Industry
              </Text>
              <Text fontSize="12px" fontWeight="700" color="#FE8600">
                Coming soon
              </Text>
            </Box>
          </a>
        </Box>
        {/* ------------------sports industry------------------- */}
        <Box
          w="17%"
          h="165px"
          bg="#FFFFFF14"
          style={{ borderBottomWidth: choice == 3 ? '3px' : '0px' }}
          onClick={() => setChoice(3)}
        >
          <a href="#SportsIndustry">
            <Flex ml="15px" h="90px" align="center">
              <Image alt="Crypto Industry" src="/SportsIndustry.svg" h="90px" />
            </Flex>
            <Box ml="15px">
              <Text mt="14px" fontSize="15px" fontWeight="700">
                Sports Industry
              </Text>
              <Text fontSize="12px" fontWeight="700" color="#FE8600">
                Coming soon
              </Text>
            </Box>
          </a>
        </Box>
        {/* ------------------Real Estate industry------------------- */}
        <Box
          w="17%"
          h="165px"
          blur="5%"
          bg="#FFFFFF0D"
          borderRadius="0 10% 0 0"
          style={{ borderBottomWidth: choice == 4 ? '3px' : '0px' }}
          onClick={() => setChoice(4)}
        >
          <a href="#RealEstateIndustry">
            <Flex ml="15px" h="90px" align="center">
              <Image alt="Crypto Industry" src="/RealIndustry.svg" h="90px" />
            </Flex>
            <Box ml="15px">
              <Text mt="14px" fontSize="15px" fontWeight="700">
                Real Estate Industry
              </Text>
              <Text fontSize="12px" fontWeight="700" color="#FE8600">
                Coming soon
              </Text>
            </Box>
          </a>
        </Box>
      </Flex>
      <Flex mt="70px" w="86%">
        <Flex
          id="projectpad"
          direction="column"
          position="relative"
          style={{ transition: 'transform 1s' }}
        >
          {PROJECT_ITEMS.map((projectItem, index) => {
            const isOdd = index % 2 == 1;
            return (
              <Flex
                key={index}
                id={projectItem.id}
                className="PROJECT_ITEMS_ROW"
                direction={isOdd ? 'row' : 'row-reverse'}
              >
                <Flex className="projectItemContentCol">
                  <Box>
                    <Text
                      fontFamily="PilatExtended-Regular"
                      fontWeight="300"
                      color="#FFFFFF8A"
                      className="projectLabel"
                    >
                      -{projectItem.label}
                    </Text>
                    <Text
                      fontFamily="PilatExtended-Regular"
                      className="projectTitle"
                    >
                      {projectItem.title}
                    </Text>
                    <Text
                      fontFamily="Sk-Modernist-Regular"
                      fontWeight="700"
                      color="#FE8600"
                      fontSize="18px"
                      margin="10px 0"
                    >
                      {projectItem.state}
                    </Text>
                    <Text
                      fontFamily="Sk-Modernist-Regular"
                      fontWeight="400"
                      fontSize="18px"
                      className="projectDesc"
                    >
                      {projectItem.description}
                    </Text>
                  </Box>
                  <ButtonTransition
                    unitid={'cryptofunding' + index}
                    selected={false}
                    width="192px"
                    height="50px"
                    rounded="100px"
                  >
                    <Flex direction="row">
                      {!isOdd && (
                        <Image
                          mr="10px"
                          alt="startfunding"
                          src="/handgo.svg"
                          id="rotateHandGo"
                        />
                      )}
                      Start Funding
                      {isOdd && (
                        <Image ml="10px" alt="startfunding" src="/handgo.svg" />
                      )}
                    </Flex>
                  </ButtonTransition>
                </Flex>
                <Box className="projectItemImageCol">
                  <Image
                    alt="Crypto project"
                    src={projectItem.imgsrc}
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}

const PROJECT_ITEMS = [
  {
    label: 'CRYPTO-STARTUP INDUSTRY',
    title: 'Crypto Project',
    state: 'Ongoing',
    id: 'CryptoProject',
    description:
      'WeFund supports both crypto and non-crypto projects. We are passionate about blockchain technology and its limitless potential. WeFund is designed to democratize the fundraising process.',
    imgsrc: '/CryptoProject.png',
  },
  {
    label: 'GAMING INDUSTORY',
    title: 'Gaming Project',
    state: 'Coming soon',
    id: 'GamingIndustry',
    description:
      'WeFund supports both crypto and non-crypto projects. We are passionate about blockchain technology and its  limitless potential. WeFund is designed to democratize the fundraising process.',
    imgsrc: '/GamingProject.png',
  },
  {
    label: 'CREATIVE INDUSTRY',
    title: 'Creative Project',
    state: 'Coming soon',
    id: 'CreativeProject',
    description:
      'WeFund supports both crypto and non-crypto projects. We are passionate about blockchain technology and its limitless potential. WeFund is designed to democratize the fundraising process.',
    imgsrc: '/CreativeProject.png',
  },
  {
    label: 'SPORTS INDUSTRY',
    title: 'Sports Project',
    state: 'Coming soon',
    id: 'SportsIndustry',
    description:
      'WeFund supports both crypto and non-crypto projects. We are passionate about blockchain technology and its limitless potential. WeFund is designed to democratize the fundraising process.',
    imgsrc: '/SportsProject.png',
  },
  {
    label: 'REAL ESTATE INDUSTRY',
    title: 'Real Estate Project',
    id: 'RealEstateIndustry',
    state: 'Coming soon',
    description:
      'WeFund supports both crypto and non-crypto projects. We are passionate about blockchain technology and its limitless potential. WeFund is designed to democratize the fundraising process.',
    imgsrc: '/RealEstateProject.png',
  },
];
