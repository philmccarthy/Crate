import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import { white, grey, grey2, black } from '../../ui/common/colors'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'

class StyleSurvey extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      result: ''
    }
  }

  render() {
    return (
      <>
      {/* Top title bar */}
      <Grid style={{ backgroundColor: grey }}>
        <GridCell style={{ padding: '2em', textAlign: 'center' }}>
          <H3 font="secondary">Style Survey!</H3>

          <p style={{ marginTop: '1em', color: grey2 }}>Let's find your style profile!</p>
        </GridCell>
      </Grid>

      </>
    )
  }
}

export default StyleSurvey;
