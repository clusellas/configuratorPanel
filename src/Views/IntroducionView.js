import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function IntroducionView() {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/index");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxSizing: "border-box",
                textAlign: "center",
                position: "relative",
                padding: 3,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                }}
            />

            <Box sx={{ zIndex: 2 }}>
                <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)",
                        animation: "fadeIn 1s",
                    }}
                >
                    Bienvenido al Configurador 3D de <b>Decosan</b>
                </Typography>

                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        color: "white",
                        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
                        animation: "fadeIn 1.5s",
                    }}
                >
                    Personaliza tus muebles de baño en tiempo real. Escoge
                    modelos, texturas, colores y más, ¡y observa cómo tu
                    creación cobra vida en 3D!
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: "white",
                        maxWidth: "600px",
                        marginBottom: 4,
                        mt: 3,
                        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        animation: "fadeIn 2s",
                    }}
                >
                    Empieza seleccionando un modelo de mueble, personaliza sus
                    colores y texturas, elige la encimera y el lavabo, y
                    finaliza con un espejo a tu gusto. El precio se actualizará
                    en tiempo real mientras haces cambios. ¡Finalmente, genera
                    un PDF con todos los detalles de tu diseño y una
                    visualización 3D!
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onClick}
                    sx={{
                        backgroundColor: "#ff5722",
                        ":hover": {
                            backgroundColor: "#ff7043",
                            transform: "scale(1.05)",
                        },
                        transition: "0.3s ease",
                        padding: "12px 24px",
                        fontSize: "18px",
                        borderRadius: "8px",
                    }}
                >
                    Empezar Configuración
                </Button>
            </Box>

            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </Box>
    );
}

export default IntroducionView;
