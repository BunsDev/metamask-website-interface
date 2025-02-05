import PropTypes from 'prop-types'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { useLocation } from '@reach/router'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section } from './StyledGeneral'
import classnames from 'classnames'
import Image from './Image'
import isEmpty from 'lodash/isEmpty'
import ContextClientSide from '../Context/ContextClientSide'
import Context from '../Context/ContextPage'
import Loadable from '@loadable/component'
import ParseMD from './ParseMD'

const FoxAnimation = Loadable(() => import('./FoxAnimation/'))

const HeroContainerComponent = props => {
  const {
    backgroundImage,
    backgroundImageDarkMode,
    headline,
    hideHeadline,
    description,
    note,
    sideImage,
    sideImageDarkMode,
    sideImageUrl,
    sideImageDarkModeUrl,
    showLearnMore,
    eyebrow,
    eyebrowLogo,
    eyebrowMobileLogo,
    eyebrowLogoDarkMode,
    eyebrowMobileLogoDarkMode,
    showFavIcon,
    hubSpotForm,
    ctas,
    contentAlignment,
    backgroundColor,
    headlineBorderBottom,
    sideImageFlex,
    sideImageFoxAnimation,
    backgroundColorMobile,
    isFaq,
    sectionPadding,
    customClass,
    previewMode = false,
  } = props
  const { darkMode: darkModeContextValue } = useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}
  const location = useLocation()
  const pathname = location.pathname.replace(/\/?$/, '/')
  const isNewsList = pathname === '/news/'
  const isHome = customClass?.includes('page-home')
  const isAbout = customClass?.includes('page-about')
  const isFlask = customClass?.includes('page-flask')
  const isSDK = customClass?.includes('page-sdk')
  const isInstitutions = customClass?.includes('page-institutions')
  const isInstitutionalChild = customClass?.includes('page-institutional-child')
  const isThankYou = customClass?.includes('page-thank-you')
  let hubspotWrapper
  if (hubSpotForm) {
    hubspotWrapper = (
      <HubSpotDefault>
        {contentfulModuleToComponent({
          ...hubSpotForm,
          previewMode,
        })}
      </HubSpotDefault>
    )
  }
  const isStyleHubspot = hubSpotForm
  const isStyleCenterSimple = contentAlignment === 'center' && !sideImageUrl
  let heroTitleFontsize = ''
  if (isStyleHubspot) {
    heroTitleFontsize = '16px'
  } else if (
    (contentAlignment === 'center' || headlineBorderBottom) &&
    !isThankYou
  ) {
    heroTitleFontsize = '30px'
  }
  const { heroContainer: heroContainerREF } = useContext(Context)
  const { heroContainerRef } = heroContainerREF || {}

  const scrollRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  const onScroll = () => {
    const windowY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    if (
      scrollRef.current.getBoundingClientRect().top <=
      Number(heroContainerRef.current.offsetTop - 40)
    ) {
      setScrolled(true)
    }

    if (windowY <= 40) {
      setScrolled(false)
    }
  }

  useEffect(() => {
    if (!isNewsList) return
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const sdkRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (isSDK && sdkRef.current?.clientHeight) {
      handleWindowSizeChange()
      window.addEventListener('resize', handleWindowSizeChange)
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange)
      }
    }
  }, [sdkRef.current?.clientHeight])

  const handleWindowSizeChange = () => {
    setHeight(sdkRef.current.clientHeight + 48)
  }

  return (
    <>
      {showFavIcon ? (
        <FavIconContainer>
          <ContentWrapper>
            <FavIconWrapper>
              <FavIcon src={'/images/metamask-logo.png'} alt="logo" />
            </FavIconWrapper>
          </ContentWrapper>
        </FavIconContainer>
      ) : null}
      <HeroContainer
        isThankYou={isThankYou}
        sectionPadding={sectionPadding || ''}
        headlineBorderBottom={headlineBorderBottom}
        isStyleCenterSimple={isStyleCenterSimple}
        showFavIcon={showFavIcon}
        image={
          !isThankYou &&
          (isDarkMode && backgroundImageDarkMode
            ? backgroundImageDarkMode
            : backgroundImage)
        }
        ref={heroContainerRef}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
          [`bg-mobile-${backgroundColorMobile}`]: backgroundColorMobile,
          [`custom-${customClass}`]: customClass,
          [`scrolled`]: scrolled,
        })}
      >
        {isThankYou && backgroundImage ? (
          <BackgroundImageContain>
            <img
              alt={headline}
              src={
                isDarkMode && backgroundImageDarkMode
                  ? backgroundImageDarkMode
                  : backgroundImage
              }
            />
          </BackgroundImageContain>
        ) : null}
        <ContentWrapper customClass={customClass}>
          <HeroContentContainer
            isStyleCenterSimple={isStyleCenterSimple}
            contentAlignment={contentAlignment}
            bgSrc={
              !isStyleHubspot && !sideImageFlex && !isFlask && !isSDK
                ? isDarkMode && sideImageDarkModeUrl
                  ? sideImageDarkModeUrl
                  : sideImageUrl
                : ''
            }
            isAbout={isAbout}
            reverse={contentAlignment === 'right'}
            center={sideImageFlex}
            isInstitutions={isInstitutions}
            isFlask={isFlask}
            isSDK={isSDK}
            isInstitutionalChild={isInstitutionalChild}
            isThankYou={isThankYou}
          >
            <HeroImageTextContainer
              isStyleHubspot={isStyleHubspot}
              isHome={isHome}
              headlineBorderBottom={headlineBorderBottom}
              className={classnames({
                heroMobileOverlayContent:
                  !backgroundImage && !sideImageFoxAnimation,
              })}
              center={!sideImageFlex && !isHome}
              sideImageFlex={sideImageFlex}
              isSDK={isSDK}
            >
              {eyebrowLogo ? (
                <EyebrowWrapper
                  className={classnames({ 'hidden-mobile': eyebrowMobileLogo })}
                  hideHeadline={hideHeadline}
                  isFaq={isFaq}
                >
                  {contentfulModuleToComponent(
                    eyebrowLogoDarkMode && isDarkMode
                      ? {
                          ...eyebrowLogoDarkMode,
                          cleanStyle: true,
                          previewMode,
                        }
                      : {
                          ...eyebrowLogo,
                          cleanStyle: true,
                          previewMode,
                        }
                  )}
                </EyebrowWrapper>
              ) : null}
              {eyebrowMobileLogo ? (
                <EyebrowWrapper
                  className={'hidden-desktop'}
                  hideHeadline={hideHeadline}
                  isMobileLogo={true}
                  isFaq={isFaq}
                >
                  {contentfulModuleToComponent(
                    eyebrowMobileLogoDarkMode && isDarkMode
                      ? {
                          ...eyebrowMobileLogoDarkMode,
                          cleanStyle: true,
                          previewMode,
                        }
                      : {
                          ...eyebrowMobileLogo,
                          cleanStyle: true,
                          previewMode,
                        }
                  )}
                </EyebrowWrapper>
              ) : null}
              {eyebrow ? (
                <EyebrowText isSDK={isSDK}>{eyebrow}</EyebrowText>
              ) : null}
              {headline && (
                <HeroTitle
                  headlineBorderBottom={headlineBorderBottom}
                  hideHeadline={hideHeadline}
                  fontSize={heroTitleFontsize}
                  isFaq={isFaq}
                  isFlask={isFlask}
                  isSDK={isSDK}
                  ref={scrollRef}
                >
                  <div dangerouslySetInnerHTML={{ __html: headline }} />
                </HeroTitle>
              )}
              {sideImage && isSDK && !sideImageFoxAnimation ? (
                <HeightSlide height={height} isSDK={isSDK}>
                  <HeroSideImage
                    sideImageFlex={sideImageFlex}
                    isSDK={isSDK}
                    ref={sdkRef}
                  >
                    <Image
                      image={
                        isDarkMode && !isEmpty(sideImageDarkMode)
                          ? sideImageDarkMode
                          : sideImage
                      }
                      onLoad={handleWindowSizeChange}
                      previewMode={previewMode}
                    />
                  </HeroSideImage>
                </HeightSlide>
              ) : null}
              {description && (
                <HeroDescription isFaq={isFaq}>
                  {previewMode ? (
                    <ParseMD>{description}</ParseMD>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  )}
                </HeroDescription>
              )}
              {!isEmpty(ctas) && !isFlask ? (
                <HeroCTA>
                  {ctas.map(cta =>
                    contentfulModuleToComponent({
                      ...cta,
                      buttonSize: 'hero',
                      previewMode,
                    })
                  )}
                </HeroCTA>
              ) : null}
              {note && <HeroNote>{note}</HeroNote>}
              {hubspotWrapper ? hubspotWrapper : null}
            </HeroImageTextContainer>
            {(sideImage || sideImageFoxAnimation) && !isSDK ? (
              <HeroSideImage
                sideImageFlex={sideImageFlex}
                isStyleHubspot={isStyleHubspot}
                sideImageFoxAnimation={sideImageFoxAnimation}
                isFlask={isFlask}
              >
                {sideImageFoxAnimation ? <FoxAnimation /> : null}
                {!sideImageFoxAnimation &&
                (isStyleHubspot || sideImageFlex || isFlask) ? (
                  <Image
                    image={
                      isDarkMode && !isEmpty(sideImageDarkMode)
                        ? sideImageDarkMode
                        : sideImage
                    }
                    previewMode={previewMode}
                  />
                ) : null}
              </HeroSideImage>
            ) : null}
            {!isEmpty(ctas) && isFlask ? (
              <HeroCTA>
                {ctas.map(cta =>
                  contentfulModuleToComponent({
                    ...cta,
                    buttonSize: 'hero',
                    previewMode,
                  })
                )}
              </HeroCTA>
            ) : null}
          </HeroContentContainer>
        </ContentWrapper>
      </HeroContainer>
      {showLearnMore ? (
        <div>
          <ContentWrapper>
            <LearnMoreWrapper>
              <LearnMoreInner className="text-block">
                Learn More
                <Icon className="w-icon w-icon-dropdown-toggle"></Icon>
              </LearnMoreInner>
            </LearnMoreWrapper>
          </ContentWrapper>
        </div>
      ) : null}
    </>
  )
}

