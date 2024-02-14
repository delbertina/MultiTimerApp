import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TimerCard.scss";
import { useRef, useState } from "react";
import { addOutline, removeOutline, settingsOutline } from "ionicons/icons";
import { useTimer } from "react-timer-hook";
import { OverlayEventDetail } from "@ionic/core";

export interface TimerCardProps {
  id: number;
  actionButtons: number[];
  buttonTitle: string;
  clickedMain: () => void;
  clickedSettings: () => void;
  clickedAdd: (value: number) => void;
}

const TimerCard: React.FC<TimerCardProps> = (props) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const modal = useRef<HTMLIonModalElement>(null);

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

  const confirmSaveModal = (e: React.MouseEvent) => {
    modal.current?.dismiss(1, "confirm");
    e.stopPropagation();
  };

  const cancelSaveModal = (e: React.MouseEvent) => {
    modal.current?.dismiss();
    e.stopPropagation();
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === "confirm") {
      console.log(`Hello, ${ev.detail.data}!`);
    }
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
                <IonButton
                  color="warning"
                  fill="solid"
                  id={"open-modal" + props.id}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
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
      <IonModal
        ref={modal}
        trigger={"open-modal" + props.id}
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={(e: React.MouseEvent) => cancelSaveModal(e)}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Welcome</IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                onClick={(e: React.MouseEvent) => confirmSaveModal(e)}
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {props.actionButtons.map((item, index) => (
            <IonItem key={index}>{item}</IonItem>
          ))}
        </IonContent>
      </IonModal>
    </>
  );
};

export default TimerCard;
