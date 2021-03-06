// This is a place holder for the initial application state.
import React from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

let mockResults = [];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class FlightComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Origin: "boston",
      Destination: "ny",
      StartDate: '05/04/2019',
      EndDate: '06/04/2019',
      IsHidden: true,
      flightList: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    this.getFlight();
    e.preventDefault();
    this.setState({
      IsHidden: false
    });

  }

  getFlight = async () => {
    const response = await fetch('/flightTest');
    const body = await response.json();
    this.setState({
      flightList: body
    });
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    const results = this.state.flightList.map((result) =>
        <FlightResult id={result.id} name={result.name} price={result.price} time={result.time} />
    );
    return (
      <div>
        <form>
          <label>
            Origin:&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="Origin" value={this.state.Origin} onChange={e => this.onChange(e)}/>
          </label><br></br>
          <label>
            Destination:&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="Destination" value={this.state.Destination} onChange={e => this.onChange(e)}/>
          </label><br></br>
          <label>
            Start Date:&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="date" name="StartDate" value={this.state.StartDate} onChange={e => this.onChange(e)}/>
          </label><br></br>
          <label>
            End Date:&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="date" name="EndDate" value={this.state.EndDate} onChange={e => this.onChange(e)}/>
          </label><br></br>
        <Button type="submit" name="SubmitButton" onClick={e => this.onSubmit(e)}>Submit</Button>
        </form>

        {!this.state.IsHidden &&
        <div>
          <h2>Showing Flight Results for {this.state.Origin} to {this.state.Destination} for {this.state.StartDate} to {this.state.EndDate}</h2>
          {results}
          <a href="/hotels">Go to Housing Plans</a>
        </div>
        }
      </div>
    );
  }
}


class FlightResult extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      IsHidden: true
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(){
    this.setState({
      IsHidden: false
    })
  }

  render() {
    return (
      <Alert variant="secondary">
        <Alert.Heading><Button onClick={this.onSelect}>Select</Button> {this.props.id}. {this.props.name}: (${this.props.price}
          , {this.props.time})</Alert.Heading><a href="https://www.kayak.com/flights">Book Flight</a>
        {!this.state.IsHidden &&
        <h4 style={{color:"#c67007"}} >You've selected to fly with {this.props.name}!</h4>
        }
      </Alert>
      
    )
  }
}

// This renders the JSX component inside the content node:
export { FlightComponent, FlightResult };
