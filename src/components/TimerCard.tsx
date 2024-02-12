import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonRow,
} from "@ionic/react";
import "./TimerCard.scss";
import { useState } from "react";
import { addOutline, removeOutline, settingsOutline } from "ionicons/icons";
import { useTimer } from "react-timer-hook";

export interface TimerCardProps {
  actionButtons: number[];
  buttonTitle: string;
  clickedMain: () => void;
  clickedSettings: () => void;
  clickedAdd: (value: number) => void;
}

const TimerCard: React.FC<TimerCardProps> = (props) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: new Date(Date.now().valueOf() + 30000),
    autoStart: false,
    onExpire: () => setIsExpired(true),
  });

  const handleCardClick = () => {
    if (!isExpired) {
      if (isRunning) {
        pause();
      } else {
        resume();
      }
    }
  };

  const handleCardAction = (e: React.MouseEvent, id: number): void => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + totalSeconds + props.actionButtons[id]);
    restart(time, !!isRunning);
    e.stopPropagation();
  };

  return (
    <>
      <IonCard
        color={isExpired ? "medium" : isRunning ? "secondary" : "primary"}
        onClick={handleCardClick}
        button
        className="timer-card"
      >
        <IonCardHeader>
          <IonCardTitle>
            <IonRow className="ion-justify-content-between ion-align-items-center">
              <IonCol size="auto">
                <strong>
                  <span>{("00" + minutes).slice(-2)}</span>:
                  <span>{("00" + seconds).slice(-2)}</span>
                </strong>{" "}
                :: {props.buttonTitle}
              </IonCol>
              <IonCol size="auto">
                <IonButton color="warning" fill="solid">
                  <IonIcon slot="icon-only" icon={settingsOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            {props.actionButtons.map((button, index) => (
              <IonButton
                key={index}
                color={button >= 0 ? "success" : "danger"}
                onClick={(e: React.MouseEvent) => handleCardAction(e, index)}
              >
                <IonIcon
                  slot="start"
                  icon={button >= 0 ? addOutline : removeOutline}
                />
                {(button >= 0 ? button : 0 - button) + "s"}
              </IonButton>
            ))}
          </IonRow>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default TimerCard;