export default withTheme(HeroContainerComponent)

HeroContainerComponent.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundImageDarkMode: PropTypes.string,
  eyebrowLogo: PropTypes.object,
  eyebrowMobileLogo: PropTypes.object,
  sideImageUrl: PropTypes.string,
  sideImage: PropTypes.object,
  hubSpotForm: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  contentAlignment: PropTypes.string,
  hideHeadline: PropTypes.bool,
  showLearnMore: PropTypes.bool,
  showFavIcon: PropTypes.bool,
  sideImageFoxAnimation: PropTypes.bool,
  sectionPadding: PropTypes.string,
  previewMode: PropTypes.bool,
}

const HeroContainer = styled(Section)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  &.custom-newsHero + div{
    padding-top: 64px !important;
    padding-bottom: 0;
  }
  &.scrolled.custom-newsHero.bg-default,
  &.scrolled.custom-newsHero.bg-default:not(.noPaddingBottom){
    + div{
     padding-top: 320px !important;
    }
    position: fixed;
    z-index: 2;
    transition: all 0.5s ease;
    padding: 24px 0 !important;
  }

  ${({ isThankYou }) =>
    isThankYou
      ? `
  z-index: 5;
  `
      : ``}
  ${({ image }) =>
    image
      ? ` background-image: url(${image});
    background-size: cover;
   `
      : ''}

  ${({ isStyleCenterSimple }) =>
    isStyleCenterSimple
      ? `
      + div {
        padding-top: 0 !important;
      }
    `
      : ''}

  ${({ headlineBorderBottom }) =>
    headlineBorderBottom
      ? `
    padding-top: 0;
    & + div {
      padding-top: 0 !important;
    }
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    padding-top: 0;
    &.custom-newsHero.bg-default:not(.noPaddingBottom) + div{
      padding-top: 64px !important; 
    }
  }

  ${({ showFavIcon }) =>
    showFavIcon
      ? `
      padding-top: 0;
  `
      : ``}

  ${({ sectionPadding }) =>
    sectionPadding
      ? `
      padding-bottom: ${sectionPadding} !important;
  `
      : ``}
  
`

const HeroContentContainer = styled.div`
  display: flex;
  margin: -10px;
  margin-top: 10px;
  
  & > * {
    width: 50%;
    padding: 10px;
  }

  ${({ center }) =>
    center
      ? `
    align-items: center;

    img {
      margin: 0 auto;
    }
  `
      : ''}

  ${({ bgSrc }) =>
    bgSrc
      ? `
    background-image: url(${bgSrc});
    background-position: 100% 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: scroll;
  `
      : ''}
  
  ${({ isAbout }) =>
    isAbout
      ? `
    background-position: 100% 0%;
    background-size: 50%;
    ${HeroImageTextContainer} {
      padding-top: 0;
      padding-bottom: 0;
    }
  `
      : ''}

  ${({ isSDK }) =>
    isSDK
      ? `
    margin-bottom: 64px;
  `
      : ''}

  ${({ contentAlignment }) =>
    contentAlignment === 'center'
      ? `
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${HeroCTA} {
      justify-content: center;

      .button {
        margin: 0 8px 16px;
      }
    }

    & > * {
      width: 100%;
    }
  `
      : ''}

  ${({ isStyleCenterSimple }) =>
    isStyleCenterSimple
      ? `
    margin: 0 !important;
    padding: 48px 0 0 0 !important;
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    flex-direction: column-reverse;
    background-position: 50% 0%;
    background-size: 90%;
    background-attachment: scroll;
    padding-bottom: 0;
    transition: all 0.5s ease;
    ${({ isFlask }) =>
      isFlask
        ? `
      flex-direction: column;

      ${HeroSideImage} {
        height: auto !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      ${HeroTitle} {
        padding-bottom: 0 !important;
      }
    `
        : ''}
    & > * {
      width: 100%;
    }

    ${({ isInstitutions }) =>
      isInstitutions
        ? `
      flex-direction: column;
      background-position: 50% 0%;
      background-size: 250px;
      ${EyebrowWrapper} {
        padding-top: 42px;
      }
    `
        : ''}
  }
  ${({ isInstitutionalChild, theme }) =>
    isInstitutionalChild
      ? `
    ${EyebrowWrapper} {
      img {
        height: 40px;
        width: auto;
        margin: 0 !important;
      }
    }
    
    @media (max-width: ${theme.device.tabletMediaMax}){
      ${EyebrowWrapper} {
        img {
          margin: 16px auto !important;
        }
      }
    }
  `
      : ``}

  ${({ isThankYou, theme }) =>
    isThankYou
      ? `
    max-width: 500px;
    margin: 0 auto!important;
    
     @media (min-width: ${theme.device.mobile}){
      ${EyebrowWrapper} {
        img {
          width: 376px;
          height: auto;
          margin: 0 auto;
        }
      }
  `
      : ''}

  ${({ reverse, theme }) =>
    reverse
      ? `
    flex-direction: row-reverse;
    background-position: 0% 0%;
    @media (max-width: ${theme.device.tabletMediaMax}){
      flex-direction: column;
    }
  `
      : ''}
  
  .scrolled.custom-newsHero &{
    transition: all 0.5s ease;
    padding-top: 0 !important;
  }
