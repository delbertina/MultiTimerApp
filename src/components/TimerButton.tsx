import { IonButton } from '@ionic/react';
import './TimerButton.scss';
import { useEffect, useState } from 'react';

interface TimerButtonProps {
  milliseconds: number,
  clicked: () => void
}

const TimerButton: React.FC<TimerButtonProps> = (props) => {

  const [timeDisplay, setTimeDisplay] = useState('0');

  useEffect(() => {
    setTimeDisplay(props.milliseconds.toString());
  }, [props.milliseconds])

  return (
    <>
      <IonButton fill="solid" onClick={props.clicked}>
        {timeDisplay}
      </IonButton>
    </>
  );
};

export default TimerButton;
