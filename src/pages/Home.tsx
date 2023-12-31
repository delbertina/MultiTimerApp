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
import { useState } from "react";
import { TimerButtonData } from "../types/TimerButton";

const Home: React.FC = () => {
  const [timerButtons, setTimerButtons] = useState<TimerButtonData[]>([
    {
      milliseconds: 1000,
      buttonTitle: "Red Team",
      actionButtons: [30, -45, 0, 5],
    },
    {
      milliseconds: 2000,
      buttonTitle: "Blue Team",
      actionButtons: [30],
    },
    {
      milliseconds: 3000,
      buttonTitle: "Yellow Team really long title that is long",
      actionButtons: [
        30, -45, 0, 5, 30, -45, 0, 5, 30, -45, 0, 5, 30, -45, 0, 5,
      ],
    },
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multi Timer</IonTitle>
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
        {timerButtons.map((item, index) => (
          <TimerButton key={index}
          milliseconds={item.milliseconds}
          buttonTitle={item.buttonTitle}
          actionButtons={item.actionButtons}
          clicked={() => {
            console.log("button clicked of index: " , index);
          }}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
