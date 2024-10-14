import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NewCompositionButton() {
    const navigate = useNavigate();

    const ClickButton = () => {
        navigate("/index");
    };
    return (
        <Button onClick={ClickButton} variant="contained" color="secondary">
            Empezar de nuevo
        </Button>
    );
}

export default NewCompositionButton;
