import { IonButton } from '@ionic/react';
import './TimerButton.scss';
import { useEffect, useState } from 'react';

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
      <IonButton fill="solid" onClick={props.clicked}>
        {timeDisplay}
      </IonButton>
    </>
  );
};

export default TimerButton;
