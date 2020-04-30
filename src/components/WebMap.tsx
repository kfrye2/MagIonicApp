import React, { useEffect, useState } from 'react';
//import  from '@arcgis/webpack-plugin';
/*import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView';*/
import { Map, WebScene } from "@esri/react-arcgis";
import { loadModules } from 'esri-loader';
import { WebMap } from '@esri/react-arcgis/dist/esm/components/WebComposites';
import FeatureLayer from './FeatureLayer'
//import EsriLoaderReact from 'esri-loader-react';

interface ContainerProps { }

const WebMapView: React.FC<ContainerProps> = () => {

    return (
        <div className="container ion-text-center">
            <div style={{ width: '95vw', height: '50vh' }}>
                <Map mapProperties={{ basemap: 'streets-night-vector', layers: [] }} 
                     viewProperties={{center: [-77.516625,38.316076], zoom: 8 }}/>
                <FeatureLayer />
            </div>
        </div>
    );
};

export default WebMapView;