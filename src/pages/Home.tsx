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
        <TimerButton />
        <TimerButton />
        <TimerButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
