import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
    IonCard, IonGrid, IonRow, IonCol, IonText,
    IonButtons, IonCardContent, IonItem, IonIcon, IonLabel, IonButton,
    IonBackButton,IonItemDivider, IonList, IonInput, IonThumbnail} from '@ionic/react';
import { pin, wifi, wine, warning, walk, arrowForwardOutline, logoChrome } from 'ionicons/icons';
import{ useState } from 'react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import './Login.css';
import {doLogin} from '../firebase.js';

const Login: React.FC<RouteComponentProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    async function handleClick(e: { preventDefault: () => void; }) {
      console.log('The link was clicked.');
      console.log(email);
      console.log(password);
      const check = JSON.stringify({
        email:email,
        password:password});
      var result = await doLogin(check);
      console.dir(result.error);
      console.dir(result.msg);
      if(result.error == false){
        props.history.push('/home');
      }
    }
  
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
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
              <IonButton className="lowerButtonTxt" size="small" color="dark" fill="outline" onClick={() => props.history.push('/login')}>
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