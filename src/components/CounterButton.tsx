type ButtonCounterProps = {
  text: string;
  eventOnClick: () => void;
};

const ButtonCounter = ({ text, eventOnClick }: ButtonCounterProps) => {
  return <button onClick={eventOnClick}>{text}</button>;
};

export default ButtonCounter;
