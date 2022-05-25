// Composant de la bannire de la home page
import React, { Component } from 'react'
import ButtonHome from './ButtonHome'

export class Section extends Component {
  render() {
    
    return (
      <div className='flex absolute text-center top-32 md:right-40 md:top-1/4 md:pt-32 md:text-left'>
        <div className="right-0">
          <h1 className="text-3xl font-semibold text-white md:text-6xl md:justify-end md:pb-3">Vivez votre passion<br /></h1>
          <p className="text-xl text-white md:text-2xl">Trouvez les meilleurs spots photos</p>
          <div className='py-9'><ButtonHome /></div>
        </div>
      </div>
    )
  }
}

export default Section