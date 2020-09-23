import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import get from "lodash.get"

const Location1 = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAG_4QJNIEleAhb6yNgJ4FQ5xnGqzdbRqo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `777px`, width: "82%", float: "right", margin: "2px" }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <>
    {get(props, "marker[0]", false) && <GoogleMap defaultZoom={11} defaultCenter={{ lat: get(props, "marker[0].geometry.location.lat", 0.0), lng: get(props, "marker[0].geometry.location.lng", 0.0) }}>
      {(props.marker || []).map((element, key) => {
        return <Marker key={`marker_${key}`} position={{ lat: get(element, "geometry.location.lat", 0.0), lng: get(element, "geometry.location.lng", 0.0) }} title={element.name} />
      })}
    </GoogleMap>}
  </>
));


function Location() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("http://localhost:12059/react-interview/getLowesStores")
      .then(res => res.json())
      .then(
        (result) => {
          setResult(result)
        },
      )
  }, [])

  return (
    <Location1 marker={result} />
  );
}


export default Location;
