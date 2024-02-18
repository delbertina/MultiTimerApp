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
import TimerCard from "../components/TimerCard/TimerCard";
import { addOutline, trashOutline } from "ionicons/icons";
import { useState } from "react";
import { TimerCardData } from "../types/TimerCard";
import { NEW_TIMER_CARD } from "../data/constants";

const Home: React.FC = () => {
  const [timerButtons, setTimerButtons] = useState<TimerCardData[]>([
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

  const handleAddCard = (): void => {
    setTimerButtons([...timerButtons, NEW_TIMER_CARD]);
  }

  const handleUpdateActionButtons = (
    index: number,
    buttons: number[]
  ): void => {
    const tempButtons = [...timerButtons];
    tempButtons[index].actionButtons = buttons;
    setTimerButtons(tempButtons);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multi Timer</IonTitle>
          <IonButtons slot="end" className="ion-padding-end">
            <IonButton color="danger">
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
            <IonButton color="success" fill="solid" onClick={() => handleAddCard()}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {timerButtons.map((item, index) => (
          <TimerCard
            key={index}
            id={index}
            buttonTitle={item.buttonTitle}
            actionButtons={item.actionButtons}
            updateActionButtons={(buttons: number[]) =>
              handleUpdateActionButtons(index, buttons)
            }
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
