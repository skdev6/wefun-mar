import React from 'react';
import {chakra, useColorModeValue, useTokenBox, useToken, Heading, Stack,HStack, StackDivider,Text, Link, Image, SimpleGrid, Button, Input,Box, ButtonGroup, IconButton } from '@chakra-ui/react'


import { FaDiscord, FaMedium, FaTwitter, FaYoutube } from 'react-icons/fa'

const Copyright = (props) => (
    <Text fontSize="sm" {...props}>
      &copy; {new Date().getFullYear()} <span style={{color:'#00A3FF'}}>WeFund</span> All rights reserved.
    </Text>
  )

const FooterHeading = (props) => (
    <Heading
      as="h4"
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize="sm"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="wider"
      {...props}
    />
  )


const LinkGrid = (props) => (
  <SimpleGrid columns={1} spacing={10} {...props}>
    <Box minW="130px">
      <HStack>
        <Link>How it works</Link>
        <Link>Pricing</Link>
        <Link>Use Cases</Link>
        <Link>Use Cases</Link>
        <Link>Use Cases</Link>
      </HStack>
    </Box>
  </SimpleGrid>
)

const Logo = (props) => {
    const [white, black] = useToken('colors', ['white', 'gray.800'])
    return (
      <Image src="horizontallogo.svg" sizes='80%'></Image>
    )
  }

  
const SocialMediaLinks = (props) => (
    <ButtonGroup variant="ghost" color="gray.600" {...props}>
      <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaMedium fontSize="20px" />} />
      <IconButton as="a" href="#" aria-label="GitHub" icon={<FaYoutube fontSize="20px" />} />
      <IconButton as="a" href="#" aria-label="GitHub" icon={<FaDiscord fontSize="20px" />} />
      <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
    </ButtonGroup>
  )

const SubscribeForm = (props) => {
    return (
      <chakra.form {...props} onSubmit={(e) => e.preventDefault()}>
        <Stack spacing="4">
          <Stack
            spacing="4"
            direction={{
              base: 'column',
              md: 'row',
            }}
          >
            <Input
              bg={useColorModeValue('white', 'inherit')}
              borderRadius={"40px"} 
              backdropBlur={"54px"}
              placeholder="Enter your email"
              type="email"
              required
              focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
              _placeholder={{
                opacity: 1,
                color: useColorModeValue('gray.500', 'whiteAlpha.700'),
              }}
            />
            <Button 
              type="submit"
              bg={"linear-gradient(180deg, rgba(0, 193, 255, 0.1) 0%, rgba(0, 193, 255, 0.1) 100%)"} 
              width={{
                base: 'full',
                md: 'auto',
              }}
              flexShrink={0}
              border={"1.5px solid"}
              borderColor={" #0047FF"} 
              borderRadius={"40px"} 
              backdropBlur={"54px"}
            > 
            Subscribe
            </Button>
          </Stack>
        </Stack>
      </chakra.form>
    )
  }

export const Newfooter = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    py="12"
    px={{
      base: '4',
      md: '8',
    }}
  >
    <Stack spacing="10" divider={<StackDivider />}>
      <Stack
        direction={{
          base: 'row',
          lg: 'row',
        }}
        spacing={{
          base: '10',
          lg: '28',
        }}
      >
        <Box flex="1">
          <Text fontSize="21px">
            Wanna know more about <span style={{color:'#00A3FF'}}>WeFund</span>?
          </Text>
        </Box>
        <Stack
          direction={{
            base: 'row',
            md: 'row',
          }}
          spacing={{
            base: '10',
            md: '20',
          }}
        >
          
          <SubscribeForm
            width={{
              base: 'full',
              md: 'sm',
            }}
          />
          </Stack>
      </Stack>
      <Stack
        direction={{
          base: 'column-reverse',
          md: 'row',
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flex="1">
          <Logo />
        </Box>
        <LinkGrid
      spacing={{
        base: '10',
        md: '20',
        lg: '28',
      }}
      flex="1"
    />
      </Stack>
      <Stack
        direction={{
          base: 'column-reverse',
          md: 'row',
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
)
export default Newfooter;
