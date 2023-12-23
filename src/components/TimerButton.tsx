import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import './TimerButton.scss';
import { useEffect, useState } from 'react';
import { addOutline } from 'ionicons/icons';

interface TimerButtonProps {
  milliseconds: number,
  
  clicked: () => void
}

const TimerButton: React.FC<TimerButtonProps> = (props) => {

  const [timeDisplay, setTimeDisplay] = useState('0');

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
  }

  useEffect(() => {
    setTimeDisplay(millisecondsToTime(props.milliseconds));
  }, [props.milliseconds])

  return (
    <>
      <IonCard color="primary" onClick={props.clicked} button>
        <IonCardHeader>
          <IonCardTitle>{timeDisplay}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonButton color="success" onClick={(e: React.MouseEvent) => {console.log('inner click'); e.stopPropagation();}}>
            <IonIcon slot="start" icon={addOutline}/>
            30s
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default TimerButton;
