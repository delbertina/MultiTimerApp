import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useRef } from "react";
import { MODAL_SAVE_ROLE } from "../../data/constants";

export interface TimerCardAddActionModalProps {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const TimerCardAddActionModal = (props: TimerCardAddActionModalProps) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage className="timer-card-add-action-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <strong>Add Quick Action</strong>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.onDismiss(null, "cancel")}>
              <IonIcon color="danger" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          ref={inputRef}
          fill="solid"
          name="value"
          type="number"
          placeholder="0"
          min={-300}
          max={300}
        />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            strong={true}
            color="success"
            fill="solid"
            expand="block"
            onClick={() =>
              props.onDismiss(inputRef.current?.value, MODAL_SAVE_ROLE)
            }
          >
            Submit
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default TimerCardAddActionModal;
