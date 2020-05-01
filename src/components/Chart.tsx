import { Chart } from 'chart.js';
import React from 'react';
import { IonGrid, IonCol, IonRow, IonText, useIonViewDidEnter, IonSpinner } from '@ionic/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plugins } from '@capacitor/core';

interface ContainerProps { }

const ShowChart: React.FC<ContainerProps> = () => {
    const { Geolocation } = Plugins;

    async function getLocation() {
        const position = await Geolocation.getCurrentPosition();
        return position;
    }

    async function getAlt(lat: number, long: number) {
        try {
            var req = await axios.get(`https://api.opentopodata.org/v1/ned10m?locations=${lat},${long}`);
            return req;
        } catch (e) {  return null; }
    }

    const [spin, setSpin] = useState(true);
    const [eastWest, setEastWest] = useState("");
    const [posNeg, setPosNeg] = useState("");
    const [styles, setStyles] = useState({ color: `` });

    useEffect(() => {
        const latLongLoc = async () => {
            const geoData = await getLocation();
            const altData = await getAlt(geoData.coords.latitude, geoData.coords.longitude);

            const alt = altData == null ? 0 : altData.data.results[0].elevation;
            const lat = geoData.coords.latitude;
            const long = geoData.coords.longitude;

            const get2015 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2015}`); 
            const get2016 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2016}`); 
            const get2017 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2017}`); 
            const get2018 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2018}`); 
            const get2019 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2019}`); 
            const get2020 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2020}`); 
            setEastWest((get2020.data.declination.value > 0) ? "east" : "west")
            setPosNeg((get2020.data.declination.value > 0) ? "positive" : "negative");
            setStyles({ ...styles, color: (get2020.data.declination.value > 0) ? `#2dd36f` : `#eb445a` });
            const get2021 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2021}`); 
            const get2022 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2022}`); 
            const get2023 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2023}`); 
            const get2024 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2024}`); 
            const get2025 = await axios.get(`https://globalmagnet.amentum.space/wmm/magnetic_field?altitude=${alt}&latitude=${lat}&longitude=${long}&year=${2024.9}`); 

            const dataList = [
                get2015.data.declination.value,
                get2016.data.declination.value,
                get2017.data.declination.value,
                get2018.data.declination.value,
                get2019.data.declination.value,
                get2020.data.declination.value,
                get2021.data.declination.value,
                get2022.data.declination.value,
                get2023.data.declination.value,
                get2024.data.declination.value,
                get2025.data.declination.value,
            ];
            const yearLabels = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"];
            const options = new Chart("canvas", {
                type: "line",
                data: {
                    labels: yearLabels,
                    datasets: [
                        {
                            //label: "Magnetic Declination",
                            data: dataList,
                            borderColor: "#222428"
                        }
                    ]
                },
                options: { 
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontFamily: "'Quicksand', sans-serif",
                                fontSize: 10
                            },
                        }],
                        yAxes: [{
                            ticks: {
                                fontColor: "rgba(0,0,0,0.5)",
                                fontFamily: "'Quicksand', sans-serif",
                                fontSize: 8,
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                        }],
                    },
                 }
            });
            setSpin(false);
            options.render();
        };
        latLongLoc();
    }, []);

    return (
        <div className="container">
            <div className="ion-text-center">
                {spin == true ? <IonSpinner name="crescent" /> : null }
                <br/>
            </div>
            
            <IonText className="find-out-more">
                The declination at your location is  <b style={styles}>{posNeg}</b> and therefore, is to the <b style={styles}>{eastWest}</b> of true north.
            </IonText>
            <br /><br />
            <IonText className="find-out-more">
                Check out the graph to see how declination at your location has changed in the past, and is projected to change in the future.
            </IonText>
            <canvas id="canvas" className="find-out-more" width="100%" height="50%"></canvas>
            <br />
            <IonText className="find-out-more">
                See <a href="https://www.ngdc.noaa.gov/geomag/">NOAAs Geomagnetism page</a> to find out more!
            </IonText>
        </div>
    );
};

export default ShowChart;