`

const HeroImageTextContainer = styled.div`
  display: block;
  position: relative;
  transition: all 0.5s ease;
  z-index: 1;

  .contentWidth70 & {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      width: 70%;
      img {
        width: 50%;
      }
    }
  }

  .scrolled.custom-newsHero &{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease;
  }
  ${({ sideImageFlex }) =>
    sideImageFlex
      ? `
  flex: 1;
  min-width: 0;
  `
      : ''}
  ${({ isHome, theme }) =>
    isHome
      ? `
  @media (min-width: ${theme.device.miniDesktop}){
    margin-top: 50px;
  }
  `
      : ''}

  ${({ center, theme }) =>
    center
      ? `
  @media (min-width: ${theme.device.tablet}){
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  `
      : ''}

  ${({ isStyleHubspot }) =>
    isStyleHubspot
      ? `
  width: auto;
  flex: 1;
  min-width: 0;
  `
      : ''}

  ${({ headlineBorderBottom }) =>
    headlineBorderBottom
      ? `
  width: 100%;
  `
      : ''}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    margin-top: -5px;
    padding-top: 0px;
    text-align: center;
  }

  ${({ isSDK }) =>
    isSDK
      ? `
    position: inherit
  `
      : ''}
`

const HeroTitle = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxxl}rem;
  line-height: 1.2;
  padding-top: 20px;
  padding-bottom: 20px;
  transition: all 0.5s ease;

  .newsHero & {
    font-size: 40px !important;
    line-height: 1.2;
  }
  .scrolled.custom-newsHero &{
    padding: 0;
  }
  .headline-max-width-754 & {
    max-width: 754px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .newsHero & {
      font-size: 30px !important;
      line-height: 32px;
      padding-bottom: 8px;
    }
  }
  
  ${({ hideHeadline }) =>
    hideHeadline
      ? `
    display: none;
  `
      : ''}

  ${({ fontSize }) =>
    fontSize
      ? `
      font-size: ${fontSize} !important;
  `
      : ''}

  ${({ isFaq }) =>
    isFaq
      ? `
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  `
      : ''}
  
  ${({ isFlask, isSDK }) =>
    isFlask || isSDK
      ? `
    font-size: 50px !important;
    font-weight: bold;
    line-height: 1.2;
    width: 100%;
    max-width: 665px;
    margin-left: auto;
    margin-right: auto;
  `
      : ''}

  ${({ headlineBorderBottom }) =>
    headlineBorderBottom
      ? `
      padding-bottom: 28px;
      border-bottom: 1px solid #a8a8a8;
      text-align: left;
  `
      : ''}
  
  .titleFontSize64 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      font-size: 64px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    font-size: 46px;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 34px !important;
    line-height: 43px;
  }
`
const HeroConnectCTA = styled.div`
  display: block;
  margin-top: 56px;
  margin-bottom: 24px;
`

