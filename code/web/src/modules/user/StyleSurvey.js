import React, { Component } from 'react'
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
import { setUserStyle } from './api/actions.js'


class StyleSurvey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      result: '',
      surveyCounter: 1,
      currentSelection: '',
      selections: {
        colonial: 0,
        cosplay: 0,
        prom: 0,
        raver: 0
      }
    }
    this.onClickConfirmSubscription = this.onClickConfirmSubscription.bind(this)
    this.onSelection = this.onSelection.bind(this)
    this.onClickSubmit = this.onClickSubmit.bind(this)
  }
  determineResult = () => {
    const scores = [];
    for(let style in this.state.selections) {
      scores.push([style, this.state.selections[style]])
    }
    const highestScore = scores.sort((a, b) => b[1] - a[1])
    const stylePref = highestScore[0][0] + (' and ') + highestScore[1][0]
    this.setState({ result : stylePref})
  }

  onSelection = (event) => {
    this.setState({ currentSelection: event.target.name })
  }

  onClickSubmit = () => {
    // if(this.state.surveyCounter > 5) {
    //   this.props.history.push(userRoutes.subscriptions.path)
    // } else {
      this.setState(prevState => ({ selections: {...prevState.selections, [this.state.currentSelection]: (prevState.selections[this.state.currentSelection] + 1)}}))
      this.setState(prevState => ({surveyCounter: (prevState.surveyCounter + 1), currentSelection: '' }))
      this.determineResult()
    }
  // }

  onClickConfirmSubscription = () => {
    const newUserDetails = {
      id: this.props.user.details.id,
      style: this.state.result
    }
    this.props.setUserStyle(newUserDetails)
    this.props.history.push(userRoutes.subscriptions.path)
  }

  componentDidMount() {
    console.log(this.props, 'PROPS')
    console.log(this.state, 'STATE')
  }

  render() {
    const mensQuestionSet = surveyData.men[`question${this.state.surveyCounter}`]
    const womensQuestionSet = surveyData.women[`question${this.state.surveyCounter}`]
    const selectedSet = this.props.location.state.gender === 'Men' ? mensQuestionSet : womensQuestionSet

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
              selectedSet.map((choice, index) => (
                <div key={index} style={{ margin: '1em', float: 'left' }}>
                    <Card style={{ width: '18em', backgroundColor: white }}>
                      <div style={{ width: '100%', height: '40vh',textAlign: 'center', overflow: 'hidden' }}>
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
              : <>
              <H4 font="secondary" style={{ color: black, textAlign: 'center', margin: '2em' }}>Your style is {this.state.result}</H4>
              {/* <p>Your style is {this.state.result}</p> */}
              <p style={{ textAlign: 'center', margin: '2em' }}>
                <Button
                theme="primary"
                onClick={() => this.onClickConfirmSubscription()}
                type="button"
                >Confirm Subscription</Button>
                </p>
              </>
          }
        </GridCell>
      </Grid>
      {this.state.surveyCounter <= 5 &&
        <Button
          theme="primary"
          onClick={() => this.onClickSubmit()}
          type="button"
        >Submit
        </Button>
      }
      </>
    )
  }
}

StyleSurvey.propTypes = {
  user: PropTypes.object.isRequired,
  setUserStyle: PropTypes.func.isRequired
}

//Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { setUserStyle })(StyleSurvey)
