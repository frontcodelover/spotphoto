// Composant de la bannire de la home page
import React, { Component } from 'react'
import ButtonHome from './ButtonHome'

export class Section extends Component {
  render() {
    
    return (
      <div className='flex-items'>
        <div className="home-txt">
          <h1 className="baseline">Vivez votre passion<br /></h1>
          <p><span className="text-home-photo">Trouvez les meilleurs spots photos</span></p>
          <ButtonHome />
        </div>
      </div>
    )
  }
}

export default Section