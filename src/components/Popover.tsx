import React from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

type TPopoverProps = {
  buttonClassName: string | undefined;
  buttonLabel: string;
  Content: React.FC;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  startIcon?: React.ReactNode;
};

const SimplePopover: React.FC<TPopoverProps> = ({
  buttonClassName,
  Content,
  buttonLabel,
  color = "inherit",
  startIcon,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        startIcon={startIcon}
        className={buttonClassName}
        variant="contained"
        color={color}
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Content />
      </Popover>
    </div>
  );
};

export default SimplePopover;
