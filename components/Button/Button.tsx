interface ButtonProps {
  buttonName: string,
  handleClick: () => void,
}

export const Button = ({ buttonName, handleClick }: ButtonProps): JSX.Element => {

  return (<button className="button" onClick={handleClick}>{buttonName}</button>);
}
