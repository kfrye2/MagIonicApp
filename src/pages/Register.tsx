import {
    IonContent, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonGrid, IonCol, IonRow, IonInput, IonButton, IonText
} from '@ionic/react';
import React from 'react';
import './Home.css';
import { RouteComponentProps } from 'react-router';
import { useState } from 'react';
import { doNewLogin } from '../firebase.js';
import jsCookie from 'js-cookie';

const Home: React.FC<RouteComponentProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function handleClick(e: { preventDefault: () => void; }) {
        console.log(email);
        console.log(password);
        const check = JSON.stringify({
            email: email,
            password: password,
            username: username
        });
        var result = await doNewLogin(check);
        if(result.err == false){
            jsCookie.set("screenname", result.un);
            props.history.push('/home');
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
