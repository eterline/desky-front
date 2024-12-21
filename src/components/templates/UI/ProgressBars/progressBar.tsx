import "./progressBar.css";

export const ProgressBar = (props: ProgressBarProps) => {

    const { bgcolor, completed } = props;
    const direct = props.direction ?? "row";
  
    const containerStyles = {
      height: direct === "row" ? '20px' : '100%',
      width:  direct === "row" ? '100%' : '20px',
    }
  
    const fillerStyles = {
      height: direct === "row" ? '100%' : `${completed}%`,
      width:  direct === "row" ? `${completed}%` : '100%',
      backgroundColor: bgcolor ?? "red",
    }
  
    return (
      <div className="ProgressBar-container" style={containerStyles}>
        <div className="ProgressBar-filled">
            <div className="ProgressBar-filler" style={fillerStyles}>
            </div>
        </div>
      </div>
    );
  };