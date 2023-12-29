import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.scss';
import TimerButton from '../components/TimerButton';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multi Timer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Multi Timer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TimerButton milliseconds={1000} buttonTitle='Red Team' actionButtons={[30, -45, 0, 5]} clicked={() => {console.log('10')}}/>
        <TimerButton milliseconds={2000} buttonTitle='Blue Team' actionButtons={[30]} clicked={() => {console.log('20')}}/>
        <TimerButton milliseconds={3000} buttonTitle='Yellow Team really long title that is long' actionButtons={[30, -45, 0, 5, 30, -45, 0, 5, 30, -45, 0, 5, 30, -45, 0, 5]} clicked={() => {console.log('30')}}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