const HeroDescription = styled.div`
  display: block;
  margin-bottom: 24px;

  .newsHero & {
    font-size: 20px;

    a {
      color: #535a61;
      body.dark-mode & {
        color: ${({ theme }) => theme.white};
      }

      svg {
        margin-right: 16px;
        path {
          fill: #535a61;
          body.dark-mode & {
            fill: ${({ theme }) => theme.white};
          }
          transition: all ease 0.5s;
        }
      }

      &:hover {
        color: ${({ theme }) => theme.primaryColor} !important;

        svg {
          path {
            fill: ${({ theme }) => theme.primaryColor} !important;
          }
        }
      }
      transition: all ease 0.5s;
    }
  }

  .scrolled.custom-newsHero & {
    p {
      margin-bottom: 0;
    }
    margin-bottom: 0;
  }

  .contentMaxWidth480 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      max-width: 480px;
    }
  }

  ${({ isFaq }) =>
    isFaq
      ? `
    color: #727272;
  `
      : ''}
`

const HeroSideImage = styled.div`
  display: block;
  height: 400px;

  ${({ sideImageFlex }) =>
    sideImageFlex
      ? `
    display: flex;
    height: auto !important;
    align-items: center;
    justify-content: center;
  `
      : ''}

  ${({ isStyleHubspot }) =>
    isStyleHubspot
      ? `
    width: 58.33%;
  `
      : ''}

  ${({ isFlask }) =>
    isFlask
      ? `
    height: auto;
    width: 100%;
    max-width: 960px;
    
  `
      : ''}

  ${({ isSDK }) =>
    isSDK
      ? `
    height: auto;
    margin-top: 24px;
    margin-bottom: 24px;
    width: 100vw;
    position: absolute;
    left: 0;
    img {
      width: 100%;
    }
  `
      : ''}
  
  .sideImageOverflow &,
  .sideImageOverflowRight & {
    img {
      filter: drop-shadow(-15px 15px 24px rgba(0, 0, 0, 0.05)) drop-shadow(-3px 3px 10px rgba(0, 0, 0, 0.07));
      border-radius: 5px;
    }
    
    @media (min-width: ${({ theme }) =>
      theme.device.miniDesktop}) and (max-width: ${({ theme }) =>
  theme.device.twoKResolutionMax}) {
        min-width: 62%;

        .sideImageMinWidth50 & {
          min-width: 50%;
        }
      }

    @media (max-width: ${({ theme }) =>
      theme.device.tablet}) and (max-width: ${({ theme }) =>
  theme.device.miniDesktopMediaMax}) {
        min-width: 60%;
      } 
    }
  
  .sideImageFlex45 & {
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      width: 45%;
    }
  }
  
  .sideImageFlex40 & {
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      width: 40%;
    }
  }
  
  .sideImageFlex35 & {
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      width: 35%;
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      width: 50%;
    }
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      width: 100%;
    }
  }
  
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    padding: 0 !important;
  }
  
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    height: 220px;
    margin-bottom: 10px;
    padding-bottom: 0;
    width: 100%;

    ${({ sideImageFoxAnimation }) =>
      sideImageFoxAnimation
        ? `
        height: 320px !important;
    `
        : ''}
  }

  .sideImageLeft70 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      position: relative;
      left: 70px;
    }
  }
`

