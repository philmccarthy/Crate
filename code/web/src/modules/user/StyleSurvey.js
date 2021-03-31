import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Loading from '../common/Loading'
import Icon from '../../ui/icon'
import { white, grey, grey2, black } from '../../ui/common/colors'
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'

// App Imports
import userRoutes from '../../setup/routes/user'
import { surveyData } from './styleSurveyData'

class StyleSurvey extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      result: '',
      //dummydata
      // choices: [1, 2, 3, 4],
      surveyCounter: 1,
      currentSelection: '',
      selections: {
        colonial: 0,
        cosplay: 0,
        prom: 0,
        raver: 0
      }
    }

    this.onSelection = this.onSelection.bind(this)
  }

  onSelection = (event) => {
    console.log(event.target.name)
    this.setState({ currentSelection: event.target.name })
  }

  onClickSubmit = () => {
    if(this.state.surveyCounter > 5){
      this.props.history.push(userRoutes.subscriptions.path)
    } else {
      this.setState(prevState => ({ selections: {...prevState.selections, [this.state.currentSelection]: (prevState.selections[this.state.currentSelection] + 1)}}))
      this.setState(prevState => ({surveyCounter: (prevState.surveyCounter + 1)}))
    }
  }

  render() {
    let questionSet = surveyData.men[`question${this.state.surveyCounter}`]

    return (
      <>
      {/* Top title bar */}
      <Grid style={{ backgroundColor: grey }}>
        <GridCell style={{ padding: '2em', textAlign: 'center' }}>
          <H3 font="secondary">Style Survey!</H3>

          <p style={{ marginTop: '1em', color: grey2 }}>Choose your favorite style below!</p>
        </GridCell>
      </Grid>

      <Grid>
        <GridCell>
          {
            // this.state.isLoading
            //   ? <Loading/>
            //   :
            this.state.surveyCounter <= 5 ? 
              questionSet.map((choice, index) => (
                <div key={index} style={{ margin: '1em', float: 'left' }}>
                    <Card style={{ width: '18em', backgroundColor: white }}>
                      <div style={{ width: '100%', textAlign: 'center' }}>
                      <img src={choice.src} alt={choice.alt} style={{ width: '80%', alignSelf: 'center' }}/>
                      </div>
                      
                      <div style={{ padding: '1em 1.2em' }}>
                    
                        <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
                          <Button
                            theme="primary"
                            name={choice.style}
                            onClick={() => this.onSelection(event)}
                            // change current selection to name of the specific card
                            type="button"
                            disabled={ this.state.isLoading }
                          >
                            <Icon size={1.2} style={{ color: white }}>add</Icon> Select
                          </Button>
                        </p>
                      </div>
                    </Card>
                  </div>
                ))
              : <p>Survey is fin</p>
          }
        </GridCell>
      </Grid>

        <Button
          theme="primary"
          onClick={this.onClickSubmit.bind(this)}
          type="button"
          // disabled prop dependent on currentSelection
        >Submit</Button>
      </>
    )
  }
}

export default StyleSurvey;
