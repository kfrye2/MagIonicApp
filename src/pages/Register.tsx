import {
    IonContent, IonList, IonItem, IonCheckbox, IonLabel,
    IonNote, IonBadge, IonHeader, IonPage, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonIcon, IonThumbnail, IonGrid, IonCol, IonRow, IonInput, IonButton, IonItemDivider, IonText
} from '@ionic/react';
import React from 'react';
import './Home.css';
import { logoChrome, arrowForwardOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import { useState } from 'react';
import { doLogin } from '../firebase.js';

const Home: React.FC<RouteComponentProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function handleClick(e: { preventDefault: () => void; }) {
        console.log('The link was clicked.');
        console.log(email);
        console.log(password);
        const check = JSON.stringify({
            email: email,
            password: password
        });
        var r = await doLogin(check);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
                    <IonTitle className="logoSmall"></IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent>
                <IonGrid>
                    
                    <IonRow className="registerBlock">
                        <IonCol>
                            <IonRow className="ion-text-center">
                                <IonCol>
                                    <IonText className="title">Register</IonText>
                                </IonCol>
                            </IonRow>
                            <IonItem>
                                <IonLabel color="medium" position="floating">User Name</IonLabel>
                                <IonInput
                                    value={username}
                                    type="text"
                                    name="username"
                                    onIonChange={e => setUsername(e.detail.value!)}
                                ></IonInput>
                            </IonItem>
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
                            fill="outline"
                            onClick={handleClick}>
                            Register Account
                        </IonButton>
                        
                    </div>

                </IonGrid>
                
            </IonContent>
        </IonPage>
    );
};

export default Home;
