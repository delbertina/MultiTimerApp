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
import "./TimerButton.scss";
import { useEffect, useState } from "react";
import { addOutline, removeOutline } from "ionicons/icons";

export interface TimerButtonProps {
  milliseconds: number;
  actionButtons: number[];
  buttonTitle: string;
  clicked: () => void;
}

const TimerButton: React.FC<TimerButtonProps> = (props) => {
  const [timeDisplay, setTimeDisplay] = useState("0");

  // format the millisecond duration to min:sec format using pad function
  // round up to the nearest second to avoid 00:00 for less than 1 second
  const millisecondsToTime = (millis: number): string => {
    const inputRounded = Math.ceil(millis / 1000) * 1000;
    const pad = (n: number, z = 2) => ("00" + n).slice(-z);
    return (
      pad(((inputRounded % 3.6e6) / 6e4) | 0) +
      ":" +
      pad(((inputRounded % 6e4) / 1000) | 0)
    );
  };

  useEffect(() => {
    setTimeDisplay(millisecondsToTime(props.milliseconds));
  }, [props.milliseconds]);

  const handleCardAction = (e: React.MouseEvent, id: number): void => {
    console.log("inner click ", id);
    e.stopPropagation();
  };

  return (
    <>
      <IonCard
        color="primary"
        onClick={props.clicked}
        button
        className="timer-button-card"
      >
        <IonCardHeader>
          <IonCardTitle>
            <IonRow className="ion-justify-content-between ion-align-items-center">
              <IonCol size="auto">
                <strong>{timeDisplay}</strong> :: {props.buttonTitle}
              </IonCol>
              <IonCol size="auto">
                <IonButton color="warning">
                  <IonIcon slot="icon-only" icon={addOutline} />
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

export default TimerButton;
