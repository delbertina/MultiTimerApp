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
import { useRef, useState } from "react";
import { MODAL_SAVE_ROLE } from "../../data/constants";

export interface TimerCardEditActionModalProps {
  defaultValue: number;
  onDismiss: (data?: undefined | null | string | number, role?: string) => void;
}

const TimerCardEditActionModal = (props: TimerCardEditActionModalProps) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(props.defaultValue + "");

  return (
    <IonPage className="timer-card-edit-action-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <strong>Edit Quick Action</strong>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.onDismiss(undefined, "cancel")}>
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
          // TODO: Update this usage of type any
          onIonInput={(e: any) => setInputValue(e.target.value + "")}
          value={inputValue}
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
            onClick={() => props.onDismiss(inputRef.current?.value, MODAL_SAVE_ROLE)}
          >
            Submit
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default TimerCardEditActionModal;
