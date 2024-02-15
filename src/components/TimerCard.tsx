import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import "./TimerCard.scss";
import { useRef, useState } from "react";
import {
  addOutline,
  closeOutline,
  removeOutline,
  settingsOutline,
} from "ionicons/icons";
import { useTimer } from "react-timer-hook";
import { OverlayEventDetail } from "@ionic/core";

export interface TimerCardProps {
  id: number;
  actionButtons: number[];
  buttonTitle: string;
  updateActionButtons: (buttons: number[]) => void;
}

const TimerCard: React.FC<TimerCardProps> = (props) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const [tempActionButtons, setTempActionButtons] = useState<Array<number>>([
    ...props.actionButtons,
  ]);

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

  const handleCardClick = (): void => {
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

  const confirmSaveModal = (e: React.MouseEvent): void => {
    modal.current?.dismiss(tempActionButtons, "save");
    e.stopPropagation();
  };

  const cancelSaveModal = (e: React.MouseEvent): void => {
    modal.current?.dismiss();
    e.stopPropagation();
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>): void => {
    if (ev.detail.role === "save") {
      props.updateActionButtons(tempActionButtons);
    } else {
      setTempActionButtons(props.actionButtons);
    }
  };

  const parseActionValue = (value: string): number => {
    let returnVal = parseInt(value);
    console.log("parse val", value, returnVal);
    if (isNaN(returnVal) || returnVal < -300 || returnVal > 300) {
      // If input is not a number or is out of range, change returnVal to 0
      returnVal = 0;
    }
    return returnVal;
  };

  const handleActionAdd = (value: string): void => {
    setTempActionButtons([...tempActionButtons, parseActionValue(value)]);
  };

  const handleActionRemove = (index: number): void => {
    setTempActionButtons(tempActionButtons.splice(index, 1));
  };

  const handleActionReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    setTempActionButtons(event.detail.complete(tempActionButtons));
  };

  const handleActionEdit = (index: number, value: string): void => {
    const tempVal = [...tempActionButtons];
    tempVal[index] === parseActionValue(value);
    console.log(index, value, tempVal[index]);
    setTempActionButtons(tempVal);
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
                  id={"open-timer-card-modal" + props.id}
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
        className="timer-card-modal"
        trigger={"open-timer-card-modal" + props.id}
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <strong>Edit Quick Add</strong> :: {props.buttonTitle}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                color="success"
                fill="solid"
                onClick={(e: React.MouseEvent) => confirmSaveModal(e)}
              >
                Save
              </IonButton>
              <IonButton onClick={(e: React.MouseEvent) => cancelSaveModal(e)}>
                <IonIcon color="danger" icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonReorderGroup
              disabled={false}
              onIonItemReorder={(e) => handleActionReorder(e)}
              key={0}
            >
              {tempActionButtons.map((item, index) => (
                <IonItem key={index}>
                  <IonButtons slot="start">
                    <IonButton
                      fill="solid"
                      color="danger"
                      onClick={() => handleActionRemove(index)}
                    >
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonLabel
                    className="timer-card-modal-item-label"
                    id={"present-time-card-modal-alert" + props.id + index}
                  >
                    {item} {item === 1 ? "second" : "seconds"}
                  </IonLabel>
                  <IonReorder slot="end"></IonReorder>
                  <IonAlert
                    key={index}
                    trigger={"present-time-card-modal-alert" + props.id + index}
                    header="Please update the quick action value"
                    buttons={[
                      {
                        text: "OK",
                        handler: (data: { value: string }) => {
                          handleActionEdit(index, data.value);
                        },
                      },
                    ]}
                    inputs={[
                      {
                        name: "value",
                        type: "number",
                        placeholder: item.toString(),
                        min: -300,
                        max: 300,
                      },
                    ]}
                  ></IonAlert>
                </IonItem>
              ))}
            </IonReorderGroup>
          </IonList>
        </IonContent>
        <IonFooter className="timer-card-modal-footer">
          <IonToolbar>
            <IonButton
              strong={true}
              color="success"
              fill="solid"
              expand="block"
              id={"present-time-card-add-modal-alert" + props.id}
            >
              Add Quick Action
            </IonButton>
          </IonToolbar>
        </IonFooter>
        <IonAlert
          trigger={"present-time-card-add-modal-alert" + props.id}
          header="Please enter a value for the new action button"
          buttons={[
            {
              text: "OK",
              handler: (data: { value: string }) => {
                handleActionAdd(data.value);
              },
            },
          ]}
          inputs={[
            {
              name: "value",
              type: "number",
              placeholder: "30",
              min: -300,
              max: 300,
            },
          ]}
        ></IonAlert>
      </IonModal>
    </>
  );
};

export default TimerCard;
