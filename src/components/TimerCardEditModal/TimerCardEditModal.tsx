import {
  InputChangeEventDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
  useIonModal,
} from "@ionic/react";
import "./TimerCardEditModal.scss";
import { closeOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import TimerCardAddActionModal from "../TimerCardAddActionModal/TimerCardAddActionModal";
import TimerCardEditActionModal from "../TimerCardEditActionModal/TimerCardEditActionModal";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { MODAL_SAVE_ROLE } from "../../data/constants";
import { TimerCardData } from "../../types/TimerCard";

export interface TimerCardEditProps {
  buttonTitle: string;
  actionButtons: number[];
  isDisabled: boolean;
  enableButton: () => void;
  onDismiss: (data?: TimerCardData, role?: string) => void;
}

const TimerCardEditModal: React.FC<TimerCardEditProps> = (props) => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const [titleValue, setTitleValue] = useState<string>(props.buttonTitle);
  const [tempActionButtons, setTempActionButtons] = useState<Array<number>>([
    ...props.actionButtons,
  ]);
  const [currentEditIndex, setCurrentEditIndex] = useState<number>(-1);
  const [presentAdd, dismissAdd] = useIonModal(TimerCardAddActionModal, {
    onDismiss: (data: string, role: string) => dismissAdd(data, role),
  });
  const [presentEdit, dismissEdit] = useIonModal(TimerCardEditActionModal, {
    defaultValue:
      currentEditIndex !== -1 ? tempActionButtons[currentEditIndex] : 0,
    onDismiss: (data: string, role: string) => dismissEdit(data, role),
  });

  const confirmSaveModal = (): void => {
    props.onDismiss(
      {
        milliseconds: 0, // will be ignored
        buttonTitle: titleRef.current?.value + "",
        actionButtons: tempActionButtons,
      },
      MODAL_SAVE_ROLE
    );
  };

  const cancelSaveModal = (): void => {
    props.onDismiss();
  };

  const parseActionValue = (value: string): number => {
    let returnVal = parseInt(value);
    if (isNaN(returnVal) || returnVal < -300 || returnVal > 300) {
      // If input is not a number or is out of range, change returnVal to 0
      returnVal = 0;
    }
    return returnVal;
  };

  const openAddModal = () => {
    presentAdd({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === MODAL_SAVE_ROLE) {
          setTempActionButtons([
            ...tempActionButtons,
            parseActionValue(ev.detail.data),
          ]);
        }
      },
    });
  };

  const openEditModal = (index: number) => {
    setCurrentEditIndex(index);
    presentEdit({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === MODAL_SAVE_ROLE) {
          const tempVal = [...tempActionButtons];
          tempVal[index] = parseActionValue(ev.detail.data);
          setTempActionButtons(tempVal);
        }
        setCurrentEditIndex(-1);
      },
    });
  };

  const handleActionRemove = (index: number): void => {
    const tempButtons = tempActionButtons;
    tempButtons.splice(index, 1);
    setTempActionButtons([...tempButtons]);
  };

  const handleActionReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    setTempActionButtons(event.detail.complete(tempActionButtons));
  };

  return (
    <IonPage className="timer-card-edit-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <strong>Edit Quick Add</strong>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              color="success"
              fill="solid"
              onClick={() => confirmSaveModal()}
            >
              Save
            </IonButton>
            <IonButton onClick={() => cancelSaveModal()}>
              <IonIcon color="danger" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {props.isDisabled && 
          <>
            <IonButton
              fill="solid"
              color="warning"
              expand="block"
              strong={true}
              onClick={() => props.enableButton()}
            >
              ENABLE TIMER BUTTON
            </IonButton>
            <IonItemDivider />
          </>
        }
        <IonInput
          ref={titleRef}
          fill="solid"
          name="title"
          type="text"
          placeholder="Add a Title..."
          clearInput={true}
          // TODO: Update this usage of type any
          onIonInput={(e: any) => setTitleValue(e.target.value + "")}
          value={titleValue}
        />
        <IonItemDivider />
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
                  className="timer-card-edit-modal-item-label"
                  onClick={() => openEditModal(index)}
                >
                  {item} {item === 1 ? "second" : "seconds"}
                </IonLabel>
                <IonReorder slot="end"></IonReorder>
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList>
      </IonContent>
      <IonFooter className="timer-card-edit-modal-footer">
        <IonToolbar>
          <IonButton
            strong={true}
            color="success"
            fill="solid"
            expand="block"
            onClick={() => openAddModal()}
          >
            Add Quick Action
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default TimerCardEditModal;
