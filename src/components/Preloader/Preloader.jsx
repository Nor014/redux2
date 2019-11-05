import React from 'react';
import { ReactComponent as PreloaderSVG } from '../Preloader/Preloader.svg';


const preloaderWrapStyle = { textAlign: 'center' };

export default class Preloader extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div className={this.props.class ? `preloader-wrap ${this.props.class}` : "preloader-wrap"} style={preloaderWrapStyle}>
        <PreloaderSVG />
      </div>
    )
  }
}



