//Cardlist.js
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'lodash';
import React, {Component} from 'react';
import CardObj from "./CardObj"
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

var currentPage = 1;
class CardList extends Component {
  constructor(props) {
    //let this.cardArray;
    super(props);
    this.state = {
      cardArray :[],
      pageNum : currentPage,
      render : false
    };
    this._handleNext = this._handleNext.bind(this);
    this._handlePrev = this._handlePrev.bind(this);
  }

  _update(){
    const { pageNum } = this.state;
    var list = this.state.cardArray;
    var contex = this;
    console.log('Hit update');
    console.log(this.state);
    fetch("https://api.ethnews.com/v1/articles?page="+pageNum)
      .then(function(response){
        //console.log(response);
        return response.json();
      })
      .then(function(jsonResponse){
        //console.log(jsonResponse);
        var { results } = jsonResponse;
        //console.log(results);

        _.forEach(results, (element) => {
          console.log("loop");
          list.unshift(
            <CardObj key={Math.random()} data={element}/>,
          )
        });

        //console.log(list);
        contex.setState({cardArray: list, render: true});
        //console.log(contex.state.cardArray);
      });
  }

  _handleNext(e) {
    console.log("NexMember");
    currentPage +=1;
    this.setState({ render:false, pageNum: currentPage});
  }

  _handlePrev(e) {
    console.log("prevMember");
    if (currentPage > 1) {
      currentPage -= 1;
      this.setState({render:false, pageNum:currentPage});
    }
  }

  componetDidMount() {
    this._update();
  }

  render() {
    const { cardArray, render } = this.state;
    if (!render){
      this._update();
    }
    var placeHolder = <div>Loading data now</div>;
    return (
      <div>
        <MuiThemeProvider muiTheme= {getMuiTheme(darkBaseTheme)}>
          <div>
            <AppBar title="Etherum news"
              iconElementLeft={<FlatButton label="Previous" onClick={this._handlePrev}/>}
              iconElementRight={<FlatButton label="Next" onClick={this._handleNext}/>}
              />
          </div>
          <div>
            {cardArray.length > 0 ? cardArray : placeHolder }
          </div>
        </MuiThemeProvider>
      </div>)
    }

}

export default CardList
