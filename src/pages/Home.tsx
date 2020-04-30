import { IonContent, IonList, IonItem, IonCheckbox,IonLabel,
  IonNote,IonBadge, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonPopover, IonIcon,IonThumbnail,IonGrid,IonCol,IonRow,IonInput,IonButton,IonItemDivider,IonText } from '@ionic/react';
import React from 'react';
import './Home.css';
import { caretDownOutline, caretUpOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import{ useState } from 'react';
import Compass from '../components/Compass';
import ShowChart from '../components/Chart';
import WebMapView from '../components/WebMap';
import jsCookie from 'js-cookie';

const Home: React.FC<RouteComponentProps> = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);

  async function logout() {
    setShowPopover(false); 
    props.history.push('/login')
  }

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar color="light">
            <IonTitle className="logoSmall ion-text-left"><small>Welcome, {jsCookie.get("screenname")}</small></IonTitle>
              <IonButtons slot="primary">
                <IonButton slot="end" className="lowerButtonTxt" size="small" color="medium" fill="clear" onClick={() => setShowPopover(true)}><small>logout</small></IonButton>
              </IonButtons>
          </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonPopover isOpen={showPopover} onDidDismiss={e => setShowPopover(false)}>
                <div className="logoutPopover">
                  <p>Are you sure you want to <br />log out?</p>
                  <IonButton className="lowerButtonTxt" size="small" fill="clear" onClick={logout}><small>Yes</small></IonButton>
                  <IonButton className="lowerButtonTxt" size="small" color="dark" onClick={() => setShowPopover(false)}><small>No</small></IonButton>
                </div>
              </IonPopover>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <Compass />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText className="find-out-more">
                FIND OUT MORE
              </IonText>
              <br />
              {showMoreContent == false ? 
                <IonButton className="lowerButtonTxt" size="small" color="dark" fill="clear" onClick={() => setShowMoreContent(true)}>
                  <small>more...</small><IonIcon slot="start" icon={caretDownOutline}/>
                </IonButton>
                :
                <IonButton className="lowerButtonTxt" size="small" color="dark" fill="clear" onClick={() => setShowMoreContent(false)}>
                  <small>less</small><IonIcon slot="start" icon={caretUpOutline}/>
                </IonButton>
              }
            </IonCol>
          </IonRow>
          {showMoreContent == false ? 
                null
                :
                <div>
                  <IonRow>
                    <IonCol>
                      <ShowChart />
                    </IonCol>
                  </IonRow>
                </div>
          }
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>
              <WebMapView />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
