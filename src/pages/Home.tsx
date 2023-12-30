import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.scss";
import TimerButton from "../components/TimerButton";
import { addOutline, trashOutline } from "ionicons/icons";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multi Timer 2</IonTitle>
          <IonButtons slot="end" className="ion-padding-end">
          <IonButton color="danger">
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
            <IonButton color="success" fill="solid">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TimerButton
          milliseconds={1000}
          buttonTitle="Red Team"
          actionButtons={[30, -45, 0, 5]}
          clicked={() => {
            console.log("10");
          }}
        />
        <TimerButton
          milliseconds={2000}
          buttonTitle="Blue Team"
          actionButtons={[30]}
          clicked={() => {
            console.log("20");
          }}
        />
        <TimerButton
          milliseconds={3000}
          buttonTitle="Yellow Team really long title that is long"
          actionButtons={[
            30, -45, 0, 5, 30, -45, 0, 5, 30, -45, 0, 5, 30, -45, 0, 5,
          ]}
          clicked={() => {
            console.log("30");
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
