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
  const [isDeleteState, setIsDeleteState] = useState<boolean>(false);
  const [timerButtons, setTimerButtons] = useState<TimerCardData[]>([
    NEW_TIMER_CARD,
  ]);

  const handleAddCard = (): void => {
    setTimerButtons([...timerButtons, NEW_TIMER_CARD]);
  };

  const handleToggleDeleteMode = (): void => {
    setIsDeleteState(!isDeleteState);
  };

  const handleUpdateCard = (index: number, data: TimerCardData): void => {
    const tempButtons = [...timerButtons];
    tempButtons[index].actionButtons = data.actionButtons;
    tempButtons[index].buttonTitle = data.buttonTitle;
    // Ignore the milliseconds attribute
    setTimerButtons(tempButtons);
  };

  const handleDeleteCard = (index: number): void => {
    const tempButtons = timerButtons;
    tempButtons.splice(index, 1);
    setTimerButtons([...tempButtons]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multi Timer</IonTitle>
          <IonButtons slot="end" className="ion-padding-end">
            <IonButton
              color="danger"
              fill={isDeleteState ? "solid" : "clear"}
              onClick={() => handleToggleDeleteMode()}
            >
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
            <IonButton
              color="success"
              disabled={isDeleteState ? true : false}
              fill={isDeleteState ? "clear" : "solid"}
              onClick={() => handleAddCard()}
            >
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {timerButtons.map((item, index) => (
          <TimerCard
            key={index}
            buttonTitle={item.buttonTitle}
            actionButtons={item.actionButtons}
            isDeleting={isDeleteState}
            deleteCard={() => handleDeleteCard(index)}
            updateCard={(data: TimerCardData) => handleUpdateCard(index, data)}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
