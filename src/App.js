import React, { Component } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
 
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  static defaultProps = {
    center: {
      lat: 34.0577889,
      lng: -118.3009088
    },
    zoom: 17,
  };


  createMapOptions = (maps) => {
    return {
      panControl: true,
      mapTypeControl: true,
      scrollwheel: true,
    }
  }
 

  onAddressSearch = (item) => {
    this.setState(state => {
      const list = [...state.list, item];
      return {
        list
       }
    })
  };

  createMarker = (a, b, c) => (
    <div lat={a} lng={b}></div>
  )


  render() {

    const AnyReactComponent = () => <div style={{width: '10px', height: '10px', backgroundColor:'red', border: '1px solid red', borderRadius: '100px'}}></div>;
    const _onClick = ({x, y, lat, lng, event}) => {
      
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAym1QAScrX5nqENQjCaoc27C9o43rpGY4`)
      .then(res => {
        var tempData = res.data.results[0].formatted_address;
        var data = {
          lat: lat,
          lng: lng,
          tempData: tempData
        }
        if(this.state.list.includes(data)) {
          return
        }else {
          this.onAddressSearch(data)
        }
      })
      .catch(err => {
        console.log(err);
      })
    }

    return (
    
    <div style={{display: 'flex'}}>
       <div style={{height: '100vh', width: '30%'}}>
        <div>{this.state.list.length}</div>
        <div style={{fontSize: '1em'}}>
          {this.state.list.map((item, index) => <div key={index} style={{border: '1px solid black', padding: '1em'}}>{item.tempData}</div>)}
        </div>
      </div>
      <div style={{ height: '100vh', width: '70%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAym1QAScrX5nqENQjCaoc27C9o43rpGY4'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={_onClick}
          className='mapmap'
          options={this.createMapOptions}
        >
          {
           this.state.list && this.state.list.map((item,index) => 
          <AnyReactComponent
            lat={item.lat}
            lng={item.lng}
            text={item.tempData}
            key={index}
          /> )
          }
        
        </GoogleMapReact>
      </div>
    </div>
     
    );
  }
}
 
export default App;



