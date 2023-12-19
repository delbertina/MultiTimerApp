import { IonButton } from '@ionic/react';
import './TimerButton.scss';

interface TimerButtonProps { }

const TimerButton: React.FC<TimerButtonProps> = () => {
  return (
    <>
    <IonButton fill="solid">
      TimerButton
    </IonButton>
    </>
  );
};

export default TimerButton;
