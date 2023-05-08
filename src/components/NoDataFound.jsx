import React from 'react'
import styled from 'styled-components'
import noDataFound from '../assets/errors/noDataFound.gif'

function NoDataFound() {
  return (
    <STYLEDNoDataFoundContainer>
      Aucune donnée avec ces filtres !
        {/* Yo y'a aucun résultat avec ces filtres ! */}
        {/* <img src={noDataFound}/>         */}
        <iframe src="https://embed.lottiefiles.com/animation/97179"></iframe>
        {/* <img src='https://lottiefiles.com/97179-no-data-found' /> */}
        Changez les filtres à gauche ;-).
    </STYLEDNoDataFoundContainer>
  )
}

export default NoDataFound

const STYLEDNoDataFoundContainer = styled.div`
width: 100%;
height:100%;
display: flex;
flex-direction: column;
justify-content:center;
align-items:center;
`