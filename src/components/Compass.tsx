import React from 'react';
import {
    IonGrid, IonCol, IonRow, IonText
} from '@ionic/react';
import './Compass.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plugins } from '@capacitor/core';

interface ContainerProps { }

const Compass: React.FC<ContainerProps> = () => {
    const { Geolocation } = Plugins;

    async function getLocation() {
        const position = await Geolocation.getCurrentPosition();
        return position;
    }

    async function getAlt(lat: number, long: number) {
        /* Used the Moesif CORS Chrome extension to get this to work properly 
         - there was an issue accessing the API without this extension turned on
         - API: https://www.opentopodata.org/api/ */
        try {
            //format= (lat,log) => Elevation returned is in meters
            var altURL = `https://api.opentopodata.org/v1/ned10m?locations=${lat},${long}`;
            var req = await axios.get(altURL);
            return req;
        } catch (e) {
            return null;
        }
    }

    async function getMagCurrent(alt: number, lat: number, long: number, year: number) {
        const baseURL = `https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${year}`;
        var declinationFromZero = -40;
        try {
            axios.get(baseURL)
            .then(({ data }) => {
                console.log(data);
                declinationFromZero += data.declination.value;
                console.log(declinationFromZero);
                setStylesCurrent({ ...stylesCurrent, transform: `rotate(${declinationFromZero}deg)` });
                setDecCurrent(parseFloat(data.declination.value.toFixed(4)));
            });
        } catch (e) { }
        return declinationFromZero;
    }
    async function getMagPrev(alt: number, lat: number, long: number, year: number) {
        const baseURL = `https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${year}`;
        var declinationFromZero = -40;
        try {
            axios.get(baseURL)
            .then(({ data }) => {
                console.log(data);
                declinationFromZero += data.declination.value;
                console.log(declinationFromZero);
                setStylesPrev({ ...stylesPrev, transform: `rotate(${declinationFromZero}deg)` });
                setDecPrev(parseFloat(data.declination.value.toFixed(4)));
            });
        } catch (e) { }
        return declinationFromZero;
    }
    async function getMagFuture(alt: number, lat: number, long: number, year: number) {
        const baseURL = `https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${year}`;
        var declinationFromZero = -40;
        try {
            axios.get(baseURL)
            .then(({ data }) => {
                console.log(data);
                declinationFromZero += data.declination.value;
                console.log(declinationFromZero);
                setStylesFuture({ ...stylesPrev, transform: `rotate(${declinationFromZero}deg)` });
                setDecFuture(parseFloat(data.declination.value.toFixed(4)));
            });
        } catch (e) { }
        return declinationFromZero;
    }

    const [stylesCurrent, setStylesCurrent] = useState({ transform: `` });
    const [stylesPrev, setStylesPrev] = useState({ transform: `` });
    const [stylesFuture, setStylesFuture] = useState({ transform: `` });
    const [currentYear, setCurrentYear] = useState(Number);
    const [decCurrent, setDecCurrent] = useState(Number);
    const [decPrev, setDecPrev] = useState(Number);
    const [decFuture, setDecFuture] = useState(Number);


    useEffect(() => {
        const latLongLoc = async () => {
            const geoData = await getLocation();
            console.log(geoData);
            const altData = await getAlt(geoData.coords.latitude, geoData.coords.longitude);
            const alt = altData == null ? 0 : altData.data.results[0].elevation;
            const lat = geoData.coords.latitude;
            const long = geoData.coords.longitude;
            /* Set current Compass */
            const year = new Date().getFullYear();
            setCurrentYear(year);
            await getMagCurrent(alt, lat, long, year);
            /* Set previous Compass */
            await getMagPrev(alt, lat, long, year-5);
            /* Set future Compass */
            getMagFuture(alt, lat, long, year+4.9);
        };
        latLongLoc();
    }, []);

    return (
        <div className="container">
            <IonGrid>
                <IonRow>
                    <IonCol size="4">
                        <div className="compass">
                            <div className="compass-main">
                                <span className="north-label">N</span>
                                <span className="east-label">E</span>
                                <span className="west-label">W</span>
                                <span className="south-label">S</span>
                                <div className="compass-rose">
                                    <div className="cardial-points">
                                        <div className="north-pointer pointer"></div>
                                        <div className="east-pointer pointer"></div>
                                        <div className="west-pointer pointer"></div>
                                        <div className="south-pointer pointer"></div>
                                    </div>
                                    <div className="ordinal-points">
                                        <div className="northeast-pointer"></div>
                                        <div className="northwest-pointer"></div>
                                        <div className="southeast-pointer"></div>
                                        <div className="south-west-pointer"></div>
                                    </div>
                                </div>
                                <div className="bt-center"></div>
                                <div className="dip-needle" style={stylesCurrent}></div>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol size="4">
                        <div className="compass">
                            <div className="compass-main">
                                <span className="north-label">N</span>
                                <span className="east-label">E</span>
                                <span className="west-label">W</span>
                                <span className="south-label">S</span>
                                <div className="compass-rose">
                                    <div className="cardial-points">
                                        <div className="north-pointer pointer"></div>
                                        <div className="east-pointer pointer"></div>
                                        <div className="west-pointer pointer"></div>
                                        <div className="south-pointer pointer"></div>
                                    </div>
                                    <div className="ordinal-points">
                                        <div className="northeast-pointer"></div>
                                        <div className="northwest-pointer"></div>
                                        <div className="southeast-pointer"></div>
                                        <div className="south-west-pointer"></div>
                                    </div>
                                </div>
                                <div className="bt-center"></div>
                                <div className="dip-needle" style={stylesPrev}></div>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol size="4">
                        <div className="compass">
                            <div className="compass-main">
                                <span className="north-label">N</span>
                                <span className="east-label">E</span>
                                <span className="west-label">W</span>
                                <span className="south-label">S</span>
                                <div className="compass-rose">
                                    <div className="cardial-points">
                                        <div className="north-pointer pointer"></div>
                                        <div className="east-pointer pointer"></div>
                                        <div className="west-pointer pointer"></div>
                                        <div className="south-pointer pointer"></div>
                                    </div>
                                    <div className="ordinal-points">
                                        <div className="northeast-pointer"></div>
                                        <div className="northwest-pointer"></div>
                                        <div className="southeast-pointer"></div>
                                        <div className="south-west-pointer"></div>
                                    </div>
                                </div>
                                <div className="bt-center"></div>
                                <div className="dip-needle" style={stylesFuture}></div>
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="ion-text-center" size="4">
                        <IonText className="year-label" color="dark">{currentYear-5}</IonText>
                        <br />
                        <IonText className="dec-label" color="medium">{decPrev}&#176;</IonText>
                    </IonCol>
                    <IonCol className="ion-text-center" size="4">
                        <IonText className="year-label" color="dark">{currentYear}</IonText>
                        <br />
                        <IonText className="dec-label" color="medium">{decCurrent}&#176;</IonText>
                    </IonCol>
                    <IonCol className="ion-text-center" size="4">
                        <IonText className="year-label" color="dark">{currentYear+5}</IonText>
                        <br />
                        <IonText className="dec-label" color="medium">{decFuture}&#176;</IonText>
                    </IonCol>
                </IonRow>
                <IonRow className="change-container">
                    <IonCol className="ion-text-center" size="6">
                        {(decCurrent - decPrev) > 0 ? 
                            <IonText className="change-label" color="success">+{(decCurrent - decPrev).toFixed(4)}&#176;</IonText>
                            :
                            <IonText className="change-label" color="danger">{(decCurrent - decPrev).toFixed(4)}&#176;</IonText>
                        }
                    </IonCol>
                    <IonCol className="ion-text-center" size="6">
                        {(decFuture - decCurrent) > 0 ? 
                            <IonText className="change-label" color="success">+{(decFuture - decCurrent).toFixed(4)}&#176;</IonText>
                            :
                            <IonText className="change-label" color="danger">{(decFuture - decCurrent).toFixed(4)}&#176;</IonText>
                        }
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
};

export default Compass;