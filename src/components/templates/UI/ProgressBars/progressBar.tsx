interface ProgressBarProps {
    bgcolor: string;
    completed: number;
    height?: string;
    direction?: "row" | "column";
}

interface barSizes {
  height: string;
  width:  string;
}

export const ProgressBar = (props: ProgressBarProps) => {
    const { bgcolor, completed } = props;
    const direct = props.direction ?? "row";
  
    const containerStyles = {
      height: direct === "row" ? '20px' : '100%',
      width:  direct === "row" ? '100%' : '20px',

      marign: "auto",
      
      backgroundColor: "#e0e0de",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: direct === "row" ? '100%' : `${completed}%`,
      width:  direct === "row" ? `${completed}%` : '100%',

      marign: "auto",

      backgroundColor: bgcolor,
      borderRadius: 'inherit',
    }

    const filledStyles = {
        marign: "auto",

        height: '100%',
        width: `100%`,
        backgroundColor: 'white',
        borderRadius: 'inherit',
        border: '1px solid',
        TransitionEvent: 'width 1s ease-in-out',
      }
  
    return (
      <div style={containerStyles}>
        <div style={filledStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
      </div>
    );
  };