const HeightSlide = styled.div`
  display: block;

  ${({ height }) =>
    height
      ? `
    height: ${height}px
  `
      : ''}
`

const HeroCTA = styled.div`
  display: flex;
  flex-flow: wrap;

  .button {
    margin: 0 16px 16px 0;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    justify-content: center;

    .button {
      margin: 0 8px 16px;
    }
    .theme-dark & {
      flex-direction: column;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .button {
      width: 100%;
      margin: 0 0 16px 0;
    }
  }
`

const LearnMoreWrapper = styled.div`
  display: block;
`

const LearnMoreInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
`

const Icon = styled.span`
  font-size: 20px;
`

const EyebrowWrapper = styled.div`
  display: block;

  ${({ hideHeadline }) =>
    hideHeadline
      ? `
    margin-bottom: 8px;
  `
      : ``}
  img {
    height: 80px;

    ${({ isMobileLogo, isFaq, theme }) =>
      isMobileLogo || isFaq
        ? `
        height: auto;
        margin-bottom: 10px;
      `
        : `
        @media (max-width: ${theme.device.tabletMediaMax}) {
          height: auto;
          margin: 0 auto 16px;
          width: 80%;
        }
      `}
    ${({ isFaq }) =>
      isFaq
        ? `
        margin-bottom: 0;
    `
        : ''}
  }

  .logoHeight40 & {
    img {
      height: 40px;
      width: auto;
      margin: unset;
    }
  }
`

const FavIconContainer = styled(Section)`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
`

const FavIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0 8px 0;
`

const FavIcon = styled.img`
  width: 40px;
`

const HubSpotDefault = styled.div`
  display: block;
`

const EyebrowText = styled.div`
  font-size: 18px;
  line-height: 140.62%;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.eyebrowHero};

  ${({ isSDK, theme }) =>
    isSDK
      ? `
        color: ${theme.orange};
    `
      : ''}
`

const BackgroundImageContain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    width: 100%;
  }
`

const HeroNote = styled.p`
  font-style: italic;
  font-size: 12px;
  color: ${({ theme }) => theme.darkGray};
  margin-bottom: 0;
`
