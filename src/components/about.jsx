import React from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { ButtonBackTransition } from '../components/ImageTransition';

export default function Aboutone() {
  return (
    <Flex id="aboutSection">
      <Image src="swirl.svg" id="swirlIdImg" />
      <Flex id="aboutFirstSection">
        <Box direction="column">
          <Flex direction="row">
            <Text
              fontSize="18px"
              fontWeight="400"
              color="#FFFFFF8A"
              fontFamily="PilatExtended-Regular"
            >
              ABOUT WEFUND
            </Text>
          </Flex>
          <Flex direction="row">
            <Flex align="center" mr="15px">
              <Image alt="Wefund" src="/onegoal.svg" h="65px" />
            </Flex>
            <Flex>
              <Text
                fontFamily="PilatExtended-Regular"
                fontWeight="700"
                fontSize="31px"
                color="white"
              >
                GOAL
                <br />
                PASSION
              </Text>
            </Flex>
          </Flex>
          <Flex mt="22px" w="80%">
            <Text fontSize="20px" fontWeight="400" lineHeight="30px">
              WeFund is Decentralized crowdfunding for the crypto-startup
              project industry and beyond implemented for a real-life use case.
              <br />
              <br />
              The vision of WeFund is to become the connector of the blockchain
              ecosystem that exists on the market. to fulfill this vision,
              WeFund's initial development stage would be in the Terra ecosystem
              and will continue to use another ecosystem such as Solana,
              Etherium, Cardano, etc in near future
            </Text>
          </Flex>
        </Box>
        <Flex w="100%" h="100%">
          <Flex
            id="rocket"
            position="relative"
            style={{ transition: 'transform 0.3s' }}
          >
            <Image h="500px" src="/rocket.svg" />
          </Flex>
        </Flex>
      </Flex>

      <Flex justify="center" w="100%">
        <Flex id="aboutSecondSection">
          <Flex id="YieldBenefit">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="YieldBenefitunitid"
            >
              <Image alt="Wefund" src="/gift.svg" h="60px" />
              <Text className="circleAboutText">
                Yield Benefit
                <br />
                For Backers
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="SecureStable">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="SecureStableunitid"
            >
              <Image alt="Wefund" src="/phone.svg" h="60px" />
              <Text className="circleAboutText">
                Secure Stable
                <br />
                Deposits
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="LowRisk">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="LowRiskunitid"
            >
              <Image alt="Wefund" src="/lowriskinvestment.svg" h="60px" />
              <Text className="circleAboutText">
                Low Risk
                <br />
                investement
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="GovernanceVoting">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="GovernanceVotingunitid"
            >
              <Image alt="Wefund" src="/governance.svg" h="60px" />
              <Text className="circleAboutText">
                Governance
                <br />
                Voting Power
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="DeflationaryToken">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="DeflationaryTokenunitid"
            >
              <Image alt="Wefund" src="/deflationary.svg" h="60px" />
              <Text className="circleAboutText">
                Deflationary
                <br />
                Token Value
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="NFTMirror">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="NFTMirrorunitid"
            >
              <Image alt="Wefund" src="/nftmirror.svg" h="60px" />
              <Text className="circleAboutText">
                NFT Mirror Real
                <br />
                World Asset
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="Section7">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="Section7unitid"
            >
              <Image alt="Wefund" src="/phone.svg" h="60px" />
              <Text className="circleAboutText">
                Secure Stable
                <br />
                Deposits
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex id="Section8">
            <ButtonBackTransition
              width="100%"
              height="100%"
              rounded="200px"
              selected={false}
              unitid="Section8unitid"
            >
              <Image alt="Wefund" src="/lowriskinvestment.svg" h="60px" />
              <Text className="circleAboutText">
                Low Risk
                <br />
                investement
              </Text>
            </ButtonBackTransition>
          </Flex>
          <Flex
            justify="center"
            direction="column"
            textAlign="center"
            id="aboutSectionCircle"
          >
            <Image
              src="/WeFund%20Logos%20only.png"
              id="aboutSectionCircleImage"
            />
            <Text id="aboutSectionTitle">
              Competitive
              <br />
              Advantages
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex mt="100px">
        <ButtonBackTransition
          width="100%"
          height="55px"
          rounded="100px"
          selected={false}
          unitid="downwhitepaper"
        >
          <a href="/Whitepaper_2.0.docx">
          <Flex justify="space-between" alignItems="center" w="100%" px="20px">
            <Box>Download Whitepaer</Box>
            <Image src="Download.svg" />
          </Flex>
          </a>
        </ButtonBackTransition>
      </Flex>
    </Flex>
  );
}
