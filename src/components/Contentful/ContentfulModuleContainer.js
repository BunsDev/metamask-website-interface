import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import FaqList from '../FaqList'
import kebabCase from 'lodash/kebabCase'
import { EyebrowStyle } from '../StyledGeneral'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      title,
      eyebrow,
      description,
      numberOfItem,
      columns,
      columnsOnMobile,
      centerOnMobile,
      contentAlignment,
      splitModules,
      displayTitle,
      modules = [],
      gridModules = true,
      gridModulesGap: gridModulesGapDefault,
      isLiquiditySection,
      isTrustBar,
      containerBgColor,
      previewMode = false,
      columnType,
    },
  } = props
  const gridModulesGap = gridModulesGapDefault || '8px'
  const gridModulesGapNumber = +gridModulesGap.slice(0, -2)
  const { childMarkdownRemark: { html } = {} } = description || {}
  const htmlData = previewMode ? description : html
  const faqList =
    modules && modules.length
      ? modules.filter(modules =>
          ['ContentfulFaq', 'Faq'].includes(modules.__typename)
        )
      : []
  const modulesOther =
    modules && modules.length
      ? modules.filter(
          modules => !['ContentfulFaq', 'Faq'].includes(modules.__typename)
        )
      : []
  const isFaq = faqList && faqList.length

  const [modulesRender, setModulesRender] = useState(modulesOther)
  const [shuffled, setShuffled] = useState(false)

  useEffect(() => {
    if (columnType === 'randomize') {
      const lastItem = modulesOther.pop()
      let modulesShuffled = modulesOther
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      modulesShuffled.push(lastItem)
      setModulesRender(modulesShuffled)
      setShuffled(true)
    }
  }, [shuffled])

  return (
    <Wrapper
      isFaq={isFaq}
      className="contentfulModuleContainerWrapper"
      id={kebabCase(title || '')}
    >
      <Inner splitModules={splitModules}>
        {title || htmlData || eyebrow ? (
          <Content splitModules={splitModules}>
            {eyebrow ? <EyebrowStyle>{eyebrow}</EyebrowStyle> : null}
            {title && displayTitle ? (
              <Title isFaq={isFaq}>{title}</Title>
            ) : null}
            {htmlData ? (
              <div
                className={classnames({
                  'txt-center': contentAlignment === 'center',
                })}
                dangerouslySetInnerHTML={{ __html: htmlData }}
              />
            ) : null}
          </Content>
        ) : null}
        <ModulesWrapper
          splitModules={splitModules}
          overFlowHidden={gridModulesGapNumber > 20}
        >
          {isFaq ? (
            <FaqList
              list={faqList}
              containerBgColor={containerBgColor}
              previewMode={previewMode}
            />
          ) : null}
          {modulesRender.length ? (
            <Modules
              columnType={columnType}
              columns={columns}
              columnsOnMobile={columnsOnMobile}
              contentAlignment={contentAlignment}
              centerOnMobile={centerOnMobile}
              gridModules={gridModules}
              gridModulesGap={isLiquiditySection ? '16px' : gridModulesGap}
              isLiquiditySection={isLiquiditySection}
              isTrustBar={isTrustBar}
              className={classnames('moduleContainerListModules', {
                [`columnType${columnType}`]: columnType,
                [`column-${columns}`]: columns,
              })}
            >
              {modulesRender.map(m =>
                contentfulModuleToComponent({
                  ...m,
                  numberOfItem,
                  previewMode,
                })
              )}
            </Modules>
          ) : null}
        </ModulesWrapper>
      </Inner>
    </Wrapper>
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { modulesCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      modules: modulesCollection?.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(
  ContentfulModuleContainer
)

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.object | PropTypes.string,
    numberOfItem: PropTypes.number,
    columns: PropTypes.number,
    contentAlignment: PropTypes.string,
    centerOnMobile: PropTypes.bool,
    splitModules: PropTypes.bool,
    columnsOnMobile: PropTypes.number,
    isTrustBar: PropTypes.bool,
  }),
}

const Wrapper = styled.div`
  display: block;

  /* remove margin when nested child in child */
  .contentfulModuleContainerWrapper {
    margin-bottom: 0 !important;
  }

  ${({ isFaq, theme }) =>
    isFaq
      ? `
    width: 600px;
    max-width: 100%;
    margin: 0 auto 80px auto;

    @media (max-width: ${theme.device.tabletMediaMax}) {
      margin-bottom: 40px;
    }
  `
      : ``}

  .registerEventForm & {
    width: 625px;
    max-width: 100%;
    margin: 0 auto 40px;
    line-height: 24px;
  }
`
const Inner = styled.div`
  display: block;
  ${({ splitModules, theme }) =>
    splitModules
      ? `
    display: flex;

    @media (max-width: ${theme.device.tabletMediaMax}) {
      flex-direction: column;
    }
    
    
  `
      : ``}

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    text-align: center;
  }
`
const ModulesWrapper = styled.div`
  display: block;

  ${({ overFlowHidden }) =>
    overFlowHidden
      ? `
      overflow: hidden;
  `
      : ``}

  ${({ splitModules, theme }) =>
    splitModules
      ? `
    flex: 1;
    min-with: 0;
    @media (max-width: ${theme.device.mobileMediaMax}) {
      flex: none;
      width: 100%;
    }
    `
      : ``}
`

