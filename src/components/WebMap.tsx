import React, { useEffect, useState } from 'react';
//import  from '@arcgis/webpack-plugin';
/*import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView';*/
import { Map, WebScene } from "@esri/react-arcgis";
import { loadModules } from 'esri-loader';
import { WebMap } from '@esri/react-arcgis/dist/esm/components/WebComposites';
//import EsriLoaderReact from 'esri/layers/FeatureLayer';
import jsCookie from 'js-cookie';


interface ContainerProps { }

const WebMapView: React.FC<ContainerProps> = (props) => {
    //https://gis.ngdc.noaa.gov/arcgis/rest/services/historical_declination/MapServer/3
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    useEffect(() => {
        const long = jsCookie.get("long")
        const lat = jsCookie.get("lat");
        if(long != undefined && lat != undefined) {
            setLat(parseInt(lat));
            setLong(parseInt(long));
        }
    }, []);
    
    return (
        <div style={{  width: '95vw', height: '50vh' }}>
            <WebMap id="e31e23b1f5f447b3bf97badd992b5608" viewProperties={{center: [long, lat], zoom: 6 }} />
        </div>
        
    );
};

export default WebMapView;