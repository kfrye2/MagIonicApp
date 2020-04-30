import { IonContent, IonList, IonItem, IonCheckbox,IonLabel,
    IonNote,IonBadge, IonHeader, IonPage, IonTitle, IonToolbar,
    IonFab, IonFabButton, IonIcon,IonThumbnail } from '@ionic/react';
  import React from 'react';
  import ExploreContainer from '../components/ExploreContainer';
  import './Home.css';
  import { apps } from 'ionicons/icons';
  import { RouteComponentProps } from 'react-router';
  
  const Home: React.FC<RouteComponentProps> = (props) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
  
          <IonThumbnail className="logo"></IonThumbnail>
  
      <IonItem>
        <IonThumbnail slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonThumbnail>
        <IonLabel>Item Thumbnail</IonLabel>
      </IonItem>
          <IonThumbnail>
            <div className="logo"></div>
          </IonThumbnail>
  
          <IonList>
            <IonItem>
              <IonCheckbox slot="start" />
              <IonLabel>
                <h1>Create Idea</h1>
                <IonNote>Run Idea by Brandy</IonNote>
              </IonLabel>
              <IonBadge color="danger" slot="end">
                5 Days
              </IonBadge>
            </IonItem>
          </IonList>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => props.history.push('/login')}>
              <IonIcon icon={apps} />
            </IonFabButton>
          </IonFab>
          <ExploreContainer />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Home;
  