const Content = styled.div`
  display: block;

  .newsCategoriesTab & {
    margin-bottom: 32px;
  }

  ${({ splitModules, theme }) =>
    splitModules
      ? `
    width: 33%;
    padding-right: 16px;
    @media (max-width: ${theme.device.tabletMediaMax}) {
      padding: 0;
      width: 100%;
    }
  `
      : ``}
`

const Title = styled.h2`
  margin-bottom: 1rem;
  ${({ isFaq, theme }) =>
    isFaq
      ? `
      margin-bottom: 20px;
      @media (max-width: ${theme.device.tabletMediaMax}) {
        font-size: 2rem;
      }
      @media (max-width: ${theme.device.mobileMediaMax}) {
        padding-top: 20px;
        text-align: center;
      }
    `
      : ``}
`
const Modules = styled.div`
  display: flex;
  flex-flow: wrap;
  ${({ isLiquiditySection }) =>
    isLiquiditySection
      ? `
    align-items: center;
    #liquidity-left {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        max-width: 316px;
      }
    }
    .LogoImageWrapper {
      justify-content: center;
      align-items: center;
    }
  `
      : ''}

  ${({ isTrustBar, columns, columnsOnMobile, theme }) =>
    isTrustBar
      ? `
    padding: 10px 19px;
    border-radius: 12px;
    box-shadow: 0px 4px 24px rgb(0 0 0 / 10%);
    align-items: center;

    & > * {
      width: calc(100%/${columns});
      padding: 16px;

      @media (max-width: ${theme.device.tabletMediaMax}){
        padding: 16px 8px;
      }

      @media (max-width: ${theme.device.mobileMediaMax}){
        width: ${columnsOnMobile ? `calc(100%/${columnsOnMobile})` : '50%'};
        padding: 16px;
      }
    }
    
    body.dark-mode & {
      background-color: #3c444b;
    }
  `
      : ''}

  ${({
    gridModules,
    columnType,
    gridModulesGap,
    columns,
    columnsOnMobile,
    theme,
    isTrustBar,
  }) =>
    columns && gridModules && columnType !== 'tag' && !isTrustBar
      ? `
      margin: -${gridModulesGap} !important;
      
      @media (max-width: ${theme.device.tabletMediaMax}){
        .mobileCardGridModulesGap12 & {
          margin: -12px !important;
        }
      }

    > * {
    width: calc(100%/${columns});
    padding: ${gridModulesGap} !important;
    @media (max-width: ${theme.device.miniDesktopMediaMax}){
      ${columnsOnMobile && columns > 3 ? `width: 33.333%` : ''};
    }
    @media (max-width: ${theme.device.tabletMediaMax}){
      ${columnsOnMobile && columns > 2 ? `width: 50%` : ''};
      .mobileCardGridModulesGap12 & {
        padding: 12px !important;
      }
    }
    @media (max-width: ${theme.device.mobileMediaMax}){
      width: ${columnsOnMobile ? `calc(100%/${columnsOnMobile})` : '50%'};
    }
  }
  `
      : ''}
  /* custom when 1 column */
  ${({ gridModules, columns, theme }) =>
    [1, 2].includes(columns) && gridModules
      ? `
    > * {
    @media (max-width: ${theme.device.mobileMediaMax}){
      width: 100% !important;
    }
  }
  `
      : ''}

  ${({ contentAlignment }) =>
    contentAlignment === 'center'
      ? `
    justify-content: center;
    .ctaModuleContainer {
      justify-content: center;
    }
  `
      : ''}

${({ centerOnMobile, theme }) =>
  centerOnMobile
    ? `
    @media(max-width: ${theme.device.mobileMediaMax}) {
      justify-content: center;
      .ctaModuleContainer {
        justify-content: center;
      }
    }
  `
    : ''}

  ${({ columnType, columns }) =>
    columnType === 'pinterest'
      ? `
    column-count: ${columns};
    column-gap: 14px;
    display: block !important;
    margin: 0 !important;
    & > *{
      display: inline-block;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 0 14px 0 !important;
    }
  `
      : ``}

  ${({ columnType }) =>
    columnType === 'tag'
      ? `
    display: flex;
    flex-flow: wrap;
    & > *{
      display: inline-flex;
      width: auto !important;
      margin-right: 20px;
      margin-bottom: 20px;
      
    }
  `
      : ``}
`
