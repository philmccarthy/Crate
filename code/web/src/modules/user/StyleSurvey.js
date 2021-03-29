import React, { PureComponent } from 'react'

import Card from '../../ui/card/Card'

class StyleSurvey extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      result: ''
    }
  }

  render() {
    return (
      <h1>Survey Page</h1>
    )
  }
}

export default StyleSurvey;
