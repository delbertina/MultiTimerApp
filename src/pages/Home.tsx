import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.scss';
import TimerButton from '../components/TimerButton';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Multi Timer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TimerButton milliseconds={1000} clicked={() => {console.log('10')}}/>
        <TimerButton milliseconds={2000} clicked={() => {console.log('20')}}/>
        <TimerButton milliseconds={3000} clicked={() => {console.log('30')}}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
