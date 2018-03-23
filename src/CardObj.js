import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui';
import React, {Component} from 'react';

class CardObj extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render(){
    const { data } = this.props;
    console.log({data});
    return (
      <Card>
        <CardHeader
          title={data.authors[0].user}
          subtitle=""
          avatar={data.authors[0].avatar}
        />
        <CardMedia
          overlay={<CardTitle title={data.category}/>}>
          <img src={data.cover_img} alt={data.cover_alt}/>
        </CardMedia>
        <CardTitle title={data.title} subtitle={data.url}/>
        <CardText>
          {data.summary}
        </CardText>
      </Card>
    )
  }
}

export default CardObj;
