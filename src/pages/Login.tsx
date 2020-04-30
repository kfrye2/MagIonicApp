import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
    IonCard, IonGrid, IonRow, IonCol, IonText,
    IonButtons, IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
    IonAlert,IonItemDivider, IonList, IonInput, IonThumbnail} from '@ionic/react';
import { pin, wifi, wine, warning, walk, arrowForwardOutline, logoChrome } from 'ionicons/icons';
import{ useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import './Login.css';
import {doLogin, doGoogleLogin} from '../firebase.js';
import jsCookie from 'js-cookie';
import { Plugins } from '@capacitor/core';

const Login: React.FC<RouteComponentProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert1, setShowAlert1] = useState(false);
    const [alertMsg, setAlertMsg] = useState("msg");
  
    async function handleClick(e: { preventDefault: () => void; }) {
      const check = JSON.stringify({
        email:email,
        password:password});
      var result = await doLogin(check);
      if(result.err == false){
        jsCookie.set("screenname", result.un);
        props.history.push('/home');
      } else {
        setAlertMsg(result.msg);
        setEmail("");
        setPassword("");
        setShowAlert1(true);
      }
    }

    async function googleLogin() {
        var result = await doGoogleLogin();
        if(result.err == false){
            jsCookie.set("screenname", result.un);
            props.history.push('/home');
          } else {
            setAlertMsg(result.msg);
            setEmail("");
            setPassword("");
            setShowAlert1(true);
          }
    }

    const { Geolocation } = Plugins;
    async function getLocation() {
        const position = await Geolocation.getCurrentPosition();
        return position;
    }

    useEffect(() => {
        const latLongLoc = async () => {
            const geo = await getLocation();
            jsCookie.set("lat", geo.coords.latitude.toString());
            jsCookie.set("long", geo.coords.longitude.toString());
        };
        latLongLoc();
    }, []);    
  
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
            <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            header={'An Error Occured'}
            message={alertMsg}
            buttons={['OK']}
            />
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonThumbnail className="logo"></IonThumbnail>
              </IonCol>
            </IonRow>
            <IonRow className="signinBlock">
              <IonCol>
                <IonItem>
                  <IonLabel color="medium" position="floating">User Email</IonLabel>
                  <IonInput 
                    value={email}
                    type="email"
                    name="email"
                    onIonChange={e => setEmail(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel color="medium" position="floating">Password</IonLabel>
                  <IonInput 
                    value={password} 
                    type="password" 
                    name="password"
                    onIonChange={e => setPassword(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <div className="signinBlockBtn">
              <IonButton 
                color="dark" 
                expand="block"
                onClick={handleClick}>
                Sign In
              </IonButton>
              <IonButton className="lowerButtonTxt" 
                         size="small" 
                         shape="round" 
                         fill="clear" 
                         color="medium" 
                         onClick={() => props.history.push('/register')}>
                <IonText color="medium" >
                  <small>Don't have an account?</small>
                </IonText>
                <IonIcon slot="end" icon={arrowForwardOutline} />
              </IonButton>
            </div>
            
          </IonGrid>
          <IonGrid>
          <IonRow>
            <IonCol size="5"><hr className="separator"></hr></IonCol>
            <IonCol>
              <IonRow class="ion-text-center">
                <IonCol>
                  <IonText color="medium"><small>OR</small></IonText>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol size="5"><hr className="separator"></hr></IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="ion-text-center">
              <IonButton className="lowerButtonTxt" size="small" color="dark" fill="outline" onClick={googleLogin}>
                <IonIcon icon={logoChrome} />Sign In with Google
              </IonButton>
            </IonCol>          
          </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;